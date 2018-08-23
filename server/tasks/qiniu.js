const qiniu = require('qiniu')
// const mongoose = require('mongoose')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg) // 七牛上传对象

// const Movie = mongoose.model('Movie')

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
      client.fetch(url, bucket, key, (err, ret, info) => {
        if (err) {
          reject(err)
        }
        else {
          if (info.statusCode === 200) {
            resolve({key})
          } else {
            reject(info)
          }
        }
      })
    })
  }

;(async () => {
  // let movies = await Movie.find({
  //   $or: [
  //     {videoKey: {$exists: false}},
  //     {videoKey: null},
  //     {videoKey: ''}
  //   ]
  // }).exec()
  let movies = [{
    doubanId: 30253080,
    title: '汉纳·加斯比：娜奈特',
    rate: 9.5,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2525732775.jpg'
  },
    {
      doubanId: 30234901,
      title: '尖端医疗的真相',
      rate: 8.7,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2529130167.jpg'
    }]

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    console.log(movie)
    if (movie.video && !movie.videoKey) {
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        console.log(videoData)
        console.log(movie)

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        await movie.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
})()
