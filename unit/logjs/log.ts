import fs from 'fs'


export default class PrintLog implements unit.Ilog {
    print(path:string,str:string,cb?:Function){
         str = `\n${str} ${new Date()}\n`
         fs.writeFile(path,str,{flag:'a'},()=>{
            cb && typeof cb == 'function' && cb()
         })
    }
    dberror(str:string,cb?:Function){
        this.print('./log/dberror.txt',str,cb)
    }
    dbsuccess(str:string,cb?:Function){
        this.print('./log/dbsuccess.txt',str,cb)
    }
    apierror(str:string,cb?:Function){
        this.print('./log/apierror.txt',str,cb)
    }
}