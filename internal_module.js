const os = require('os'); //- CommonJS Module syntax
// import os from 'os'; // - ES6/ES/ESM Module syntax

const platform = os.platform();
const arch = os.arch();
const cpu_info = os.cpus();

console.log(cpu_info);