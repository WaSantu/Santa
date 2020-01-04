import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
let log = new Log()
let configSchema = new mongoose.Schema({
    //评论是否需要审核
    comment_verify:{
        type:Boolean,
        default:false
    },
    sitename:String,
    sitedes:String
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

export default class ConfigModel implements model.IConfig {
    public model: mongoose.Model < mongoose.Document >
        constructor() {
            this.model = mongoose.model('santa_config', configSchema,'santa_config')
        }
    public initconfig(sitename:string,siteclass:string){
    }
    public createconfig(sitename:string,sitedes:string){
        return new Promise((resolve,reject)=>{
            this.model.create({
                sitename:sitename,
                sitedes:sitedes
            },(e:any,d:any)=>{
                if(e){
                    reject(e)
                    log.apierror(`创建配置出错 ${e}`)
                }
                resolve(d)
            })
       })
    }
    public getconfig(){
        return new Promise((resolve,reject)=>{
            this.model.findOne({},(e,d)=>{
                if(e){
                    reject(e)
                    log.apierror(`获取评论列表出错 ${e}`)
                }
                resolve(d)
            })
        })
    }
}