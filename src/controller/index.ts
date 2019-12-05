import {Uapi} from './user/user'
import {Tagapi} from './tag/tag'
import {Articalapi} from './artical/artical'
import express from 'express'


const openApi = (app:express.Application) => {
    Tagapi(app)
    Uapi(app)
    Articalapi(app)
}

export default openApi