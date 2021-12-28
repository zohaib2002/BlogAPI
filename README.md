# Blog API

A simple Blog API with CRUD operations made using Express.js and MongoDB

This API is hosted on Heroku: https://blog1api.herokuapp.com/  
MongoDB database is hosted on MongoDB Atlas (Shared) (M0 Sandbox)

## USAGE

**Create a post**  
`POST https://blog1api.herokuapp.com/posts`  
<br/>
Request body contains the post in JSON format

```
{
	"title" : "Catchy Blog Title",
	"author" : "Mr. Author",
	"content" : "Hello, World!"
}
```

<br/>

**Get a Post by its title**  
`GET https://blog1api.herokuapp.com/posts?title=Catchy+Blog+Title`  
<br/>
Returns the list **of all posts** if no query passed  
`GET https://blog1api.herokuapp.com/posts`

<br/>

**Deleting a post**  
`DELETE https://blog1api.herokuapp.com/posts?title=Catchy+Blog+Title`

<br/>

**Updating a post**  
`PATCH https://blog1api.herokuapp.com/posts?title=Catchy+Blog+Title`  
The new post should be passed as request body in JSON format
