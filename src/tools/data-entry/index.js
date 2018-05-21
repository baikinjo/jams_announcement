import User from '../../models/user'
import mongoose from 'mongoose'

const fs = require('fs')
const parse = require('csv-parse')
const async = require('async')

console.log('process.argv', process.argv)

const inputFile = `${__dirname}/SiteUsers.csv`

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/jams')

let i = 0
const doSomething = async (line) => {
  if (i > 0) {
    const firstName = line[0]
    const lastName = line[1]
    const email = line[2].toLowerCase()
    const position = line[3]
    const phone = line[4].replace('.', '-')

    const foundUser = await User.find({email: email.toLowerCase()})
    if (!foundUser.length) {

      console.log(`created ${firstName}`)
      const newUser = new User({
        firstName,
        lastName: lastName || 'NA',
        email,
        position,
        phone: phone || '000-000-0000',
        role: 'NORMAL_USER'
      })
      await newUser.save()

    } else {
      console.log(`${firstName} exists`)
    }
  }
  i++
}
const parser = parse({delimiter: ','}, function (err, data) {

  if (!err) {
    async.eachSeries(data, function (line, callback) {
      // do something with the line
      doSomething(line).then(function () {
        // console.log(line)
        // when processing finishes invoke the callback to move to the next one
        callback()
      })
    })
  }
})
fs.createReadStream(inputFile).pipe(parser)