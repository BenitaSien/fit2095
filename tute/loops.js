/*var ar = [10, 20, 30];
ar.push(40, 50);
console.log(ar);

for(let i=0; i<ar.length;i++)
console.log(ar[i]);*/

var someNums = [];

function getRandNum() {
    return Math.round(Math.random()*100);
}

for(let j=0;j<10;j++) {
    var randN = getRandNum();
    someNums.push(randN)
}

console.log(someNums);

/*
//someNums.splice(1,1)

for(let i=0; i<someNums.length;i++) {
    if (someNums[i] % 2 == 1) {
        
        someNums.splice(i, 1)
        i--;
    }
}
console.log(someNums);
*/

let currentMax = someNums[0];
for(let i=0; i<someNums.length;i++) {
    if (someNums[i] > currentMax) {
        currentMax = someNums[i];
    }
}
console.log('Max value: ', currentMax);

