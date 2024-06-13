const express = require('express');
const port = 8028;
const path = require('path')
const app =express();
const dotenv = require("dotenv");
const router = express.Router();
const mysql = require('mysql2');
const cors = require("cors")





router.use(express.json());
router.use(express.urlencoded( {extended: true}));
app.use(router)
let whiteList = ["http://localhost:8027", "http://localhost:8028"];

let corsOptions = {
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};


router.use(cors(corsOptions));
dotenv.config();
// connection to mysql
var connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
})

connection.connect(function(err){
    if(err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

const jwt = require("jsonwebtoken");
const { get } = require('http');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer Token
    var decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: true, message: "Authentication failed!" });
  }
};

/* CRUD ADMIN info. */


// Testing Insert a new Admin 
// method: post
// URL: http://localhost:8028/admin_info
// body: raw JSON
// ตัวอย่างที่ 1
// {
//     "fname_admin": "Jack",
//     "lname_admin": "Jacob",
//     "identitynum_admin": 1340987800435,
//     "address_admin": "เชียงใหม่ ดอยอินทนนท์",
//     "bday_admin": "1990-03-18",
//     "id_admin": "A00005",
//     "tel_admin": "0923453428",
//     "email_admin": "Jack@gmail.com",
//     "other_admin": ""
// }

// ตัวอย่างที่ 2
// {
//     "fname_admin": "Jannifer",
//     "lname_admin": "Hopper",
//     "identitynum_admin": 1256789044003,
//     "address_admin": "แม่ฮ่องสอน ปาย",
//     "bday_admin": "1996-12-23",
//     "id_admin": "A00006",
//     "tel_admin": "0955435678",
//     "email_admin": "Jannifer@gmail.com",
//     "other_admin": "I love Gameee"
// }
/* INSERT */
router.post('/admin_info', function (req,res){
    let admin_info = req.body;
    console.log(admin_info);
    if (!admin_info){
        return res.status(400).send({error: true, messege: " Please provide product infomation"});

    }
    connection.query("insert into admin_info set ? ", admin_info, function (error, results){
            if (error)
              return res.send({
                error: admin_info,
                message: "The admin information incorrect.",
              });
        return res.send({
            error: false,
            data: results.affectedRows,
            message: "New admin has been created successfully.",
          });
    })
})



// Testing Update  Admin 
// method: put
// URL: http://localhost:8028/admin_info
// body: raw JSON

// ตัวอย่างที่ 1
// {
//     "address_admin": "ลำปาง บ้านน้ำโท้ง",
//     "bday_admin": "1996-12-23",
//     "id_admin": "A00005",
//     "tel_admin": "0955435678",
//     "email_admin": "Jannifer@gmail.com",
//     "other_admin": "Need more sleeppp"
// }

// ตัวอย่างที่ 2
// {
//     "fname_admin": "Pannipa",
//     "lname_admin": "Weenanut",
//     "id_admin": "A00006",
//     "tel_admin": "0981235436",
//     "email_admin": "Pannipa@gmail.com",
//     "other_admin": ""
// }
/* Update */
router.put('/admin_info', function (req,res){
    let adminID = req.body.id_admin;
    let admin_info = req.body;
    console.log(adminID);

    if (!admin_info || !adminID){
        return res.status(400).send({error: true, messege: " Please provide admin infomation"});
    }
    connection.query("update admin_info set ? where id_admin = ?", [admin_info,adminID], function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: "Admin has been updated successfully.",
          });
    })
})

// Testing Delete Admin 
// method: delete
// URL: http://localhost:8028/admin_info
// body: raw JSON

// ตัวอย่างที่ 1
// {
//     "id_admin": "A00005"
// }

// ตัวอย่างที่ 2
// {  
//     "id_admin": "A00006"
// }

// /* DELETE */
router.delete('/admin_info', function (req,res){
    let adminID = req.body.id_admin;
    console.log(adminID);

    if (!adminID ){
        return res.status(400).send({error: true, messege: " Please provide ID admin"});
    }
    connection.query("DELETE from admin_info where id_admin = ?", adminID, function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            
            message: adminID+" has been deleted successfully.",
        });
    })
})

// Testing Selcet a Admin 
// method: get
// URL: http://localhost:8028/admin_info/A00001
// URL: http://localhost:8028/admin_info/A00002
//

