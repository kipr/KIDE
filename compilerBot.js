const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Compile Bot Activated");

    if (req.method == 'POST') {
        console.log('POST');
        var body = '';

        req.on('data', function(data) {
          body += data;
          console.log('Partial body: ' + body);
        })

        req.on('end', function() {
            console.log('Body: ' + body);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('post received');
                
            //Get a child process to execute shell commands on
            var exec = require('child_process').exec;

            //Execute shell
            exec(
                JSON.parse(body).command, 
                
                (err, stdout, stderr) => {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (err !== null) {
                    console.log('err: ' + err);
                }
            });
        })


    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});