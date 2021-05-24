export interface INewFerment {
  name: string,
  type: string,
  dob: Date,
  frequency: EFrequency,
  lastFed: Date
}

export interface IFerment extends INewFerment {
  _id: string,
  _v?: string 
}

export enum EFrequency {
  "daily" = "Daily",
  "twoDays" = "Every second day",
  "threeDays" = "Every three days",
  "weekly" = "Weekly",
  "fortnightly" = "Fortnightly",
  "monthly" = "Monthly"
}