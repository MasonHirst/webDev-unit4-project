const { Post } = require('../models/post')
const { User } = require('../models/user')

module.exports = {
   getAllPosts: async (req, res) => {
      try {
         const posts = await Post.findAll({
            where: {privateStatus: false},
            include: [{
               model: User,
               required: true,
               attributes: [`username`]
            }]
         })
         res.status(200).send(posts)
      } catch (error) {
         console.log('ERROR IN getAllPosts')
         console.log(error)
         res.sendStatus(400)
      }
   },


   getCurrentUserPosts: async (req, res) => {
      try {
         const {userId} = req.params
         const userPosts = await Post.findAll({
            where: {userId: userId},
            include: [{
               model: User,
               required: true,
               attributes: [`username`]
            }]
         })
         res.status(200).send(userPosts)
      } catch (err) {
         console.log(err)
         res.status(501).send(err)
      }
   },


   addPost: async (req, res) => {
      try {
         const { title, content, status, userId } = req.body
         await Post.create({
            title,
            content,
            privateStatus: status,
            userId,
         })
         res.status(200).send('Post succesful')
      } catch (err) {
         console.log(
            '.........................................................----------------..',
            err
         )
         res.status(400).send('Post could not be posted', err)
      }
   },

   editPost: async (req, res) => {
      try {
         const { status } = req.body
         const { id } = req.params
         await Post.update({privateStatus: status}, {
            where: {id: +id}
         })
         res.status(200).send('post updated!')
      } catch (err) {
         res.status(400).send(`edit post sequelize try failed, ${err}`)
      }
   },

   deletePost: async (req, res) => {
      try {
         const { id } = req.params
         await Post.destroy({where: {id: +id}})
         res.status(200).send('post deleted!')
      } catch (err) {
         console.log(err)
         res.status(400).send(`deletePost try failed: ${err}`)
      }
   },
}
