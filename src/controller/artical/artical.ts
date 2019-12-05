

import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'

import express from 'express'
import ArticalModel from '../../model/artical/artical'

let Amodel = new ArticalModel()
export const Articalapi = (app:express.Application) => {
    app.post('/api/admin/artical/publish',async (req,res)=>{
        let token= <string>req.headers.authorization
        token = token.split(' ')[1]
        const title = req.body.title
        const tag = [{
            tid:'5de8a3471b312a21dcd738a6'
        },{
            tid:'5de8a3521b312a21dcd738a7'
        }]
        auth(token,(arg:any)=>{
            console.log(typeof arg._id)
            if(!arg){
                res.json({code:401,msg:'用户权限不足'})
            }
            Amodel.create(title,arg._id,tag).then(r=>{
                res.json({code:200,data:r})
            })
        })
    })
    app.post('/api/admin/artical/list',async (req,res)=>{
        Amodel.list().then(r=>{
            res.json({code:200,data:r})
        })
    })
    app.post('/api/admin/artical/detail',async (req,res)=>{
        try {
            let token= <string>req.headers.authorization
            token = token.split(' ')[1]
            const id = req.body.id
            auth(token,(arg:any)=>{
                if(!arg){
                    res.json({code:401,msg:'用户权限不足'})
                }
                Amodel.detail(id).then(r=>{
                    res.json({code:200,data:r,msg:'获取文章详情成功'})
                })
            })
        } catch (e) {
            console.log(e)
        }
    })
}