/* select */
router.get('/admin_info/:id', function (req,res){
    let adminID = req.params.id;
    console.log(adminID);

    if (!adminID ){
        return res.status(400).send({error: true, messege: " Please provide ID admin"});
    }
    if(adminID.indexOf("A000") !== -1 || adminID.indexOf("a000") ) {
        connection.query("select * from admin_info where id_admin like  ?", `%${adminID}%`, function (error, results){
            if(error) throw error;
            
            return res.send({
                error: false,
                data: results[0],
                message: "Admin Information",
              });
    })
    }})

// Testing Select all Admin 
// method: get
// URL : http://localhost:8028/admin_info

/* select all*/
router.get('/admin_info', function (req,res){
    connection.query("select * from admin_info", function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results,
            message: "Admin All Information",
          });
    })
})

/* CRUD product info. */

// Testing Insert Product 
// method: post
// URL: http://localhost:8028/product_info
// body: raw JSON
//ตัวอย่างที่ 1
// {
//     "id_product": "P00007",
//     "name_product": "GALAX GEFORCE RTX 4070 EX GAMER PINK",
//     "pic_product": "https://drive.google.com/uc?export=view&id=1EbOpPKc9pOXhZI9vMVSSmK-E7zeBoh90",
//     "brand_product": "GALAX ",
//     "series_product": "RTX4070",
//     "manufacturer_product": "NVIDIA ",
//     "detail_product": "Warranty 3 Years Graphic Memory Type GDDR6X GPU Model GeForce RTX 4070",
//     "price_product": 23490
// }

//ตัวอย่างที่ 2
// {
//     "id_product": "P00008",
//     "name_product": "ZOTAC GAMING GEFORCE RTX 4060 OC",
//     "pic_product": "https://drive.google.com/uc?export=view&id=16Qc2TY_HuBBQODxxzIB1mrI9Uujz3-oM",
//     "brand_product": "ZOTAC  ",
//     "series_product": "RTX4060",
//     "manufacturer_product": "NVIDIA ",
//     "detail_product": "Warranty 3 Years Graphic Memory Type GDDR6X GPU Model GeForce RTX 4060",
//     "price_product": 11290
// }

/* INSERT ยังไม่ได้เทส*/ 
router.post('/product_info', function (req,res){
    let product_info = req.body;
    console.log(product_info)
    if (!product_info){
        return res.status(400).send({error: true, messege: " Please provide product infomation"});
    }
    connection.query("insert into product_sistem set ? ", product_info, function (error, results){
            if (error)
              return res.send({
                error: product_info,
                message: "The product incorrect.",
              });
        return res.send({
            error: false,
            data: results.affectedRows,
            message: "New product has been created successfully.",
          });
    })
})

// Testing update Product 
// method: put
// URL: http://localhost:8028/product_info
// body: raw JSON
//ตัวอย่างที่ 1
// {
//     "id_product": "P00008",
//     "detail_product": "Warranty3 YearsGraphic Memory TypeGDDR6GPU ModelGeForce RTX 4060GPU SeriesNVDIA Geforce Series"
// }

//ตัวอย่างที่ 2
// {
//     "id_product": "P00007",
//     "name_product": "GALAX GEFORCE RTX 4070 EX GAMER PINK - 12GB GDDR6X"
// }

/* Update */
router.put('/product_info', function (req,res){
    let productID = req.body.id_product;
    let product_info = req.body;
    if (!product_info || !productID){
        return res.status(400).send({error: true, messege: " Please provide product infomation"});
    }
    connection.query("update product_sistem set ? where id_product = ?", [product_info,productID], function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: "Product has been updated successfully.",
          });
    })
})

// Testing delete Product 
// method: delete
// URL: http://localhost:8028/product_info
// body: raw JSON
// ตัวอย่างที่ 1
// {
//     "id_product": "P00007"
// }

// ตัวอย่างที่ 2
// {
//     "id_product": "P00008"
// }

/* DELETE */
router.delete('/product_info', function (req,res){
    console.log("deleteee")
    let productID = req.body.id_product;

    if (!productID ){
        return res.status(400).send({error: true, messege: " Please provide ID product"});
    }
    connection.query("DELETE from product_sistem where id_product = ?", productID, function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            
            message: productID+" has been deleted successfully.",
        });
    })
})

