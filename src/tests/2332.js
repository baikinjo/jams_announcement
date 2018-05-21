// /* eslint no-undef: 0 */

// /* Models ======================================================================================= */
// import db from '../startup/db'
// import Trade from '../models/trade'
// import * as testData from './testData'

// /* Tests ======================================================================================= */
// describe('Trade model', () => {
//   let trade

//   beforeAll(async () => {
//     db()
//     await Trade.remove({})
//   })

//   beforeEach(() => {
//     trade = new Trade(testData.TRADE_DATA)
//     return trade.save()
//   })

//   afterEach(() => {
//     return Trade.remove({})
//   })

//   afterAll(() => {
//     db().close()
//   })

//   it('Should return a result when match', () => {
//     return Trade.find({}).then((result) => {
//       expect(result).toHaveLength(1)
//     })
//   })

//   it('should send error message if required information is not fullfilled', () => {
//     const trade = new Trade(testData.FALSE_TRADE_DATA)
//     return trade.save().then((result) => {
//       expect(result).toHaveLength(0)
//     }).catch((error) => {
//       expect(error).toBeTruthy()
//       expect(error._message).toBe('trade validation failed')
//       expect(error.message).toBe('trade validation failed: address: Path `address` is required.')
//     })
//   })

//   it('should be able to edit and reflect updated data', () => {
//     return Trade.findByIdAndUpdate(
//       trade._id,
//       { email: 'abik@chagned.com' },
//       { new: true }
//     ).then((result) => {
//       expect(result.email).toBe('abik@chagned.com')
//     })
//   })

//   it('should throw an error if user tries to update empty value that is required', () => {
//     return Trade.findOneAndUpdate(
//       { _id: trade._id },
//       { $set: { name: '' } },
//       { new: true, runValidators: true }
//     ).then((result) => {
//       expect(result).toHaveLength(0)
//     }).catch((error) => {
//       expect(error).toBeTruthy()
//       expect(error._message).toBe('Validation failed')
//       expect(error.message).toBe('Validation failed: name: Path `name` is required.')
//     })
//   })

//   it('should delete data', async () => {
//     await Trade.findOneAndRemove({ _id: trade._id })

//     return Trade.find({}).then((result) => {
//       expect(result).toHaveLength(0)
//     })
//   })
// })