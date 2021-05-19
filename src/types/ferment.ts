export interface INewFerment {
  name: string,
  type: string,
  dob: Date
}

export interface IFerment extends INewFerment {
  _id: string,
  _v?: string 
}