
import jwt from 'jsonwebtoken'
import log from '../../../unit/logjs/log'
import auth from '../../../unit/auth/auth'
import Configmodel from '../../model/config/config'
import express from 'express'

export const Configapi = (app:express.Application) => {
    let Cmodel = new Configmodel()
}