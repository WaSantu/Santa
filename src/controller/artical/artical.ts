

import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'

import express from 'express'
import ArticalModel from '../../model/artical/artical'
import CommentModel from '../../model/comment/comment'
let Cmodel = new CommentModel()
let Amodel = new ArticalModel()
export const Articalapi = (app:express.Application) => {
    app.post('/api/admin/artical/publish',async (req,res)=>{
        let token= <string>req.headers.authorization
        token = token.split(' ')[1]
        const title = req.body.title
        const tag = [{
            tid:'5e1071692c5a41243039734f'
        },{
            tid:'5e10717b2c5a412430397350'
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
    app.post('/api/admin/artical/detail',(req,res)=>{
        try {
            let token= <string>req.headers.authorization
            token = token.split(' ')[1]
            const id = req.body.id
            auth(token,async (arg:any)=>{
                if(!arg){
                    res.json({code:401,msg:'用户权限不足'})
                }
                let Cmodel_comment_detail =await Cmodel.detail(id)
                let Amodel_detail =await Amodel.detail(id)
                res.json({code:200,data:{
                    artical:Amodel_detail,
                    comment:Cmodel_comment_detail   
                }})
            })
        } catch (e) {
            console.log(e)
        }
    })
}