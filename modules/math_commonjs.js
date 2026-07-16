
function add(num1, num2){
    return num1+num2;
}

function multiply(num1, num2){
    return num1*num2;
}

// CommonJS 

//  export default - direct
// module.exports = add;

// multiple - object
// module.exports = {add, multiply};

module.exports = add;
module.exports = multiply;
