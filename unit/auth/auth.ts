import jwt from 'jsonwebtoken'
import UserModel from '../../src/model/user/user'


const config = require('../../config/config')
const auth = (token:string,cb:(e:object|boolean)=>void) => {
    let Umodel = new UserModel()
   return jwt.verify(token,config.jwtserect,(e:any,d:any)=>{
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