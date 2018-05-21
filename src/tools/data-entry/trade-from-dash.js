import Trade from '../../models/trade'
import mongoose from 'mongoose'

const inputFile = `${__dirname}/dash-trade.tsv`

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/jams')

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(inputFile)
})

lineReader.on('line', (line) => {
  const split = line.split('\t')
  let phone = split[1].replace(' ext ____').replace('(', '').replace(')', '').replace('-', '').replace('undefined', '').replace(' ', '')

  if (phone.length > 10) {
    if (phone[0] === '1') {
      phone = phone.substr(1, 10)
    } else {
      phone = phone.substr(0, 10)
    }
  }

  const newTrade = new Trade({
    name: split[0],
    phone,
    address: `${split[3]}, ${split[4]}, ${split[5]}, ${split[6]}, ${split[7]}`,
    division: '01 — General Requirements'
  })

  newTrade.save()
})