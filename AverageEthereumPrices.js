const fs = require('fs')
// put your directory here, where the files are 
const Yourdirectory = 'C:\\Users\\james\\Desktop\\javascript'

let daysToAverage = 7
let lineCounter = 1
let sums = {
open: 0,
close: 0
}
let averagesString = ''

function readTheFile(){
  try{
    return fs.readFileSync(`${Yourdirectory}\\AverageEthereumPrices\\aaaa.txt`, 'utf-8').split('\n') 
  }catch(err){
    console.log(' Error to found the path \n Your directory maybe is wrong')
  }
}

if(readTheFile()){
  for (price of readTheFile()) {
    let [data, open, high, low, close, volume, marketCap] = price.replace(/,/g, '.').replace('.', ',').split('\t')
  
    sums.open += parseFloat(open)
    sums.close += parseFloat(close)
  
    if (lineCounter % daysToAverage === 0) {
    const averages = calculateAverage(sums)
    averagesString += `${averages.open}\t${averages.close}\n` 
    }
    lineCounter++
  }
  try{
    fs.writeFileSync(`${Yourdirectory}\\AverageEthereumPrices\\Averages.txt`, averagesString, {encoding: 'utf-8', flag: 'w+'})
  }catch(err){
    console.log(err)
  }
}

function calculateAverage(sum){
  let averages = {
  open: sum.open/daysToAverage,
  close: sum.close/daysToAverage
  }

  sum.open = 0
  sum.close = 0

  return averages
}
