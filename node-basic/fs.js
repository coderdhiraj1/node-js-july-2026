import fs from 'fs';


// console.log('step 1')

// // read a file
// const text = fs.readFileSync('sample.txt', 'utf-8'); // step 2
// console.log(text);

// console.log('step 3');

console.log('step 1');

// async read a file
fs.readFile('sample.txt', 'utf-8', (err, data) => {
    console.log(data); // step 2
});

console.log('step 3');