// Testing Select a product 
// method: get
// URL : http://localhost:8028/product_info/P00001
// URL : http://localhost:8028/product_info/asus

router.get('/product_info/:id', function (req, res) {
    let productID = req.params.id;

    if (!productID) {
        return res.status(400).send({error: true, message: "Please provide ID product"});
    }
    const regex = new RegExp(productID, 'i');
    connection.query("SELECT * FROM product_sistem WHERE manufacturer_product LIKE ? OR brand_product LIKE ? OR id_product LIKE ? OR series_product LIKE ?",
     [`%${productID}%`, `%${productID}%`, `%${productID}%`, `%${productID}%`], function (error, results){
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).send({error: true, message: "Product not found"});
        } else {
            return res.send({
                error: false,
                data: results,
                message: "select all of product",
              });
        }
    });
});
// Testing Select product by 3 type  but 2 input
// method: get
// URL:  http://localhost:8028/product_info/amd/rx7600

// URL:   http://localhost:8028/product_info/nvidia/rtx4090

// select input1 and input3
router.get('/product_info/:input1/:input2', function (req, res) {
    let product_by_manufac = req.params.input1;
    let product_by_series = req.params.input2;
    console.log(product_by_manufac);
    console.log(product_by_series);
    if (!product_by_manufac || !product_by_series) {
        return res.status(400).send({ error: true, message: "Please provide both ID and Name" });
    }
    connection.query("SELECT * FROM product_sistem WHERE manufacturer_product LIKE ? AND series_product LIKE ?"
    , [`%${product_by_manufac}%`, `%${product_by_series}%`], function (error, results) {
        if (error) throw error;

        if (results.length === 0) {
            return res.status(404).send({ error: true, message: "Product not found" });
        } else {
            return res.send({
                error: false,
                data: results,
                message: "Select By Manufacturer and Series",
            });
        }
    });
});

// Testing Select product by 3 type but 2 input
// method: get
// URL:  http://localhost:8028/product_information/asus/rtx4090

// URL:   http://localhost:8028/product_information/msi/rtx4090

// select input1 and input2
router.get('/product_information/:input1/:input2', function (req, res) {
    let product_by_brand = req.params.input1;
    let product_by_series = req.params.input2;
    if (!product_by_series || !product_by_brand) {
        return res.status(400).send({ error: true, message: "Please provide both ID and Name" });
    }
    connection.query("SELECT * FROM product_sistem WHERE brand_product LIKE ? AND series_product LIKE ?",
     [`%${product_by_brand}%`, `%${product_by_series}%`], function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).send({ error: true, message: "Product not found" });
        } else {
            return res.send({
                error: false,
                data: results,
                message: "Select By Brand and Series",
            });
        }
    });
});

// Testing Select product by 3 type but 2 input
// method: get
// URL: http://localhost:8028/product_infos/nvidia/asus

// URL:  http://localhost:8028/product_infos/nvidia/msi

// select input1 and input2
router.get('/product_infos/:input1/:input2', function (req, res) {
    let product_by_manufac = req.params.input1;
    let product_by_brand = req.params.input2;
    console.log(product_by_manufac);
    console.log(product_by_brand);
    if (!product_by_manufac || !product_by_brand) {
        return res.status(400).send({ error: true, message: "Please provide both ID and Name" });
    }
    connection.query("SELECT * FROM product_sistem WHERE manufacturer_product LIKE ? AND brand_product LIKE ?",
     [`%${product_by_manufac}%`, `%${product_by_brand}%`], function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).send({ error: true, message: "Product not found" });
        } else {
            return res.send({
                error: false,
                data: results,
                message: "Select By Manufacturer and Brand",
            });
        }
    });
});


// Testing Select product by 3 type 
// method: get
// URL: http://localhost:8028/product_info/nvidia/asus/rtx4090

// URL: http://localhost:8028/product_info/amd/GIGABYTE/rx7900

