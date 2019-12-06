import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
let log = new Log()
let articalSchema = new mongoose.Schema({
    //文章标题
    title: String,
    //文章作者
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'santa_user'
    },
    //文章标签
    tag:[{
        tid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'santa_tag'
        }
    }],
    //文章状态，发布，未发布
    status:Boolean
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

export default class ArticalModel implements model.IArtical {
    public model: mongoose.Model < mongoose.Document >
        constructor() {
            this.model = mongoose.model('santa_artical', articalSchema,'santa_artical')
        }
    public create(title: string, author: string,tag:object[]) {
        return new Promise((resolve, reject) => {
            this.model.create({
                title: title,
                author: author,
                tag:tag,
                status:true
            }, function (e: any, d: any) {
                if (e) {
                    log.apierror(`新建文章出错,错误：${e},${new Date()}`)
                    reject(e)
                    return false
                }
                resolve(d)
            })
        })
    }
    public list() {
        return new Promise((resolve, reject) => {
            this.model.find({status:true}).populate('author','name isadmin').populate('tag.tid','tname').exec((e, d) => {
                if(!e){
                    log.apierror(`api for artical-list ${e}`)
                    reject(e)
                }
                resolve(d)
            })
        })
    }
    public detail(id:string){
        return new Promise((resolve,reject)=>{
            this.model.findOne({_id:id,status:true}).populate('author','name isadmin').populate('tag.tid','tname').exec((e,d)=>{
                if(e){
                    log.apierror(`api for artical-detail ${e}`)
                    reject(e)
                }
                resolve(d)
            })
        })
    }
}