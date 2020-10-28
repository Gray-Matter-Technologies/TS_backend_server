const melbourneData = require('./melbourne.json')

const fs = require('fs');
let obj = []
const coordinateArray = []
melbourneData.features.map(data =>{

  obj.push({name:data.properties.name, coordinates:data.geometry.coordinates[0][0][0]})
})


//console.log(obj)
let final = {
  name: obj
}
console.log(final)

let data = JSON.stringify(final);
fs.writeFileSync('melb.json', data);