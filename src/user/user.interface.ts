interface IUser {
  email: string
  username: string
  password: string | undefined
  owner: boolean
  _id: string
}

export default IUser
