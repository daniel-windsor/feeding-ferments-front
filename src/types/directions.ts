export interface INewDirection {
  title: string,
  direction: string,
  fermentId: string,
  index: number
}

export interface IDirections extends INewDirection {
  _id: string,
  _v?: string,
  userId: string
}