router.get('/product_info/:input1/:input2/:input3', function (req, res) {
    let product_by_manufac = req.params.input1;
    let product_by_brand = req.params.input2;
    let product_by_series = req.params.input3;

    console.log(product_by_manufac);
    console.log(product_by_brand);
    console.log(product_by_series);

    if (!product_by_manufac || !product_by_brand|| !product_by_series){
        return res.status(400).send({ error: true, message: "Please provide both ID and Name" });
    }
    connection.query("SELECT * FROM product_sistem WHERE manufacturer_product LIKE ? AND brand_product LIKE ? AND series_product LIKE ?", 
    [`%${product_by_manufac}%`, `%${product_by_brand}%`,  `%${product_by_series}%`], function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).send({ error: true, message: "Product not found" });
        } else {
            return res.send({
                error: false,
                data: results,
                message: "Select By Manufacturer and Brand and Series ",
            });
        }
    });
});
// Testing Select all product 
// method: get
// URL: http://localhost:8028/product_info

/* select all*/
router.get('/product_info', function (req,res){
    connection.query("select * from product_sistem", function (error, results){
        if(error) throw error;
        return res.send({
            error: false,
            data: results,
            message: "select all of product",
          });
    })
})


/* log in  */
// Testing Select all product 
// method: get
// URL: http://localhost:8028/login_info

 router.get('/login_info', function (req,res){
     connection.query("select * from login_sistem", function (error, results){
        if(error) throw error;
         return res.json(results);
   })
 })

// Testing check User 
// method: post
// URL: http://localhost:8028/login_info
// body: raw JSON
// ตัวอย่างที่ 1
// { 
//     "login_sistem":{
//       "username_sistem": "pinky",
//       "password_sistem": "12345"
//   }
// }
// ตัวอย่างที่ 2
// { 
//     "login_sistem":{
//       "username_sistem": "A000003",
//       "password_sistem": "supich1234"
//   }
// }

router.post('/login_info', function (req,res){
    let login_info = req.body;
    let username_sistem = login_info.login_sistem.username_sistem;
    let password_sistem = login_info.login_sistem.password_sistem;
    console.log(password_sistem)

    if ( !login_info ||!username_sistem || !password_sistem) {
        return res.status(400).send({ error: true, message: "Please provide information for login" });
    }
    connection.query("select * from login_sistem where username_sistem= ? ",username_sistem , function (error, results){
        if(error) throw error;
        if (results.length > 0){
            const retrievedPassword = results[0].password_sistem;
            console.log("Retrieved Password:", retrievedPassword);
            if(password_sistem === retrievedPassword ){
            var jwtToken = jwt.sign(
                {
                    username_sistem:username_sistem ,
                },
                process.env.SECRET,
                {
                    expiresIn: "1h",
                }
            )
            console.log(login_info)
            console.log(jwtToken);
            console.log(password_sistem)
            try{      
                var decoded = jwt.verify(jwtToken,process.env.SECRET,)      
                console.log(jwtToken,decoded)
            }catch(err){
                console.log({status: 'Fail', message: err.message})
            }
        }  console.log(jwtToken)
            return res.send({
            error: false,
            user: username_sistem,
            data: retrievedPassword,
            token: jwtToken,
            decoded: decoded,
            message: "Log in Success",
        });
    }else {
        return res.status(400).send({ error: true, message: "Invalid username_sistem" });
    }
         
    })
})

// Testing check token 
// method: delete
// URL: http://localhost:8028/product_info
// Authorization: Bearer Token 
// ตัวอย่างที่ 1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZV9zaXN0ZW0iOiJwaW5reSIsImlhdCI6MTcwMDQ4NzU4NywiZXhwIjoxNzAwNDkxMTg3fQ.8QThBwtv0Mr0nI4qC8T2leDJkU45xrq7Lv1LuXHdTpI
// ตัวอย่างที่ 2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZV9zaXN0ZW0iOiJBMDAwMDAzIiwiaWF0IjoxNzAwNDg3NDczLCJleHAiOjE3MDA0OTEwNzN9.G8t4XhfN5o_vnZBTSMoKdzIkhFfumlC_K7uQqKGoaNU

router.post('/login_auth', function (req,res){
    console.log("print token")
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token,process.env.SECRET,)
        res.json({status: 'Pass', decoded})
        
    }catch(err){
        res.json({status: 'Fail', message: err.message})
    }

})


app.listen(process.env.PORT, function () {
    console.log("Server listening at Port "
    + process.env.PORT);});

