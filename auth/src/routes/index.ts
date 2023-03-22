import express from 'express'
import { currentUserRoute } from './current-user';
import { notFoundRouter } from './notfound';
import {signinRouter} from './signin'
import { signoutRouter } from './signout'
import { signupRouter } from './signup'

const authRouter = express.Router();

authRouter.use('/api/users', signoutRouter)
authRouter.use('/api/users', signinRouter)
authRouter.use('/api/users', signupRouter)
authRouter.use('/api/users', currentUserRoute)
authRouter.use('*', notFoundRouter)

export {authRouter}