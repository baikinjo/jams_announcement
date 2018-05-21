// /* eslint no-undef: 0 */

// /* Models ======================================================================================= */
// import db from '../startup/db'
// import Contact from '../models/contact'
// import Trade from '../models/trade'
// import * as testData from './testData'

// /* Tests ======================================================================================= */
// describe('Contact model', () => {
//   let contact, trade

//   beforeAll(async () => {
//     db()
//     await Trade.remove({})
//     await Contact.remove({})
//   })

//   beforeEach(() => {
//     trade = new Trade(testData.TRADE_DATA)
//     return trade.save()
//   })

//   afterEach(async () => {
//     await Trade.remove({})
//     await Contact.remove({})
//   })

//   afterAll((done) => {
//     db().close()
//   })

//   test('should send an error message if required contact information is not filled in', () => {
//     contact = new Contact(testData.FALSE_CONTACT_DATA)

//     return contact.save().then((result) => {
//       expect(result).toHaveLength(0)
//     }).catch((error) => {
//       expect(error).toBeTruthy()
//       expect(error._message).toBe('contact validation failed')
//       expect(error.message).toBe('contact validation failed: trade: Path `trade` is required., email: Path `email` is required., phone: Path `phone` is required., firstName: Path `firstName` is required.')
//     })
//   })

//   test('Should return a result when match', async () => {
//     const trades = await Trade.find().limit(1)

//     contact = new Contact({
//       ...testData.CONTACT_DATA,
//       trade: trades[0]._id
//     })

//     await contact.save()

//     return Contact.find({ firstName: 'Dilly' }).limit(1)
//       .populate('trade')
//       .then((result) => {
//         expect(result[0].trade.name === 'Abc Company')
//       })
//   })

//   test('should send an error message if trade information is not filled in', () => {
//     contact = new Contact(testData.CONTACT_DATA)
//     return contact.save().then((result) => {
//       expect(result).toHaveLength(0)
//     }).catch((error) => {
//       expect(error).toBeTruthy()
//       expect(error._message).toBe('contact validation failed')
//       expect(error.message).toBe('contact validation failed: trade: Path `trade` is required.')
//     })
//   })
// })