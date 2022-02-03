const http = require('http')
const fs = require('fs')
const _ = require('lodash')


const server = http.createServer((req, res)=>{
    const num = _.random(1, 20)
    // console.log(num)
    const greet = _.once(()=>{
        console.log('Hello World')
    })
    greet()

    res.setHeader('Content-Type' , 'text/html')
    let path = './views/'
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 404
    }
    // send html file to the client.
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err)
            res.end()
        }else{
            
            res.end(data)
        }
    })

   
})

server.listen(3000, 'localhost', ()=> {
    console.log('Listening for port 3000')
})