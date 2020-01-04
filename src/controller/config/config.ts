import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'
import Configmodel from '../../model/config/config'
import express from 'express'

export const Configapi = (app: express.Application) => {
    let Cmodel = new Configmodel()
    app.post('/api/admin/config/edit',(req, res) => {
        const {
            sitename,
            sitedes
        } = req.body
        let token = < string > req.headers.authorization
        token = token.split(' ')[1]
        auth(token, async (e) => {
            if (!e) {
                res.json({
                    code: 201,
                    msg: "用户权限验证出错"
                })
                return
            }
            let result = await Cmodel.createconfig(sitename, sitedes)
            res.json(result)
        })

    })
}