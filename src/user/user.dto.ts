import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

class CreateUserDto {
  @IsNotEmpty({
    message: 'Valid email required'
  })
  @IsEmail()
  public email: string

  @IsNotEmpty({
    message: 'User name must be provided'
  })
  @IsString()
  @MinLength(3, {
    message: 'User name must be at least 3 characters'
  })
  public username: string

  @IsNotEmpty({
    message: 'Password must be provided'
  })
  @IsString()
  @MinLength(5, {
    message: 'User name must be at least 5 characters'
  })
  public password: string
}

export default CreateUserDto
