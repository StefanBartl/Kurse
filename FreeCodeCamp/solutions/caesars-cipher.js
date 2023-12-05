function rot13(str) {

  let resultStr = [];

  const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'," ", "-", "_", ".", "&","?", "!", "@", "#", "/"];
  // index +13
  const rot13 = ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M', " ", "-", "_", ".", "&","?", "!", "@", "#", "/"];
  
  // loop trough argument string and lib
  for(let i=0; i<str.length; i++){
     for(let j =0; j<alphabet.length; j++){ 
// if the current str char is equal to normal alphabet char, we got the correct j index
if(str[i] === alphabet[j]){
// push correct char from lib to result
resultStr.push(rot13[j]);
};};};
    return resultStr.join("");
};


rot13("SERR PBQR PNZC");