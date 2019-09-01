const fs = require('fs')

// put your directory here, where the files are
const Yourdirectory = 'C:\\Users\\james\\Desktop\\javascript'

try{
  const priceList = fs.readFileSync(`${Yourdirectory}\\AverageEthereumPrices\\infoList.txt`, 'utf-8').split('\n') 

  let daysToAverage = 7
  let lineCounter = 1
  let sums = {
    open: 0,
    close: 0
  }
  let averagesString = ''
  for (price of priceList) {
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
  
  function calculateAverage(sum){
    let averages = {
      open: sum.open/daysToAverage,
      close: sum.close/daysToAverage
    }
  
    sum.open = 0
    sum.close = 0
  
    return averages
  }
}catch(err){
  console.log(err)
}
