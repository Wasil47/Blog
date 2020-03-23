const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
// set static files, folder public
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// few samples/test posts
const examples = require(__dirname+'/examples.js');
posts = examples.examplePosts();
// end of samples

const newPosts = [];

class Post {
  constructor (title, content, category) {
    this.title = title;
    this.content = content;
    this.category = category;
  }
};

const createPosts = (arr)=> {
  const amount = arr.length;
  for (let i=0; i<amount; i++) {
    const post = new Post (arr[i].title, arr[i].content, arr[i].category);
    newPosts.unshift(post);
  }
};
createPosts(posts);

// (req,res)=>{}

app.get('/', (req,res)=>{
  res.render('home', {postsArr: newPosts} );
});
app.get('/about', (req,res)=>{
  res.render('about');
});

// render selected post 
app.get('/posts/:postId', (req,res)=>{  
  const reqPostId = req.params.postId;
  const foundPost = newPosts.find((e)=>{
    if (e.title == reqPostId) {
      return e;
    }
  });
  res.render('post', { 
    postTitle: foundPost.title, 
    postContent: foundPost.content,
    postCategory: foundPost.category
  });
});
// render category post 
app.get('/category/:categoryId', (req,res)=>{  
  const reqCatId = req.params.categoryId;
  const foundCat = newPosts.filter((e)=>{
    if (e.category == reqCatId) {
      return e;
    }
  }); 
  res.render('category', { 
    catArr: foundCat,
    // postTitle: foundCat.title, 
    // postContent: foundCat.content,
    postCategory: _.capitalize(foundCat[0].category),
    linkCategory: foundCat[0].category
  });
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
  const post = new Post (title, content, category);
  newPosts.unshift(post);
  res.redirect('/');
});


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}.`);  
});