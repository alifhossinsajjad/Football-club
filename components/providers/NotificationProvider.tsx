/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";
import { Notification, NotificationSummary } from "@/types/notification/notificationType";
import { 
  useGetNotificationsQuery, 
  useGetNotificationSummaryQuery,
  useMarkAsReadMutation 
} from "@/redux/features/notification/notificationApi";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit, where } from "firebase/firestore";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  summary: NotificationSummary | null;
  markAsRead: (ids: number[]) => Promise<void>;
  refetch: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: true,
  summary: null,
  markAsRead: async () => {},
  refetch: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  
  // Polling intervals as fallback
  const { 
    data: notificationsData, 
    isLoading: loadingNotifications, 
    refetch: refetchNotifications 
  } = useGetNotificationsQuery(undefined, {
    skip: !currentUser?.id,
    pollingInterval: 30000, // Reduced polling since we have realtime
  });

  const { 
    data: summaryData, 
    refetch: refetchSummary 
  } = useGetNotificationSummaryQuery(undefined, {
    skip: !currentUser?.id,
    pollingInterval: 60000, // Reduced polling
  });

  const [markAsReadMutation] = useMarkAsReadMutation();

  const notifications = useMemo(() => notificationsData?.notifications || [], [notificationsData]);
  const rawUnreadCount = notificationsData?.unread_count || 0;
  
  const unreadCount = useMemo(() => {
    if (currentUser?.role === "ADMIN") {
      return notifications.filter(n => {
        const type = (n.notification_type || n.type || "").toLowerCase();
        return !n.is_read && !type.includes("message") && !type.includes("chat");
      }).length;
    }
    return rawUnreadCount;
  }, [notifications, rawUnreadCount, currentUser?.role]);

  const summary = useMemo(() => summaryData?.summary || null, [summaryData]);
  const loading = loadingNotifications;

  // Track the latest notification ID to show toast
  const lastNotifRef = useRef<number | null>(null);

  // Firestore Realtime Listener
  useEffect(() => {
    if (!currentUser?.id) return;

    // Listen to notifications collection for the current user
    // Path: notifications/{userId}/items
    const userId = String(currentUser.id).replace("USR-", "").replace(/^0+/, "");
    const q = query(
      collection(db, "notifications", userId, "items"),
      orderBy("created_at", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          // Avoid showing toast for historical data on first load
          if (lastNotifRef.current !== null) {
            toast.success(data.message || "New notification received!", {
              icon: '🔔',
              duration: 5000,
              position: 'top-right',
              style: {
                background: '#1A2049',
                color: '#fff',
                border: '1px solid #2A3560',
              }
            });
            // Instant refetch of API data to sync state
            refetchNotifications();
            refetchSummary();
          }
          lastNotifRef.current = data.id || Date.now();
        }
      });
    }, (error) => {
      console.warn("Firestore listener error:", error);
    });

    return () => unsubscribe();
  }, [currentUser?.id]);

  useEffect(() => {
    if (notifications.length > 0 && lastNotifRef.current === null) {
      lastNotifRef.current = notifications[0].id;
    }
  }, [notifications]);

  const markAsRead = async (ids: number[]) => {
    try {
      await markAsReadMutation({ notification_ids: ids }).unwrap();
      refetchNotifications();
      refetchSummary();
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  const refetch = () => {
    refetchNotifications();
    refetchSummary();
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      loading, 
      summary, 
      markAsRead, 
      refetch 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
