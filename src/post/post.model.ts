import { Schema, model } from 'mongoose'
import IPost from './post.interface'

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String,
      required: true
    }
  ], // at least one tag req
  published: { type: Boolean, default: false },
  publicationDate: { type: Date, default: undefined }
})

// Add date when published
PostSchema.pre('save', function (next) {
  const post = this
  // if published and undefined(not to overwrite it)
  if (post.published && !post.publicationDate) {
    post.publicationDate = new Date()
  }
  next()
})

const PostModel = model<IPost>('Post', PostSchema)
export default PostModel
