//! Imports go at the top
const express = require('express')
const server = express()
// the instructions will refer to my 'server' variable as 'app'
const cors = require('cors')
require('dotenv').config()

const {login, register} = require('./controllers/auth.js')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {PORT} = process.env

const { sequelize } = require('./util/database')
const { Post } = require('./models/post')
const { User } = require('./models/user')
const seed = require('./util/seed')

//! middleware
server.use(express.json())
server.use(cors())

//! Relationships
User.hasMany(Post)
Post.belongsTo(User)

//! Endpoints
// AUTH endpoints
server.post('/register', register)
server.post('/login', login)

// GET POSTS - no auth
server.get('/posts', getAllPosts)
server.get('/userposts/:userid', getCurrentUserPosts)

// EDITING USER POSTS - auth required
server.post('/posts', isAuthenticated, addPost)
server.put('/posts/:id', isAuthenticated, editPost)
server.delete('/posts/:id', isAuthenticated, deletePost)




//! listen statement (port, function to run)
sequelize
   .sync()
   // .sync({force: true})
   // .then(() => seed())
   .then(() => {
      server.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
   })
   .catch(err => console.log(err))