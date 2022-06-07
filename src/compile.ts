import { exec } from "child_process";

export default (code: string): Promise<CompileResult> => {

  return new Promise<CompileResult>((resolve, reject) => {
    //Get a child process to execute shell commands on
    var exec = require('child_process').exec;

    //Execute shell
    exec('echo test', (err, stdout, stderr) => {
        resolve(JSON.parse('{"stdout":"' + stdout + '", "stderr":"' + stderr + '"}') as CompileResult);
        console.log('stderr: ' + stderr);
        if (err !== null) {
             reject(err);
        }
    });
    

    /*
    const req = new XMLHttpRequest();
    req.onload = () => {
      if (req.status !== 200) {
        reject(JSON.parse(req.responseText));
        return;
      }
      resolve(JSON.parse(req.responseText) as CompileResult);
    };

    req.onerror = (err) => {
      reject(err);
    };

    req.open('POST', '/compile');

    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify({
      code
    }));
    */
  });
  
};

export interface CompileResult {
  result?: string;
  stdout: string;
  stderr: string;
}