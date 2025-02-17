export enum Gender {
  male = 'male',
  female = 'female',
}
export type TokenPayload = string | object | Buffer
export type UserSearchParams = {
  id?: string
  email?: string
}
export type UserRelations = {
  likes?: boolean
  dislikes?: boolean
  matches: boolean 
}