export type User = {
  id: string,
  name: string
  email: string
  age: number
  bio: string
  image: string | null
  gender: string
  genderPreference: string
  createdAt: string
  updatedAt: string
}
export type UpdateUserDto = Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt' >