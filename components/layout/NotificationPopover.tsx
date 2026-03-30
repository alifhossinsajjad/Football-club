"use client";

import React, { useState, useEffect } from "react";
import { 
  useGetNotificationSummaryQuery, 
  useMarkAsReadMutation,
  useGetNotificationsQuery
} from "@/redux/features/notification/notificationApi";
import { Bell, BellDot, Loader2, MessageSquare, Calendar, ShieldAlert, Trash2, LogIn, CreditCard, Rocket } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);
  const { data: summaryData, isLoading: loadingSummary, refetch: refetchSummary } = useGetNotificationSummaryQuery();
  const { data: notificationData } = useGetNotificationsQuery(undefined, { skip: !open });
  const [markAsRead] = useMarkAsReadMutation();

  const unreadCount = summaryData?.summary?.total_unread || (summaryData as any)?.total_unread || 0;
  const notifications: any[] = React.useMemo(() => {
    if (Array.isArray(notificationData)) return notificationData;
    if (notificationData?.notifications) return notificationData.notifications;
    if ((notificationData as any)?.results) return (notificationData as any).results;
    return [];
  }, [notificationData]);

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications
      .filter((n: any) => !n.is_read)
      .map((n: any) => n.id);
    
    if (unreadIds.length > 0) {
      await markAsRead({ notification_ids: unreadIds });
      refetchSummary();
    }
  };

  const getIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "NEW_MESSAGE": return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case "EVENT_REGISTRATION": return <Calendar className="h-4 w-4 text-green-400" />;
      case "USER_LOGIN": return <LogIn className="h-4 w-4 text-indigo-400" />;
      case "SUBSCRIPTION_PURCHASE": return <CreditCard className="h-4 w-4 text-yellow-400" />;
      case "PROFILE_BOOST": return <Rocket className="h-4 w-4 text-purple-400" />;
      default: return <ShieldAlert className="h-4 w-4 text-orange-400" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative p-2 rounded-full hover:bg-[#242E5A] text-gray-400 hover:text-[#00E5FF] transition-all"
        >
          {unreadCount > 0 ? (
            <>
              <BellDot className="h-5 w-5 animate-pulse text-[#00E5FF]" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-red-500 text-white border-2 border-[#1A2049] text-[10px] p-0 font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            </>
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0 bg-[#1A2049] border-[#2A3560] shadow-2xl rounded-2xl overflow-hidden z-[100]" align="end">
        <div className="p-4 border-b border-[#2A3560] flex items-center justify-between bg-[#242E5A]/50">
          <h3 className="font-bold text-white tracking-wide">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="text-[10px] text-[#00E5FF] hover:underline font-bold uppercase tracking-wider"
            >
              Mark all read
            </button>
          )}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {loadingSummary ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-6 w-6 animate-spin text-[#00E5FF]" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <p className="text-sm">Universal quietness...</p>
              <p className="text-xs opacity-50 mt-1 text-gray-400">No new alerts found.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#2A3560]/30">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-4 hover:bg-[#242E5A]/30 transition-colors cursor-pointer flex gap-3 relative overflow-hidden",
                    !n.is_read && "bg-[#00E5FF]/5"
                  )}
                >
                  {!n.is_read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5FF]" />}
                  <div className="shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-[#1A2049] border border-[#2A3560] flex items-center justify-center">
                      {getIcon(n.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm leading-relaxed",
                      n.is_read ? "text-gray-400" : "text-gray-100 font-medium"
                    )}>
                      {typeof n.message === 'string' ? n.message : "Notification"}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                      {n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 bg-[#242E5A]/50 border-t border-[#2A3560] text-center">
          <button className="text-xs text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest">
            View All Activity
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
