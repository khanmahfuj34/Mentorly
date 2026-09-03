export interface ITutorAccountForm {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ITutorNotificationPreferences {
  newApplications: boolean;
  applicationStatusUpdates: boolean;
  bookingUpdates: boolean;
  systemNotifications: boolean;
  enableAll: boolean;
}

export interface ITutorPrivacyPreferences {
  showProfileToStudents: boolean;
  allowStudentsToContactMe: boolean;
}
