import express from 'express'
import {createProxyMiddleware} from 'http-proxy-middleware'


const app=express()


app.use('/user',createProxyMiddleware({target:'http://localhost:6500',changeOrigin:true}))
app.use('/comment',createProxyMiddleware({target:'http://localhost:6700',changeOrigin:true}))
app.use('/blog',createProxyMiddleware({target:'http://localhost:6600',changeOrigin:true}))


app.listen(6000,()=>console.log('server is running on http://localhost:6000'))