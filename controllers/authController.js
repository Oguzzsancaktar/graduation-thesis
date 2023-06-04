const dataAccess = require('../data-access')
const { StatusCodes } = require('http-status-codes')

// CRUD
const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await dataAccess.userDataAccess.findUser({ email })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found with this email')
    }

    const isMatch = user.password === password

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Invalid password')
    }

    res.status(StatusCodes.CREATED).json(user)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  signIn,
}
