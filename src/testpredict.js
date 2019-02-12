async function main() {
  let { stdout } = await sh('./../../darknet/darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights data/dog.jpg "Bernese mountain dog"');
  for (let line of stdout.split('\n')) {
    parseFloat(line);
    console.log(line);
  }
}

main();