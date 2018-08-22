const ejs = require('ejs')
const Koa = require('koa')
const app = new Koa()


app.listen(3333, () => {
  console.log('koa is running at 3333')
})