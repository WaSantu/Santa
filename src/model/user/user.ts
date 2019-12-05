import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
import { resolve } from 'dns'
import { rejects } from 'assert'
let log = new Log()
let userSchema = new mongoose.Schema({
    //用户名称
    name:String,
    //用户密码
    password:String,
    //是否是超管
    isadmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:{
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

export default class UserModel implements model.IUser {
    public model:mongoose.Model<mongoose.Document>
    constructor(){
        this.model = mongoose.model('santa_user',userSchema,'santa_user')
    }
    public create(name:string,password:string,isadmin:boolean=false){
        return new Promise((resolve,reject)=>{
            this.model.create({
                name:name,
                password:password,
                isadmin:isadmin
            },function(e:any,d:any){
                if(e){
                    log.apierror(`用户创建出错，用户名称${name},用户权限${isadmin},错误：${e},${new Date()}`)
                    reject(e)
                    return false
                }
                resolve(d)
            })
        })
    }
    public findonde(name:string){
        return new Promise((resolve,reject)=>{
            this.model.findOne({name:name},(e,d)=>{
                resolve(d)
            })
        })
    }
    public login(name:string,password:string){
        return new Promise((resolve,reject)=>{
            this.model.findOne({name:name,password:password},(e,d)=>{
                if(e){
                    log.apierror(e)
                    rejects(e)
                    return
                }
                resolve(d)
            })
        })
    }
    public findById(id:string,cb:Function){
        this.model.findById(id,(e,d)=>{
            if(e){
                cb(false)
            }
            cb(d)
        })
    }
}