import { NextFunction, Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import validationMiddleware from '../middleware/validation.middleware'
import CreatePostDto from './post.dto'
import authMiddleware from '../middleware/auth.middleware'
import ownerMiddleware from '../middleware/owner.middleware'
import checkPostIdMiddleware from '../middleware/checkPostId.middleware'
import CommentDto from '../comment/comment.dto'
import PostService from './post.service'
import asyncHandler from 'express-async-handler'
import filterPostMiddleware from '../middleware/filterPost.middleware'

class PostController implements IController {
  public path = '/api/posts'
  public path_all = `${this.path}/*`
  public path_id = `${this.path}/:id`
  public path_id_comment = `${this.path}/:id/comment`
  public router = Router()
  public postService = new PostService()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    // public routes
    this.router.get(this.path, filterPostMiddleware, this.getPosts)
    this.router.get(
      this.path_id,
      filterPostMiddleware,
      checkPostIdMiddleware,
      this.getPostById
    )

    this.router.post(
      this.path_id_comment,
      authMiddleware,
      validationMiddleware(CommentDto),
      this.createComment
    )

    // private routes -> only owner
    this.router
      .put(
        this.path_id,
        ownerMiddleware,
        checkPostIdMiddleware,
        validationMiddleware(CreatePostDto),
        this.updatePost
      )
      .delete(
        this.path_id,
        ownerMiddleware,
        checkPostIdMiddleware,
        this.deletePost
      )
      .post(
        this.path,
        ownerMiddleware,
        validationMiddleware(CreatePostDto),
        this.createPost
      )
  }

  // @desc Return posts in desc order by publication_date
  // @route GET /api/posts
  // @access Public
  private getPosts = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const posts = await this.postService.getPosts(!!request.body.filter)
        response.status(200).json(posts)
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Return post from the id
  // @route GET /api/posts:id
  // @access Public
  private getPostById = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const id = request.params.id
        const post = await this.postService.getPostByID(
          id,
          !!request.body.filter
        )
        response.status(200).json(post)
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Create a post
  // @route POST /api/posts
  // @access Private
  private createPost = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const postData: IPost = request.body
      try {
        const post = await this.postService.createPost(postData)
        response.status(200).json({
          message: 'Post saved',
          post: post
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Update a post
  // @route PUT /api/posts/:id
  // @access Private
  private updatePost = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const postData: IPost = request.body
      const id = request.params.id
      try {
        const post = await this.postService.updatePost(id, postData)
        response.status(200).json({
          message: 'Post updated',
          post: post
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Delete a post
  // @route DELETE /api/posts/:id
  // @access Private
  private deletePost = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = request.params.id
      try {
        const postId = await this.postService.deletePost(id)
        response.status(200).json({
          message: 'Post deleted',
          post: postId
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Create a comment
  // @route POST /api/posts/:id/comment
  // @access Private
  private createComment = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const commentData: CommentDto = request.body
      const userId = request.user ? request.user._id : null // current user id
      const postId = request.params.id // current post id

      try {
        const comment = await this.postService.createComment(
          commentData,
          userId,
          postId
        )
        response.status(200).json({
          message: 'Comment saved',
          comment: comment
        })
      } catch (error) {
        next(error)
      }
    }
  )
}

export default PostController
