import http from 'node:http';
import fs from 'node:fs/promises';

const server = http.createServer((req, res)=> {
    try{
        if(req.url === "/"){
        readData('./src/index.html').then((data)=>{
            res.writeHead(200, {"content-type": 'text/html'});
            res.end(data);
        })
        }
        else if(req.url === "/about"){
            readData('./src/about.html').then((data)=>{
                res.writeHead(200, {"content-type": 'text/html'});
                res.end(data);
            })
        }
        else if(req.url === '/contact'){
            readData('./src/contact-me.html').then((data)=>{
                res.writeHead(200, {"content-type": 'text/html'});
                res.end(data);
            })
        }
        else{
            readData('./src/404.html').then((data)=>{
                res.writeHead(404, {"content-type": 'text/html'});
                res.end(data);
            })
        }
    }
    catch{
        res.writeHead(500, {'content-type':'text/plain'});
        res.end('Error 500 - Internal Server Error');
    }
})

async function readData(path){
    try{
        const data = await fs.readFile(path, {encoding: 'utf8'});
        return data;
    }
    catch(err){
        console.error(err);
    }
}

server.listen(8000);