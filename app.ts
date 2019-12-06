import config from './config/config'
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import Log from './unit/logjs/log'
import expressJwt from 'express-jwt'
import openApi from './src/controller/index'
const app = express()
const log = new Log()
app.set('token', config.jwtserect)
app.use(bodyParser.json());
app.use(expressJwt({
    secret: config.jwtserect
}).unless({
    path: config.ignoreJwt
}))
app.use(function (err: any, req: any, res: any, next: any) {
    if (err) {
        //如果token验证不通过，前台返回401
        res.json({ code: 401 })
    }
});
app.all("*", function (req, res, next) {
    next();
});
console.log('测试提交')
openApi(app)
app.listen(8889, () => {
    mongoose.connect('mongodb://localhost/mydb', (r) => {
        if (!r) {
            log.dbsuccess('数据库启动成功')
        } else {
            log.dberror(`数据库启动失败 ${r}`)
        }
    })
})