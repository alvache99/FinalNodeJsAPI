let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let  fs = require('fs');
const PORT = 3001;

let pool = new pg.Pool({
    port:11279,
    password:'oazb2ykx4s5w3rc6',
    database: 'defaultdb',
    user:'avnadmin',
    host:'pg-3e9c1636-alvachelawtiawei-d3d1.aivencloud.com',
    ssl: { ca: fs.readFileSync('ca.pem') }
});



let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/api/new-product', function(request,response){

    var coffee = request.body.Coffee;
    var day = request.body.Day;
    var cakes = request.body.Cakes;
    var pies = request.body.Pies;
    var cookies = request.body.Cookies;
    var smoothies = request.body.Smoothies;

    
    pool.connect((err,db,done) =>{
        if(err){
            console.log('connectionfailed');
            console.log(err);
        }else{
            console.log('connection completed');
        
            db.query('INSERT into test_cafe (weekday, cakes, pies, cookies, smoothies, coffee) VALUES ($1, $2, $3, $4, $5, $6)',[day,cakes,pies,cookies,smoothies,coffee],(err,table) => {
                if(err){
                    return console.log(err);
                }else{
                    console.log('success');
                    db.end();
                    response.status(201).send('Data Inserted!');
                }
            })
        }
        
        
        })

})

  app.listen(PORT,()=>console.log('listening on PORT' + PORT));

