const express = require('express');
const nunjucks = require('nunjucks');
// const request = require('request');
const posts = require("./data");

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server, 
    autoescape: false,
    noCache: true
});

server.get('/', function(req, res) {
   
    return res.render('list', { items: posts });
});

server.get('/show', function(req, res) {
    const id = req.query.id;

    const post = posts.find(function(post) {
        if (post.id == id) {
            return true
        }
    });

    if (!post) {
        return res.send("Post not found!")
    }

    return res.render('show', { post });
});

server.listen(3000, function() {
    console.log("server is running");
});