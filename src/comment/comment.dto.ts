import { IsNotEmpty, IsString, MinLength } from 'class-validator'

class CommentDto {
  @IsNotEmpty({
    message: 'Comment must be provided'
  })
  @IsString({
    message: 'Comment must be a string'
  })
  @MinLength(3, {
    message: 'Comment must be at least a 3 characters'
  })
  public body: string
}

export default CommentDto
