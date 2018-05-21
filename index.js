import app from './app'

/* Server Start ================================================================================= */
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening at ${port}`))
