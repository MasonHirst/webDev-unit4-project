require('dotenv').config()
const { SECRET } = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/user')

const createToken = (username, id) => {
   const payload = { username, id }
   const options = { expiresIn: '2 days' }
   return jwt.sign(payload, SECRET, options)
}

module.exports = {
   register: async (req, res) => {
      try {
         const { username, password } = req.body
         const user = await User.findOne({ where: { username: username } })
         if (user) {
            console.log(
               '.................................. User exists already'
            )
            return res.status(400).send({ error: 'Username already exists' })
         }
         // the above lines check to see if a username exists, and if it does, it ends the function and sends a response

         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(password, salt)
         // the above lines use bcrypt to hash the password, to make it secure and make sure we never store a user's password

         try {
            const newUser = await User.create({
               username: username,
               hashedPass: hash,
            })
            const token = createToken(newUser.username, newUser.id)
            const exp = Date.now() + 1000 * 60 * 60 * 48
            // the line above takes the current time, adds 1 second (1000 ms), then multiplies by numbers that make it 2 days

            res.send({
               username: newUser.username,
               userId: newUser.id,
               token,
               exp,
            })
         } catch (err) {
            console.log(
               '............................................ error creating a new user',
               err
            )
         }
      } catch (err) {
         console.log(err)
         res.status(500).send({ error: 'Error creating user' })
      }
   },

   login: async (req, res) => {
      try {
         const { username, password } = req.body
         const foundUser = await User.findOne({ where: { username } })
         if (foundUser) {
            const isAuthenticated = bcrypt.compareSync(
               password,
               foundUser.hashedPass
            )
            if (isAuthenticated) {
               const token = createToken(foundUser.username, foundUser.id)
               const exp = Date.now() + 1000 * 60 * 60 * 48
               res.status(200).send({
                  username: foundUser.username,
                  userId: foundUser.id,
                  token,
                  exp,
               })
            } else {
               res.status(400).send('cannot log in')
            }
         } else {
            console.log('................................... user not found')
         }
      } catch (err) {
         console.log(
            '........................................ could not login',
            err
         )
         res.sendStatus(400)
      }
   },
}
