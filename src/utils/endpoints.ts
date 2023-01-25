import 'dotenv/config'
import { cleanEnv, str, port } from 'envalid'

const endpoints = cleanEnv(process.env, {
  MONGO_PASSWORD: str(),
  MONGO_PATH: str(),
  MONGO_USER: str(),
  JWT_SECRET: str(),
  PORT: port({ default: 6600 }),
  NODE_ENV: str()
})

export default endpoints
