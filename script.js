const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

var connection = mysql.createConnection({
    // properties.....
    connectionLimit:50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'address_management_db'

});


connection.connect(function(err){
    if(!!err){
        console.log("Error with connecting database");
    }else{
        console.log("Connect database successful");
    }
});

// Avoid 404 when re-load page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/hello', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/counter', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/create-address', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/edit-address/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});


// REST: API
app.get('/api/getAddress/:id', function(req, res, next){
    console.log(req.params.id);

    connection.query('SELECT * FROM address where id = '+req.params.id, function(error, rows){
        if(!!error){
            next("Mysql error, check your query");
        }else{
            res.json(rows[0]);
        }
    });

});

app.get('/api/addresses', function(req, res, next){
    connection.query("SELECT * FROM address", function(error, rows, feilds){
        if(!!error){
            next("Mysql error, check your query");
        }else{
            res.json(rows)
        }
    });
});


app.post('/api/address',function(req,res,next){

    var post  = { };
    if(req.body.method_type === 'TEXT_INPUTS'){
        post = {
            street_number: req.body.street_number_input,
            route: req.body.route_input,
            ward_or_willage: req.body.ward_or_willage,
            district_or_town: req.body.district_or_town,
            city_or_province: req.body.city_or_province,
            country: req.body.country,
            method_type: req.body.method_type
        };

    }else if(req.body.method_type === 'GOOGLE_MAP_OBJECT'){
        post = {
            street_number: req.body.street_number,
            route: req.body.route,
            ward_or_willage: req.body.sublocality_level_1,
            district_or_town: req.body.administrative_area_level_2,
            city_or_province: req.body.administrative_area_level_1,
            country: req.body.country,
            method_type: req.body.method_type
        };
    }

    connection.query('INSERT INTO address SET ?', post, function(err,result){
        if(!!err) {
            console.log(err);
            return next("Mysql error, check your query");
        }
        
        res.json(result);
    });


});


app.put('/api/edit-address',function(req,res,next){

    var put  = {
        id: req.body.id,
        street_number: req.body.street_number_input,
        route: req.body.route_input,
        ward_or_willage: req.body.ward_or_willage,
        district_or_town: req.body.district_or_town,
        city_or_province: req.body.city_or_province,
        country: req.body.country,
        method_type: req.body.method_type
    };

    if(req.body.method_type === 'GOOGLE_MAP_OBJECT'){
        put = {
            id: req.body.id,
            street_number: req.body.street_number,
            route: req.body.route,
            ward_or_willage: req.body.sublocality_level_1,
            district_or_town: req.body.administrative_area_level_2,
            city_or_province: req.body.administrative_area_level_1,
            country: req.body.country,
            method_type: req.body.method_type
        };
    }

    connection.query('UPDATE address SET street_number = ?, route = ?, ward_or_willage = ?, district_or_town = ?, city_or_province = ?, country = ? WHERE id = ?', [put.street_number,put.route, put.ward_or_willage, put.district_or_town, put.city_or_province, put.country, put.id], function (error, result) {
        if(!!error) {
            console.log(error);
            return next("Mysql error, check your query");
        }
        res.json(result);
    });

});



app.listen(1337, (err) => {
    if (err) {
        return console.error(err); // eslint-disable-line no-console
    }
    console.log('Listening at http://localhost:1337');// eslint-disable-line no-console
});
