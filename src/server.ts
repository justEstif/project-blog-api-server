import App from './app'
import PostController from './post/post.controller'
import AuthenticationController from './authentication/authentication.controller'

const app = new App([new PostController(), new AuthenticationController()])

app.listen()
