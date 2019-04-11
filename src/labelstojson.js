var lineReader = require('line-reader')

const fs = require('fs')

var labels = []

lineReader.eachLine('imagenet.labels.list', function(line, last) {
  labels.push({ value: line })

  if (last) {
    var i = 0
    lineReader.eachLine('imagenet.shortnames.list', function(line, last) {
      labels[i].label = line
      i++

      if (last) {
        write()
        return false
      }
    })
  }
})

function write() {
  var jsonContent = JSON.stringify(labels)

  console.log(jsonContent)

  fs.writeFile('output.json', jsonContent, 'utf8', function(err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.')
  })
}
