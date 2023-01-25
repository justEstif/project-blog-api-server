import IComment from './comment.interface'
import { Schema, model } from 'mongoose'

const CommentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
})

const CommentModel = model<IComment>('Comment', CommentSchema)
export default CommentModel
