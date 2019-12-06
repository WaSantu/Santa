import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'
import CommentModel from '../../model/comment/comment'
import express from 'express'

let Cmodel = new CommentModel()
export const Commentapi = (app: express.Application) => {
    app.post('/api/comment/create', (req, res) => {
        try {
            const content = '倒萨大师大师大师大师DSA'
            const fid = '5de9c3684d890c1fd41d38f5'
            const tid = '5de9c4314d890c1fd41d38f6'
            const aid = '5de9c4ae4d890c1fd41d38fd'
            Cmodel.create(content, fid, tid, aid).then(r => {
                res.json({
                    code: 200,
                    data: r
                })
            })
        } catch (e) {
            console.log(e)
        }
    })
}