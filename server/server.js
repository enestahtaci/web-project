const express = require('express');
const mysql = require('mysql');

const app = express();


//create connections
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"nodemysql"
})

//connect to database
db.connect((err)=>{
    if(err) {
        throw err;
    }
    console.log("Connection done");
});

//create db
app.get("/createdb", (req,res)=>{
    let sql="CREATE DATABASE nodemysql";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("result");
        res.send("Database Created");
    });
});

//create table
app.get("/createposttable",(req,res)=>{
    let sql="CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("result");
        res.send("Post Table Created");
    })
})

//insert post 1
app.get("/addpost1",(req,res)=>{
    let post={title:"post1",body:"this is body 1"};
    let sql="INSERT INTO posts SET ?"
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log("result");
        res.send("Post 1 added");
    });
});

//insert post 2
app.get("/addpost2",(req,res)=>{
    let post={title:"post two",body:"this is body 2"};
    let sql="INSERT INTO posts SET ?"
    let query=db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log("result");
        res.send("Post 2 added");
    });
});

//select posts
app.get("/getposts",(req,res)=>{
    let sql="SELECT * FROM posts";
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post fetched");
    });
});

//select single post
app.get("/getpost/:id",(req,res)=>{
    let sql=`SELECT * FROM posts WHERE id= ${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("single post fetched");
    });
});

//update post
app.get("/updatepost/:id",(req,res)=>{
    let newTitle="update title";
    let sql=`UPDATE posts SET title= '${newTitle}' WHERE id=${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("post updated");
    });
});

//delete post 
app.get("/deletepost/:id",(req,res)=>{
    let sql=`DELETE FROM posts WHERE id=${req.params.id}`;
    let query=db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post deleted");
    });
});

app.listen("3000", () => {
    console.log("Server is successfully running on port 3000");
});