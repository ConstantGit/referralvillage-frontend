export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  type: 'job' | 'consultation' | 'follow_up' | 'availability';
  status: 'scheduled' | 'completed' | 'cancelled';
  jobId?: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  notes?: string[];
  color?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
    daysOfWeek?: number[];
  };
}

export interface CalendarView {
  id: string;
  name: string;
  type: 'day' | 'week' | 'month' | 'agenda';
  default?: boolean;
  filters?: {
    eventTypes?: string[];
    statuses?: string[];
    locations?: string[];
  };
}

export interface CalendarSettings {
  defaultView: CalendarView['type'];
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  workingHours: {
    start: string;
    end: string;
    daysOfWeek: number[];
  };
  eventColors: Record<CalendarEvent['type'], string>;
  notifications: {
    enabled: boolean;
    reminderTimes: number[]; // minutes before event
    methods: ('email' | 'push' | 'sms')[];
  };
  availability: {
    enabled: boolean;
    bufferTime: number; // minutes between events
    maxEventsPerDay?: number;
    blockOutDates: string[];
  };
}

export interface CalendarFilter {
  dateRange?: {
    start: string;
    end: string;
  };
  eventTypes?: CalendarEvent['type'][];
  statuses?: CalendarEvent['status'][];
  locations?: string[];
  search?: string;
  sortBy?: 'date' | 'title' | 'type' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface CalendarResponse {
  events: CalendarEvent[];
  meta?: {
    total: number;
    filtered: number;
    dateRange: {
      start: string;
      end: string;
    };
  };
}

export interface CalendarConflict {
  type: 'overlap' | 'buffer' | 'availability' | 'max_events';
  message: string;
  conflictingEvents?: CalendarEvent[];
  suggestedTimes?: string[];
}

export interface CalendarSync {
  provider: 'google' | 'outlook' | 'apple';
  enabled: boolean;
  lastSync?: string;
  settings: {
    calendars: string[];
    syncDirection: 'import' | 'export' | 'both';
    eventTypes?: CalendarEvent['type'][];
  };
}
