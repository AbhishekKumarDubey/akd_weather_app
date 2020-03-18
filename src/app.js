const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Configure path for express application
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Configure view template engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Default or home page router
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Abhishek Kumar Dubey',
        role: 'Developer'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhishek Kumar Dubey',
        role: 'Developer'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhishek Kumar Dubey',
        role: 'Developer',
        helpDescription: 'This page is being developed as basic expressJS app'
    });
});

app.get('/posts', (req, res) => {
    console.log(JSON.stringify(req.query));
    if (!req.query.id) {
        return res.send({ error: 'You must provide id to search' })
    }

    request({
        url: 'https://jsonplaceholder.typicode.com/posts/' + req.query.id + '/comments',
        json: true,
        insecure: true,
        rejectUnauthorized: false
    }, (error, response, body) => {
        if (error) {
            return res.send({ error })
        }
        res.send({ data: body[0].body })
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});