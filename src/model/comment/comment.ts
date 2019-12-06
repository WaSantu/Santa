import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
let log = new Log()
import configModel from '../config/config'
let commentSchema = new mongoose.Schema({
    content:String,
    from_uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'santa_user'
    },
    to_uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'santa_user',
        default:null
    },
    artical_aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'santa_artical'
    },
    status:Boolean
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})


let Cmodel = new configModel()
export default class CommentModel implements model.IComment {
    public model: mongoose.Model < mongoose.Document >
        constructor() {
            this.model = mongoose.model('santa_comment', commentSchema,'santa_comment')
        }
    public create(content:string,fid:string,tid:string,aid:string) {
        return new Promise((resolve, reject) => {
            Cmodel.getconfig().then((r:any)=>{
                this.model.create({
                    content:content,
                    from_uid:fid,
                    to_uid:tid,
                    artical_aid:aid,
                    status:r.comment_verify
                }, function (e: any, d: any) {
                    if (e) {
                        log.apierror(`创建评论,错误：${e},${new Date()}`)
                        reject(e)
                        return false
                    }
                    resolve(d)
                })  
            })
        })
    }
    public detail(id:string){
        return new Promise((resolve,reject)=>{
            this.model.find({artical_aid:id}).populate('from_uid','name').populate('to_uid','name').populate('artical_aid','title').exec((e,d)=>{
                if(e){
                    log.apierror(`获取评论出错 ${e}`)
                    reject(e)
                }
                console.log(d)
                resolve(d)
            })
        })
    }
}