const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");

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
        })
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});