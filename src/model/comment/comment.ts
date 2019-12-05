import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
let log = new Log()
let commentlSchema = new mongoose.Schema({
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
        type:mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

export default class CommentModel implements model.IComment {
    public model: mongoose.Model < mongoose.Document >
        constructor() {
            this.model = mongoose.model('santa_comment', commentlSchema,'santa_comment')
        }
    public create(content:string,fid:string,tid:string,aid:string) {
        return new Promise((resolve, reject) => {
            this.model.create({
                content:content,
                from_uid:fid,
                to_uid:tid
            }, function (e: any, d: any) {
                if (e) {
                    log.apierror(`创建评论,错误：${e},${new Date()}`)
                    reject(e)
                    return false
                }
                resolve(d)
            })
        })
    }
}