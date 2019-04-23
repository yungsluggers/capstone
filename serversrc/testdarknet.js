const {
  streamWrite,
  streamEnd,
  onExit,
  chunksToLinesAsync,
  chomp
} = require('@rauschma/stringio')

var queue = require('express-queue')

// async function main() {
//   let { stdout } = await sh('./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights "Bernese mountain dog" [12,234,24,100]');
//   for (let line of stdout.split('\n')) {
//     parseFloat(line);
//     console.log(line);
//   }
// }

// main();

const { exec, spawn } = require('child_process')
var pty = require('node-pty')

var ptyProcess = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: '.',
  env: process.env
})

ptyProcess.on('data', function(data) {
  process.stdout.write(data)
  if (data.indexOf('Enter Image Path:') > -1) ptyProcess.write('./sampledata\r')
  if (data.indexOf('Enter id:') > -1) ptyProcess.write('n07753113\r')
})

ptyProcess.write(
  './darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights 1\r'
)

// const darknet = spawn(
//   './darknet',
//   [
//     `classifier`,
//     `one_label`,
//     `cfg/imagenet1k.data`,
//     `cfg/darknet19.cfg`,
//     `darknet19.weights`,
//     150
//   ],
//   { stdio: 'inherit' }
// )

// darknet.on('data', data => {
//   console.log(data.toString())
// })

// setTimeout(() => {
//   console.log('blah')
//   darknet.write('blah \n')
// }, 3000)

// const darknet = spawn(
//   './darknet',
//   [
//     `classifier`,
//     `one_label`,
//     `cfg/imagenet1k.data`,
//     `cfg/darknet19.cfg`,
//     `darknet19.weights`,
//     150
//   ],
//   { stdio: ['pipe', process.stdout, process.stderr] }
// ) // (A)

// async function main() {
//   setTimeout(() => {
//     writeToWritable(darknet.stdin)
//   }, 3000)
//   setTimeout(() => console.log('done'), 6000)
// }
// main()

// async function writeToWritable(writable) {
//   console.log('write')
//   await streamWrite(writable, 'First line\n')
//   // /await streamEnd(writable)
// }

// async function echoReadable(readable) {
//   for await (const line of chunksToLinesAsync(readable)) {
//     // (C)
//     console.log(chomp(line))
//   }
// }
