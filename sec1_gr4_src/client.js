const express = require('express');
const port = 8027;
const path = require('path')
const app =express();
const dotenv = require("dotenv");
const router = express.Router();
const mysql = require('mysql2');
const jwt = require("jsonwebtoken")
const cors = require('cors')
// const http = require('http');
// const axios = require("axios").default;

dotenv.config();


app.use(cors());
app.use(router)
app.use(express.static(path.join(__dirname, 'public')));

router.use(express.json());
router.use(express.urlencoded( {extended: true}));
/* index page */
router.get('/', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}/public/index.html`))
})
router.get('/index.html', (req, res) => {
    console.log('index page')
    res.redirect("/home");
})
router.get('/home', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}/index.html`))
})

/* product page */
router.get('/detailproduct/product.html', (req, res) => {
    console.log('Request at' + req.url)
    res.redirect("/product");

})
router.get('/product', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}/public/detailproduct/product.html`))  
})
/*  admin page */
router.get('/adminpage/About%20Us.html', (req, res) => {
    console.log('index page')
    res.redirect("/aboutus");
})
router.get('/aboutus', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}//public/adminpage/About-Us.html`))  
})


/*  ADDMININFO */

/*  admin page */
router.get('/admin', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}/main-admin.html`))  
})

router.get('/main-admin.html', (req, res) => {
    console.log('Request at' + req.url)
    res.redirect("/admin");
})


router.post('/product_info', (req, res) => {
    console.log('Request at' + req.url)
    res.sendFile(path.join(`${__dirname}/main-admin.html`)) 
})



app.listen(port, function () {
    console.log("Server listening at Port "
    + port);});