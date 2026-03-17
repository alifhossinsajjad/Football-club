export interface Notification {
  id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  data?: any;
}

export interface NotificationSummary {
  total_unread: number;
  unread_messages: number;
  unread_events: number;
  unread_system: number;
  recent_notifications: Notification[];
}

export interface NotificationResponse {
  success: boolean;
  notifications: Notification[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_notifications: number;
    has_next: boolean;
    has_previous: boolean;
  };
  unread_count: number;
}

export interface NotificationTypeSetting {
  email: boolean;
  push: boolean;
  realtime: boolean;
}

export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  realtime_notifications: boolean;
  notification_types: {
    [key: string]: NotificationTypeSetting;
  };
}
