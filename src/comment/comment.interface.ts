import { Types } from 'mongoose'

interface IComment {
  body: string
  commentDate: Date
  user: Types.ObjectId
  postId: Types.ObjectId
}

export default IComment
