var express = require('express')
var router = express.Router()
var port = 3000
var path = require('path')
var app = express()
var axios = require('axios')

/* GET home page. */
app.get('/', async function (req, res, next) {
    const html = path.resolve(__dirname + '/html/home.html')

    res.sendfile(html)
})

app.use(express.urlencoded({ extended: false }))
app.post('/test', async function (req, res, next) {
    const surch = req.body
    // res.send(surch)

    try {
        var number = 1
        // while (chack == 1) {
        const music = await axios.get(
            'https://www.tjmedia.com/tjsong/song_search_list.asp?strType=2&natType=&strText=' +
                surch.test +
                '&strCond=0&intPage=' +
                number,
        )
        const jsonmusic = JSON.parse(music.data)

        console.log(jsonmusic)
        //     if (number < 5) {
        console.log(music.data)
        console.log(typeof music.data)
        //         number++
        //     } else {
        //         chack == 2
        //     }
        // }
        res.send(music.data)
    } catch (e) {
        console.error(e)
        res.send('에러')
    }

    const html = path.resolve(__dirname + '/html/home.html')
})

app.listen(port, () => {
    console.log('테스트중123')
})
// odule.exports = router
