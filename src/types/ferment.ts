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
  "daily" = 1,
  "twoDays" = 2,
  "threeDays" = 3,
  "weekly" = 7,
  "fortnightly" = 14,
  "monthly" = "Monthly"
}