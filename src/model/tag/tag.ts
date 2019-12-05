import mongoose from 'mongoose'
import Log from '../../../unit/logjs/log'
let log = new Log()
let tagSchema = new mongoose.Schema({
    tname:String,
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"santa_user"
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})

export default class TagModel implements model.ITag {
    public model: mongoose.Model < mongoose.Document >
        constructor() {
            this.model = mongoose.model('santa_tag', tagSchema,'santa_tag')
        }
    public create(name:string,id:string){
        return new Promise((resolve,reject)=>{
            this.model.create({tname:name,creator:id},(e:any,d:any)=>{
                if(e){
                    reject(e)
                    log.apierror(e)
                    return
                }
                resolve(d)
            })
        })
    }
}