/******************************************************************
*                           CALLBACKS                             *
*******************************************************************/

function doubleAfter2Seconds(x, callback) {
  setTimeout(() => {
    return callback(x*2);
  }, 2000)
}

function add(x, callback) {
  doubleAfter2Seconds(x, function(a) {
    doubleAfter2Seconds(a, function(b) {
      doubleAfter2Seconds(b, function(c) {
        return callback(x + a + b + c);
      });
    });
  });
}

add(10, function(sum) {
  console.log(sum);
})

/******************************************************************
*                           Promises                              *
*******************************************************************/


function doubleAfter2Seconds(x) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(x*2);
    }, 2000)
  });
}

function add(x) {
  return new Promise(function (resolve, reject) {
    doubleAfter2Seconds(x).then(function(a) {
      doubleAfter2Seconds(a).then(function(b) {
        doubleAfter2Seconds(b).then(function(c) {
          resolve(x+a+b+c)
        })
      })
    })
  });
}

add(10).then(function(sum) {
  console.log(sum);
})

/******************************************************************
*                           Async/Await                           *
*******************************************************************/

function doubleAfter2Seconds(x) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(x*2);
    }, 2000)
  });
}

async function add(x) {
  const a = await doubleAfter2Seconds(x);
  const b = await doubleAfter2Seconds(a);
  const c = await doubleAfter2Seconds(b);
  return x+a+b+c;
}

add(10).then(function(sum) {
  console.log(sum);
})
