import { IsEmail, IsString } from 'class-validator'

class LogInDto {
  @IsString()
  @IsEmail({
    message: 'Valid email must be submitted'
  })
  public email: string

  @IsString()
  public password: string
}

export default LogInDto
