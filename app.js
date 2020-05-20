const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
// set static files, folder public
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));


// LocalHost

// mongoDB config
// mongoose.connect('mongodb://localhost/blogDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// My testing server
mongoose.connect("mongodb+srv://readOnlyUser:veryHardToCrack@cluster0-iktye.mongodb.net/blogDB", {
  useNewUrlParser: true, useUnifiedTopology: true
}); // read only permission


// few samples/test posts
const examples = require(__dirname+'/examples.js');
posts = examples.examplePosts();
// end of samples

const newPosts = [];

const categoryList = ['programming', 'gym', 'recipes', 'other'];

class Post {
  constructor (title, content, category) {
    this.title = title;
    this.content = content;
    this.category = category;
  }
};
// mongoDB schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String
});
// mongoDB model
const PostDB = mongoose.model('Post', postSchema);

// const testPost = new PostDB({
//   title: 'Test DB post test title',
//   content: 'Test DB content, content, Test DB contentTest DB contentTest DB contentTest DB contentTest DB content',
//   category: 'gym'
// });
// testPost.save();



const createPosts = (arr)=> {
  const amount = arr.length;
  for (let i=0; i<amount; i++) {
    const post = new Post (arr[i].title, arr[i].content, arr[i].category);
    newPosts.unshift(post);
  }
};
createPosts(posts);

// (req,res)=>{}
let chosenDB = 'staticDB';

// generate posts from mangoDB or local (array)
app.post('/', (req,res)=>{
  chosenDB = req.body.changeDB;
  res.redirect('/');
});

app.get('/', (req,res)=>{  
  if (chosenDB == 'staticDB') {
    res.render('home', {postsArr: newPosts, check: chosenDB} );
  } else if (chosenDB == 'mongoDB') {
    PostDB.find({}, (err, foundPosts)=>{
      res.render('home', {postsArr: foundPosts, check: chosenDB} );
    });
  }
});

app.get('/about', (req,res)=>{
  res.render('about');
});

// render selected post 
app.get('/posts/:postTitle', (req,res)=>{  
  const reqPostTitle = req.params.postTitle;
  // search for post in DB then in 'newPosts' array
  PostDB.findOne({title: reqPostTitle}, (err, foundPost)=>{
    if (foundPost) { // generate post from DB
      // console.log('Found post in DB');    
      res.render('post', { 
        postTitle: foundPost.title, 
        postContent: foundPost.content,
        postCategory: foundPost.category
      });
    } else { // generate post from Array
      // console.log('Found post in Array');  
      const foundPostArr = newPosts.find((e)=>{
        if (e.title == reqPostTitle) {
          return e;
        }
      });
      res.render('post', {
        postTitle: foundPostArr.title, 
        postContent: foundPostArr.content,
        postCategory: foundPostArr.category
      });
    }
  });
});

// render category post 
app.get('/category/:categoryName', (req,res)=>{  
  const reqCatName = req.params.categoryName;
  if (chosenDB == 'staticDB') {
    const foundCat = newPosts.filter((e)=>{ // looking for posts in static arr
      if (e.category == reqCatName) {
        return e;
      }
    }); 
    res.render('category', { 
      catArr: foundCat,
      postCategory: _.capitalize(foundCat[0].category),
      linkCategory: foundCat[0].category
    });    
  } else if (chosenDB == 'mongoDB') {   // looking for posts in mongoDB
    PostDB.find({category: reqCatName}, (err, foundPosts)=>{
      res.render('category', {
        catArr: foundPosts,
        postCategory: _.capitalize(foundPosts[0].category),
        linkCategory: foundPosts[0].category
      });
    });
  }
});

//render add/new posts
app.get('/add', (req,res)=>{
  res.render('add');
});
// add new post
app.post('/add', (req,res)=>{
  const title = req.body.addTitle;
  const content = req.body.postBody;
  const category = req.body.addCategory;
  const database = req.body.changeDB; // check where to save it
  if (database == 'staticDatabase') { // save to static array
    const post = new Post (title, content, category);
    newPosts.unshift(post);
    res.redirect('/');
  } 
  else if (database == 'mongoDatabase') { // save to mongoDB
    const post = new PostDB({
    title: title,
    content: content,
    category: category
    });
    post.save();
    res.redirect('/');
  }
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}.`);  
});