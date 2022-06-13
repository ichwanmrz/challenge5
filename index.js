const express = require('express');
const router = express.Router();
const {param,default: req} = require('express/lib/request');
const {contentType,default: res,send} = require('express/lib/response');
const ejsLint = require('ejs-lint');
const app = express()
const port = 3300;
const data = require("./static/data-post.json");
const bodyParser = require('body-parser');
const {json} = require('body-parser');
const users = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static('website'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs');
});

app.get('/trial', (req, res) => {
    res.render(__dirname + '/trial.ejs');
});

app.get('/login', (req, res) => {
    res.render(__dirname + '/login.ejs');
});

app.get("/view", (req, res) => {
    let {email, password} = req.body;
    res.render(__dirname + '/view.ejs', {users, totalUsers : users.length});
});

app.get("/edit", (req, res) => {
    res.render(__dirname + '/edit.ejs');
});

app.get("/api/v1/post", (req, res) => {
    const {id} = req.params;
    const post = data.user.find((u) => u.id === +id);
    return res.status(200).json({
        data: data
    });
});

app.get("/api/v1/post/:id", (req, res) => {
    const {id} = req.query;
    const post = data.user.find((u) => u.id === +id);
    return res.status(200).json({
    data: data
    });
});

app.post('/login', (req, res) => {
    const user = require("./static/data-post.json");
    let {email, password} = req.body;
    let newuser = {email, password}

    if (email === data.user[0].email) {
        if (password != data.user[0].password) {
            res.status(401).json({
                status: "Wrong Password"
            })
        }
        users.push(newuser)
        res.redirect('/view')
    } else if (email === data.user[1].email) {
        if (password != data.user[1].password) {
            res.status(401).json({
                status: "Wrong Password"
            })
        }
        users.push(newuser)
        res.redirect('/view')
    } else if (email === data.user[2].email) {
        if (password != data.user[2].password) {
            res.status(401).json({
                status: "Wrong Password"
            })
        }
        users.push(newuser) 
        res.redirect('/view')
    } else {
        res.status(401).json({
            status: "User not found"
        })
    }
    return res.redirect('/login')
});

// Form edit ini masih percobaan, belum selesai disusun.
app.post('/edit', (req, res) => {
    return res.redirect('/view')
});

app.get("*", (req, res) => {
    res.status(404).json({
        status: "404 Page Not Founds",
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
