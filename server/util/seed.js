const { Post } = require('../models/post')

const allPosts = [
   {
      title: 'I wasn\'nt at fault!',
      content: 'If anyone asks, I did NOT do it.',
      privateStatus: false,
      userId: 6
   },
   {
      title: 'At the beach!',
      content: 'Look at this photo of us at the beach! Give me attention!',
      privateStatus: false,
      userId: 13
   },
   {
      title: 'My secret confession',
      content: 'Hopefully noone else sees this, since I am setting this post to private. I ate my brother\'s lolipop.',
      privateStatus: true,
      userId: 8
   },
   {
      title: 'Life sucks',
      content: 'Anyone wanna play board games tonight?? I\'m bored as frik.',
      privateStatus: false,
      userId: 4
   },
   {
      title: 'The debate',
      content: 'presidential debates are so dumb! All they do is fight...',
      privateStatus: false,
      userId: 12
   },
   {
      title: 'a private post from Mason',
      content: 'once upon a time, there was a private post on a practice server. The end',
      privateStatus: true,
      userId: 9
   },
   {
      title: 'Potatoes',
      content: "aren't potatoes just soooo good??",
      privateStatus: false,
      userId: 8
   }
]


const seed = async () => {
   await Post.bulkCreate(allPosts)
}

module.exports = seed