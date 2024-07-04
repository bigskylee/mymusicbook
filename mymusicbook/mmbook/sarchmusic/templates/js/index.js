var express = require('express')
var router = express.Router()
var port = 3000
var path = require('path')
var app = express()
var axios = require('axios')
var aspose = aspose || {}
const fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
// aspose.cells = require('aspose.cells')

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
        var url =
            'https://www.tjmedia.com/tjsong/song_search_list.asp?strType=2&natType=&strText=' +
            surch.test +
            '&strCond=0&intPage='
        var song = []
        while (number >= 1) {
            var url2 = url + number
            // while (chack == 1) {
            const music = await axios.get(url2)
            // const jsonmusic = JSON.parse(music.data)
            var $ = cheerio.load(music.data)
            $('#BoardType1').each((i, row) => {
                const musictrs = $(row).find('tr')
                // 예를 들어 첫 번째 td 요소만 가져오기
                i = 1
                while (i <= 15) {
                    wtexttr = $(musictrs[i]).find('td')
                    mnumber = $(wtexttr[0]).text()
                    mname = $(wtexttr[1]).text()
                    msinga = $(wtexttr[2]).text()
                    mcomposer = $(wtexttr[3]).text()
                    mlyricist = $(wtexttr[4]).text()
                    if (mnumber == '') {
                        console.log('stop')
                        break
                    }
                    console.log(mnumber, mname, msinga, mcomposer, mlyricist)
                    song.push({
                        mnumber: mnumber,
                        mname: mname,
                        msinga: msinga,
                        mcomposer: mcomposer,
                        mlyricist: mlyricist,
                    })
                    i++
                }
            })
            if (mnumber == '') {
                console.log('stop2')
                break
            }
            number++
        }
        res.sendfill('html/home.html', song)
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
