/*
const http = require("http");
const url = require("url");
const server = new http.Server();
server.listen(4848,"localhost");

server.on("request",function(req,res){
    var uP=url.parse(req.url,true);
    console.log(req.method+" "+req.url);
    console.log(uP);
    if(uP.pathname== "/echo" && uP.query.message){
        res.write(uP.query.tt+"\n");
        res.end(uP.query.message);
    }else{
        res.status=404;
        res.end("page not found");
    };
});
*/
const express= require("express");
const app = express();
const { Client } =require("pg");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db= new Client({
    user: 'postgres',
    host:'localhost',
    database: 'postgres',
    password: 'admin',
    port: '5432',
});
db.connect();


let gamers=0;
let clients = []


app.use(express.static('public'))


io.on('connection', (socket) => {
    if(gamers<2){
    gamers++;
    socket.emit("gamers", gamers);

    }
    //socket.emit("gamers", gamers);

    //console.log('New user connected');
    socket.on("shootCl",(id)=>{
        socket.broadcast.emit("shootSer",id);
    })
    socket.on("responseShoot",(shoot)=>{
        socket.broadcast.emit("respSer",shoot)
    })
});

db.query('SELECT * FROM leader',(err,data)=>{
    if(err){
        throw new Error(err);
    }
    console.log(data,err);
    db.end;
})

app.get('/',function(req,res){
    res.render("index");
});
app.get('/leader',function(req,res){
    db.query('SELECT * FROM leader',(err,data)=>{
        if(err){
            console.log(err); 
            return;
        }
        res.end(JSON.stringify(data.rows));
        db.end;
    });
    
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded(
        { extended: true } ));
app.use(bodyParser.json());
app.put('./index.html',(res,req)=>{
    db.query("INSERT INTO leader (id, name, win_counts) VALUES (?,?,?)")
})
http.listen(3000, () =>
  console.log(`Server listens http://localhost:3000`)
)