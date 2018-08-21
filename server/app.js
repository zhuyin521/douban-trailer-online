const ejs = require('ejs')
const Koa = require('koa')
const app = new Koa()
const {htmlTpl, ejsTpl} = require('./template')
app.use(async (ctx, next) => {
  ctx.type = 'text/html;chart=utf-8'
  ctx.body = ejs.render(ejsTpl, {
    you: 'Fang',
    me: 'Qi'
  })
})

app.listen(3333, () => {
  console.log('koa is running at 3333')
})