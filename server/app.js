const Koa = require('koa')
const app = new Koa()
const {htmlTpl} = require('./template')
app.use(async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = htmlTpl
})

app.listen(3333, () => {
  console.log('koa is running at 3333')
})