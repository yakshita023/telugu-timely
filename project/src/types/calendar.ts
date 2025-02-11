export interface PanchangamData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  rahuKalam: string;
  yamagandam: string;
  durmuhurtham: string;
  date: string;
  festivals: string[];
}

export interface Festival {
  name: string;
  date: string;
  description: string;
  isImportant: boolean;
}

export interface Reminder {
  festivalId: string;
  festivalName: string;
  reminderDate: string;
  festivalDate: string;
  tithi: string;
  isNotified: boolean;
}