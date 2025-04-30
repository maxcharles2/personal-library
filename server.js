const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 3000;
const { ObjectId } = require('mongodb');
const dotenv = require('dotenv') //import this to allow process.env to work to access your password from the env file and mask password with a template literal

dotenv.config(); //returns an object that contains all the parsed environment variables from the .env variable

var db, collection;
//${process.env.DB_PASSWORD}
//mongodb+srv://maxcharlesdev:mongo-access@express-app-cluster.pmoffnv.mongodb.net/course-tracker?retryWrites=true&w=majority&appName=Express-app-cluster
const url = `mongodb+srv://maxcharlesdev:mongo-access@express-app-cluster.pmoffnv.mongodb.net/personal-library?retryWrites=true&w=majority&appName=Express-app-cluster`;
// const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@express-app-cluster.pmoffnv.mongodb.net/personal-library?retryWrites=true&w=majority&appName=Express-app-cluster`;
const dbName = "personal-library-database"; //was originally called demo not sure what this relates to

app.listen(PORT, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!", `On port ${PORT}!`);
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
      //result is an array coming back from the MongoDB database
      //the result array is the entire collection (array of objects), the document is an object that represents a single element in the array
    res.render('index.ejs', {bookList: result})
  })
})

app.post('/createBookEntry', (req, res) => {
  //the request (req) is coming from the form submission in index.ejs
  console.log("request body", req.body)

  db.collection('books').insertOne({bookNameDB: req.body.bookNameFromForm, bookAuthorDB: req.body.bookAuthorFromForm, yearCreatedDB: parseInt(req.body.yearCreatedFromForm), currentlyReadingDB: req.body.currentlyReadingChoiceFromForm, readingProgressDB: req.body.readingProgressFromForm}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/') //make a get request for the '/' route and show most recent update of data from database
  })
})

app.put('/updateBookEntry/reading', (req, res) => {
  // console.log("request body", req.body)
  //for MongoDB document names left side are the attributes, right side is value from incoming request from the fetch API
  const bookId = req.body._id;
  db.collection('books')
  .findOneAndUpdate({ _id: ObjectId(bookId) }, {
    $set: {
      currentlyReadingDB: "yes"
      // thumbUp (comes from the thumbUp key in a specific document from mongoDB)
      // req.body.thumbUp is the request that comes from main.js fetch
      // { thumbUp + 1 } for inc if you want to use it
    }
  }, {
    sort: {_id: -1},
    upsert: false //upsert true will create a new entry if it doesn't exist in the database so setting to false will help you realize the names are not matching
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/updateBookEntry/notReading', (req, res) => {
  console.log(req.body)
  const bookId = req.body._id;
  db.collection('books')
  .findOneAndUpdate({ _id: ObjectId(bookId) }, {
    $set: {
      currentlyReadingDB: "no"
      // { thumbUp - 1} for $inc
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/updateReadingProgress', (req, res) => {
  console.log(req.body)
  const bookId = req.body._id;
  db.collection('books')
  .findOneAndUpdate({ _id: ObjectId(bookId) }, {
    $set: {
      readingProgressDB: req.body.readingProgress
      // { thumbUp - 1} for $inc
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/deleteBookEntry', (req, res) => {
  const bookId = req.body._id;
  db.collection('books').findOneAndDelete({ _id: ObjectId(bookId) }, (err, result) => {
    if (err) return res.send(500, err)
    // res.send('Message deleted!')
    res.send(result)
    // res.redirect('/')
  })
})

// function function1(){

// }

// async function function2(){
//   return "Hello";
// }

// function2().then(result => console.log(result));

// const result = function2();
// console.log(result);

