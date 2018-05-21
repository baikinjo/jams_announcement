## Models
* * *
 When updating model, make sure to update the model's helper as well because thats where fields get validated.

 Look into hooks if you need to process data before/after some query

    someSchema.pre('remove', async (next, done) => {
      ...
    })

 However, keep in mind that this is seperate from express. Typical use case would be cascade delete, hashing password for users, etc.

## Dependencies
* * *
If following dependencies break, our API breaks.

Model          | Dependent on
-------------- | ---------------
Contact        | Trade
Daily          | Trade, User
Permission Set | Project
Pour           | Concrete Addon, Concrete, User
Project        | Contact, Trade, User
User           | Permission Set