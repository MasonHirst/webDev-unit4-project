require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
// The above line is destructuring the SECRET variable from my dotenv file. (.env)

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        // the above line uses the .get() method, which takes the name of a header in the request object, and returns its value

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
            //this if-statement says: "if the request object header called Authorization does not have a good value, send an error message and 401 status"
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
            // the above line takes the headerToken (authorization header value), and translates it with the secret variable you set.
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
        // I believe if the function makes it to this point without throwing an error, the 'next()' allows the request to continue to the next middleware function
    }
}