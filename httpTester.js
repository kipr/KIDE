function sendData(cmd){
    console.log("Sending message");
    const http = require('http');

    const data = JSON.stringify({
        command: cmd
    });

    const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/todos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
    },
    };

    const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

sendData("echo testing");
sendData("echo randomText >> text.txt");
sendData("ping google.com -c 10")