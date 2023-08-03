function modularCalculator(op, num1, num2, mod) {
    let result;
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        default:
            throw new Error('Invalid operation');
    }
    result = result % mod;
    if (result < 0) {
        result += mod; // If the result is negative, add `mod` to make it positive
    }
    return result;
}

module.exports = { modularCalculator };