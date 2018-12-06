// var myNumber = 1
// function addOne() { myNumber++ } // define the function
// addOne() // run the function
// console.log(myNumber) // logs out 2
//
//
// var fs = require('fs') // require is a special function provided by node
// var myNumber = undefined; // we don't know what the number is yet since it is stored in a file
//
// fs.readFile('./number.txt', function(err, fileContents) {
//   myNumber = parseInt(fileContents)
//   myNumber++
// })
//
// console.log(myNumber) // logs out undefined -- this line gets run before readFile is done
//
//
// fs.readFile('./number.txt', function(err, fileContents) {
//   myNumber = parseInt(fileContents)
//   myNumber++
//   console.log(myNumber)
// })
//
//

var add = (a, b) => {
  return a+b;
};

var mult = (a, b) => {
  setTimeout(() => {
    return a*b;
  },2000);
};

var calc = (a, b, callback) => {
  return callback(a, b);
};

var answer = calc(2, 8, mult);


console.log('answer', answer);




var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5, 7).then((res) => {
  console.log('Result: ', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 45', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
