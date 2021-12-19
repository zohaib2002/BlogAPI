const express = require('express')
const mongoose = require('mongoose')

// Import models
const Post = require('./src/models/post')

// Define Application
const app = express()

// Define Database Connection
const db = mongoose.connect('mongodb://localhost:27017/blogdb')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', function(req, res) {
    // Handle the request for the root route
    res.send({ping: 'pong'})
})



// Create a post
// USAGE: POST http://localhost:8080/posts
// Request body contains the post in JSON format
app.post('/posts', function(req, res) {

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({msg: "Please provide a body for the request"})
    }

    // Get values from request payload
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content
    var post = new Post()

    // Assign values to post model
    post.title = title
    post.author = author
    post.content = content
    post.save(function(error, savedPost) {
        if (error) {
            // send error response
            res.status(500).send({ error: 'Unable to save Post' })
        } else {
            // send success response
            res.status(200).send(savedPost)
        }
    })
    //res.send({title: title, author: author, content: content})
})


// Get a Post by its title
// USAGE: GET http://localhost:8080/posts?title=Catchy+Blog+Title
// Returns the list of all posts if no query passed
// USAGE: GET http://localhost:8080/posts
app.get('/posts', function(req, res) {

    queryPassed = !(Object.keys(req.query).length === 0)

    var title = ""

    if (queryPassed) {
        title = req.query.title
        title = title.split('+').join(' ')
    }

    Post.find((queryPassed)?{title: title}:{}, function(error, posts) {
      if(error) {
        // send error response
        res.status(422).send({ error: 'Unable to fetch posts '})
      } else {
        // send success response
        // returns an empty list if no matchin posts
        res.status(200).send(posts)
      }
    })
  })

  // Deleting a post
  // USAGE: DELETE http://localhost:8080/posts?title=Catchy+Blog+Title
  app.delete('/posts', function(req, res) {

    queryPassed = !(Object.keys(req.query).length === 0)

    var title = ""

    if (queryPassed) {
        title = req.query.title
        title = title.split('+').join(' ')
    } else {
        res.status(400).send({error: "Must provide a title to delete"})
    }

    Post.find({title: title}, function(error, posts) {
      if(error) {
        // send error response
        res.status(422).send({ error: 'Unable to fetch posts '})
      } else {
        // send success response
        // we are expecting all titles to be unique
        if (posts.length > 0) {
            posts[0].delete()
            res.status(200).send({msg: "Post deleted successfully"})
        } else {
            res.status(422).send({error: "No Post Deleted"})
        }
      }
    })
  })


  // Updating a post
  // USAGE: PATCH http://localhost:8080/posts?title=Catchy+Blog+Title
  // The new post should be passed as request body in JSON format
  app.patch('/posts', function(req, res) {
    
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({msg: "Please provide a body for the request"})
    }

    var newPost = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    }    

    queryPassed = !(Object.keys(req.query).length === 0)

    var title = ""

    if (queryPassed) {
        title = req.query.title
        title = title.split('+').join(' ')
    } else {
        res.status(400).send({error: "Must provide a title to modify"})
    }

   Post.updateOne({title: title}, newPost, function(err, docs) {
        if (err){
            res.status(400).send({error: 'Unable to modify records'})
        }
        else{
           res.status(200).send(docs)
        }
   })
  })



app.listen(8080, function() {
    console.log('Server is running on PORT 8080')
})