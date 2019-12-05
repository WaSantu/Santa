import UserModel from '../../model/user/user'
import jwt from 'jsonwebtoken'

import express from 'express'
let Umodel = new UserModel()

export const Uapi = (app:express.Application) => {
    //创建用户
    app.post('/api/admin/user/sign',async (req,res)=>{
        try {
            const name = req.body.name.trim()
            const password = req.body.password.trim()
            if(!name || !password){
                res.json({code:222,msg:'用户名或密码不能为空'})
                return
            }
            let isSigned = await Umodel.findonde(name)
            if(isSigned){
                res.json({code:222,msg:'用户已被注册'  })
                return 
            }
            Umodel.create(name,password).then((d:any)=>{
                let token = jwt.sign({name:d.name,password:d.password,id:d._id,isadmin:d.isadmin},app.get('token'),{expiresIn: 60*60*24 })
                res.json({code:200,msg:'用户创建成功',data:token})
            })
        } catch (e) {
            res.json({code:222,msg:'用户创建失败'})
        }
    })
    //用户登陆
    app.post('/api/admin/user/login',async (req,res)=>{
        try {
            const name = req.body.name
            const password = req.body.password
            Umodel.login(name,password).then((r:any)=>{
                if(!r){
                    res.json({code:222,msg:"用户名或密码错误"})
                    return
                }
                if(!r.isadmin){
                    res.json({code:222,msg:'用户权限验证出错'})
                }
                let token = jwt.sign({name:r.name,password:r.password,id:r._id,isadmin:r.isadmin},app.get('token'),{expiresIn: 60*60*24 })
                res.json({code:200,msg:'登陆成功',data:token})
            })
        } catch (e) {
            res.json({code:222,msg:'登陆失败'})
        }
    })
}