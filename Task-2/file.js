const http = require('http');
const fs = require('fs');
const path = require('path');

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts',
    method: 'GET',
}

let data;

const req = http.request( options, res => {
        
        res.on('data', returnedData => {
            
            data = returnedData;
            // check if the folder 'result' exist if not create, otherwise add to the 'post.json' file
            if (!fs.existsSync('result')) {

                fs.mkdirSync('result')

                return fs.writeFile(path.join(`${__dirname}/result`,'posts.json'), data, { flag: 'a' },err => {
                    if (err) {
                        return err
                    }
                })
            
            } 

            fs.writeFile(path.join(`${__dirname}/result`,'posts.json'), data, { flag: 'a' }, err => {
                if (err) {
                    return err
                }
            })

        });

        req.on('error', error => {
            return error
        });
});
req.end();
