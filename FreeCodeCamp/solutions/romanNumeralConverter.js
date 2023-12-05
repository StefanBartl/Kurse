function convertToRoman(num) {
    // lib
    const romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  
    let result = '';
  
    // get 'floored' value from lib
    for (let i of Object.keys(romanNumerals)) {
      let j = Math.floor(num / romanNumerals[i]);
      // reduce num
      num -= j * romanNumerals[i];
      // build result string
      result += i.repeat(j);
    }
  
    return result;
  }
  
  convertToRoman(36);