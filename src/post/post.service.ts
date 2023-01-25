import { Types } from 'mongoose'
import CommentDto from '../comment/comment.dto'
import HttpException from '../exception/HttpException'
import PostNotFoundException from '../exception/PostNotFoundException'
import IPost from './post.interface'
import PostModel from './post.model'
import CommentService from '../comment/comment.service'

class PostService {
  public commentService = new CommentService()

  public getPosts = async (filter: boolean) => {
    const searchCriteria = filter ? { published: true } : {}
    const posts = await PostModel.find(searchCriteria).sort({
      publicationDate: 1
    })

    if (posts) {
      return posts
    } else {
      throw new HttpException(404, 'Failed to get posts')
    }
  }

  public getPostByID = async (id: string, filter: boolean) => {
    const searchCriteria = filter ? { published: true } : {}
    const postId = new Types.ObjectId(id)
    const post = await PostModel.find({
      _id: postId,
      searchCriteria
    })
    if (post) {
      const comments = await this.getComments(id)
      return { post, comments }
    } else {
      throw new PostNotFoundException(id)
    }
  }

  public updatePost = async (id: string, postData: IPost) => {
    const postId = new Types.ObjectId(id)
    const post = await PostModel.findByIdAndUpdate(postId, postData, {
      new: true
    })
    if (post) {
      return post
    } else {
      throw new PostNotFoundException(postId)
    }
  }

  public createPost = async (postData: IPost) => {
    const post = await PostModel.create(postData)
    if (post) {
      return post
    } else {
      throw new HttpException(404, 'Failed to create post')
    }
  }

  public deletePost = async (id: string) => {
    const postId = new Types.ObjectId(id)
    const post = await PostModel.findByIdAndRemove(postId)

    if (post) {
      return postId
    } else {
      throw new PostNotFoundException(postId)
    }
  }

  public createComment = async (
    commentData: CommentDto,
    userId: string,
    postId: string
  ) => {
    const comment = await this.commentService.createComment(
      commentData,
      userId,
      postId
    )
    if (comment) {
      return comment
    } else {
      throw new HttpException(404, 'Failed to create comment')
    }
  }

  public getComments = async (postId: string) => {
    const comments = await this.commentService.getComments(postId)
    if (comments) {
      return comments
    } else {
      throw new HttpException(404, 'Failed to get comments')
    }
  }
}

export default PostService
