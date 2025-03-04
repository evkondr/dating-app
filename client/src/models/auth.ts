export enum Gender {
  'male' ='male',
  'female' = 'female'
}
export type SignupData = {
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  genderPreference: string,
}