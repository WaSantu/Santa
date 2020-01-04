
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import Log from './unit/logjs/log'
import expressJwt from 'express-jwt'
import fs from 'fs'
import openApi from './src/controller/index'
const config = require('./config/config')
let system = JSON.parse(fs.readFileSync('../config/config.json','utf-8'))
const app = express()
const log = new Log()
app.set('token', system.jwtserect)
app.use(bodyParser.json());
app.use(expressJwt({
    secret: system.jwtserect
}).unless({
    path: system.ignoreJwt
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