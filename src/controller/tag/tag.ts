
import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'

import express from 'express'
import Tagmodel from '../../model/tag/tag'

let Tmodel = new Tagmodel()
export const Tagapi = (app:express.Application) => {
    app.post('/api/admin/tag/add',async (req,res)=>{
        let token= <string>req.headers.authorization
        token = token.split(' ')[1]
        const name = req.body.name
        auth(token,(arg:any)=>{
            if(!arg){
                res.json({code:401,msg:'用户权限验证出错'})
            }
            Tmodel.create(name,arg._id).then(r=>{
                res.json({
                    data:r
                })
            })
        })
    })
}