const { fstat } = require('fs');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if(request.url === '/write') {
        fs.writeFile('data.txt', 'Hadas', (err) => {
            if(err) {
                console.log(err);
                response.end();
                return;
            }
            response.write('File created!');
            response.end();
        });
    } else if(request.url === '/delete') {
        fs.unlink('data.txt', (err) => {
            if(err) {
                console.log(err);
                response.end();
                return;
            }
            response.write('File deleted!');
            response.end();
        });
    } else if(request.url === '/dice') {
        const random = Math.floor(Math.random() * 6 + 1);
        response.write(`${random}`);
        if(random === 4) {
            response.write('\nYou won!');
            response.end();
            return;
        } else {
            response.write('\nYou lost..');
            response.end();
        }
    } else {
        response.writeHead(404);
        response.write('Unauthorized');
        response.end();
    }


}).listen(8080);

console.log('Listening on: http://localhost8080');