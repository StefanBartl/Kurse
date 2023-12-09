function palindrome(str) {
  // regex
  const regex = /[\W_]/gi;
  const regexedStr = str.replaceAll(regex, '');
  // lowercase
  const alignedStr = regexedStr.toLowerCase();

  const reverseStr = alignedStr.split('').reverse().join(''); 
  return reverseStr === alignedStr;

  return true;
}

palindrome("eye");