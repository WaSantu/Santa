import jwt from 'jsonwebtoken'
import config from '../../config/config'
import UserModel from '../../src/model/user/user'

const auth = (token:string,cb:(e:object|boolean)=>void) => {
    let Umodel = new UserModel()
   return jwt.verify(token,config.jwtserect,(e,d:any)=>{
        if(e){
            cb(false)
        }
        Umodel.findById(d.id,function(e:any){
            if(!e || !e.isadmin){
                cb(false)
            }
            cb(e)
        })
    })
}

export default auth