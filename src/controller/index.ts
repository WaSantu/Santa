import {Uapi} from './user/user'
import {Tagapi} from './tag/tag'
import {Articalapi} from './artical/artical'
import {Commentapi} from './comment/comment'
import {Configapi } from './config/config'
import express from 'express'


const openApi = (app:express.Application) => {
    Tagapi(app)
    Uapi(app)
    Articalapi(app)
    Commentapi(app)
    Configapi(app)
}

export default openApi