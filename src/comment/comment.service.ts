import { Types } from 'mongoose'
import CommentDto from './comment.dto'
import CommentModel from './comment.model'

class CommentService {
  public createComment = async (
    commentData: CommentDto,
    userId: string,
    postId: string
  ) => {
    const user = new Types.ObjectId(userId)
    const post = new Types.ObjectId(postId)
    const newComment = {
      ...commentData,
      user,
      postId: post
    }
    const comment = await CommentModel.create(newComment)
    return comment
  }

  public getComments = async (postId: string) => {
    const post = new Types.ObjectId(postId)
    const comments = await CommentModel.find({ postId: post })
      .sort({ commentDate: 1 }) // sort comments by data
      .populate('user', 'username') // only get the username
    return comments
  }
}

export default CommentService
