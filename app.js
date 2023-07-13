const express=require("express");
const app=express();
const path=require('path');
require('./db/conn');
// require('./js/index')
const Courses=require('./models/course');
const Cart=require('./models/cart')
const port=6528;
const session=require('express-session');
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')(session)
// const connection=mongoose.connection;
app.use("/public", express.static(path.join(__dirname, "public")));
const public=path.join(__dirname,"public");
app.use(express.static(public));
const staticPath=path.join(__dirname,"views");
app.get(express.static(staticPath));
var bodyParser=require("body-parser");
const { connection, default: mongoose, Collection } = require('mongoose');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
let mongostore = new MongoDbStore({
    mongooseConnection:connection,
    collection:'sessions'
})
// app.use(session({
//     secret:process.env.COOKIE_SECRET,
//     resave:false,
//     store:mongostore,
//     saveUninitialized:false,
//     cookie:{maxAge:1000*60*60*24}
// }))
// app.use(flash())
const Review=require('./models/review')
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});
app.get('/views/courses', async function(req, res) {
    const courses=await Courses.find();
    // console.log(courses);
    return res.render('courses',{courses:courses});
});
app.get('/views/cart', function(req, res) {
    res.render('cart');
});
app.get('/views/productdetails/:piid', async function(req, res) {
    const {piid}=req.params;
    // console.log({piid});
    const p=await Courses.findById(piid).populate('reviews');
    // const j=await Courses.findById(piid).populate('authors');
    // console.log(p)
    // console.log(p);
    res.render('productdetails',{product:p});
    // res.render('productdetails',{product:j});
});
app.post('/views/productdetails/:rid/reviews',async(req,res)=>{
    const id=req.params.rid;
    console.log(req.params.rid);
    // console.log(req.body.review)
    const review=new Review({
        review:req.body.review,
        author:req.body.author
    })
    await  review.save()
    // await author.save()
        const k=await Courses.findById(req.params.rid)
        // console.log(k)
        k.reviews.push(review)
        // k.reviews.push(author)
        const course=new Courses(k)
        // console.log(k)
        // console.log(course)
      await course.save();
      res.redirect(`/views/productdetails/${id}`);

})

app.listen(port,(req,res)=>{
    console.log(`connection successfull on port number ${port}`)
});
