const rp = require("request-promise");
const combineImage = require("combine-image");
const argv = require("minimist")(process.argv.slice(2));

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

Promise.all([getImage(greeting), getImage(who)])
  .then(([img1, img2]) => {
    combineImages(img1, img2, `${greeting}-${who}.jpg`);
  })
  .catch((e) => console.log("Failed to fetch images : ", e));

function getImage(greeting) {
  let options = {
    url: `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
    encoding: "binary",
  };
  return rp(options);
}

function combineImages(img1, img2, imgName) {
  combineImage([Buffer.from(img1, "binary"), Buffer.from(img2, "binary")])
    .then((img) => {
      img.write(imgName, () => console.log("Successfully combined 2 images"));
    })
    .catch((e) => {
      console.log("Failed to combine images : ", e);
    });
}
