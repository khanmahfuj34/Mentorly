export interface IAccountSettingsInput {
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface IPasswordChangeInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface INotificationPreferences {
  applicationUpdates: boolean;
  bookingUpdates: boolean;
  tuitionPostUpdates: boolean;
  systemNotifications: boolean;
  emailNotifications: boolean;
  inAppNotifications: boolean;
}

export interface IPrivacyPreferences {
  profileVisibility: "public" | "registered" | "hidden";
  showPhoneToTutors: boolean;
}

export interface IAppearancePreferences {
  theme: "light" | "dark" | "system";
}

export interface ILanguagePreferences {
  language: "en" | "bn";
}
