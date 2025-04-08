const checkLength = (string, maxSymbols) => string.length <= maxSymbols;

// сonsole.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));

const isPalindrom = (string) => {
    string = string.replaceAll(' ', '').toLowerCase();
    let reversed = '';
    for (let i = string.length - 1; i >= 0; i--) {
        reversed += string[i];
    }
    return string === reversed;
};


// console.log(isPalindrom('топот'));
// console.log(isPalindrom('ДовОд'));
// console.log(isPalindrom('Кекс'));

const getNumber = (text) => {
let result = '';
for(let j=0; j<text.length; j++){
    const attempt = parseInt(text[j], 10);
    if(!isNaN(attempt)){
        result = result + text[j]
    }
}
    return parseInt(result, 10);
};

console.log(getNumber('2023 год'))
console.log(getNumber('ECMAScript 2022'))
console.log(getNumber('1 кефир, 0.5 батона'))
console.log(getNumber('агент 007'))
console.log(getNumber('а я томат'))
