
var getPixels = require("get-pixels")

getPixels("puzzle.png", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }
  var counter = 1
  output = ''
  // pixels.data includes Uint8Array which has rgb value for every pixel.
  pixels.data.forEach(function (color) {
    // ignoring the 4th element of the Uint8Array
    if (counter % 4 != 0) {
      // convert color int to ASCII. Concat it to output.
      output += String.fromCharCode(color)
    }
    counter += 1
  })
  console.log(output)
  return output
})
