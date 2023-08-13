module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = [];
  const closeBrackets = [];
  const elseBrackets = [];

  for (let i = 0; i < bracketsConfig.length; i++) {
    const [openBracket, closeBracket] = bracketsConfig[i];
    if (openBracket === closeBracket) {
      elseBrackets.push(openBracket);
    } else {
      openBrackets.push(openBracket);
      closeBrackets.push(closeBracket);
    }
  }

  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];

    if (elseBrackets.includes(curChar)) {
      if (stack.length > 0 && stack[stack.length - 1] === curChar) {
        stack.pop();
      } else stack.push(curChar);
      
    } else if (openBrackets.includes(curChar)) {
      stack.push(curChar);
    } else if (closeBrackets.includes(curChar)) {
      const corspondOpenBracket =
        openBrackets[closeBrackets.indexOf(curChar)];

      if (stack.length === 0 || stack.pop() !== corspondOpenBracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// // Примеры проверки
// const config1 = [['(', ')']];
// const config2 = [['(', ')'], ['[', ']']];
// const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
// const config4 = [['|', '|']];
// const config5 = [['(', ')'], ['|', '|']];
// const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
// const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];

// console.log(check('()', config1)); // true
// console.log(check('((()))()', config1)); // true
// console.log(check('())(', config1)); // false
// console.log(check('([{}])', config3)); // true
// console.log(check('[(])', config2)); // false
// console.log(check('[]()', config2)); // true
// console.log(check('[]()(', config2));// false
// console.log(check('||', config4)); // true
// console.log(check('|()|', config5)); // true
// console.log(check('|(|)', config5)); // false
// console.log(check('|()|(||)||', config5)); // true
// console.log(check('111115611111111222288888822225577877778775555666677777777776622222', config6)); // true
// console.log(check('5555512575557777777555566667888888667661133833448441111222233333444442266666', config6)); // false
// console.log(check('8888877878887777777888888887777777887887788788887887777777788888888887788888', config6)); // false
// console.log(check('111115611111111156111111112222888888222255778777787755556666777777777766222221111222288888822225577877778775555666677777777776622222', config6)); // true
// console.log(check('[]][[]', config3)); // false
// console.log(check('[]][[]', config2)); // false
// console.log(check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]]))()', config7)); // false
// console.log(check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])(())', config7)); // true
// console.log(check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])((([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])))', config7)); // true