import {
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator'

class CreatePostDto {
  @IsNotEmpty({
    message: 'Title must not be empty.'
  })
  @IsString({
    message: 'Title must be a string value'
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters.'
  })
  title: string

  @IsNotEmpty({
    message: 'Body must not be empty.'
  })
  @IsString({
    message: 'Body must be a string value'
  })
  @MinLength(10, {
    message: 'Body must be at least 10 characters.'
  })
  body: string

  @IsNotEmpty({
    message: 'Summary must not be empty.'
  })
  @IsString({
    message: 'Summary must be a string value'
  })
  @MinLength(5, {
    message: 'Summary must be at least 5 characters.'
  })
  summary: string

  @ArrayMinSize(1, {
    message: 'At least one tag is required'
  })
  @IsString({
    each: true,
    message: 'Tag must be a string value'
  })
  @MinLength(3, {
    each: true,
    message: 'Tag must be at least 3 characters.'
  })
  tags: string[]

  // NOTE add an optional published boolean
  @IsBoolean({
    message: 'Published must be a boolean'
  })
  published: boolean

}

export default CreatePostDto
