// async function main() {
//   let { stdout } = await sh('./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights "Bernese mountain dog" [12,234,24,100]');
//   for (let line of stdout.split('\n')) {
//     parseFloat(line);
//     console.log(line);
//   }
// }

// main();

const { exec } = require('child_process');
exec('./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights n02107683 12,234,24,100', (err, stdout, stderr) => {
  if (err) {
    console.log('err: ' + err);
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`${stdout}`);
  //console.log(`stderr: ${stderr}`);
});