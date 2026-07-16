// const http = require('http');
import http from 'http';

const PORT = 3000;

const users = [
    {
        "id": 1,
        "name": "Dhiraj",
        "email": "dhiraj@gmail.com",
        "city": "Lucknow"
    },
    {
        "id": 2,
        "name": "Kushnaseeb",
        "email": "kushnaseeb@gmail.com",
        "city": "Lucknow"
    },
    {
        "id": 3,
        "name": "Anchal",
        "email": "anchal@gmail.com",
        "city": "Noida"
    }
];

http.createServer((req, res)=>{
    const url = new URL('http://'+req.headers.host+req.url);
    
    const id = url.searchParams.get('id');
    
    
    if(id){
        
        const user = users.find(user=>user.id === Number(id));

        if(user){
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify(user))
        }
        else{
            res.setHeader('Content-Type', 'text/plain');
            res.writeHead(400);
            res.write("User not found!")
        }
    }else{
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.write(JSON.stringify(users))
    }
    res.end();

}).listen(PORT);
