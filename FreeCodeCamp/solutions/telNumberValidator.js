function telephoneCheck(str) {

	let boolResult = false;
	
	// ^ => begin; \d => digit; \s => whitespace;  $ => end; - ( ) are 'hardcoded' chars
	const regexLib = [
		/^\d\d\d\d\d\d\d\d\d\d$/,
		/^\d\d\d-\d\d\d-\d\d\d\d/,
		/^\d\d\d\s\d\d\d\s\d\d\d\d/,
		/^\(\d\d\d\)\d\d\d-\d\d\d\d/,
		/^\(\d\d\d\)\s\d\d\d-\d\d\d\d/,
		/^1\d\d\d\d\d\d\d\d\d\d/,
		/^1\s\d\d\d\s\d\d\d\s\d\d\d\d/,
		/^1\s\d\d\d-\d\d\d-\d\d\d\d/,
		/^1\(\d\d\d\)\d\d\d-\d\d\d\d/,
		/^1\s\(\d\d\d\)\s\d\d\d-\d\d\d\d/
	];

	// test if argument is a regex in regexLib and return true or false to boolResult
	boolResult = regexLib.some(cur => cur.test(str));
	
  	return boolResult;
};

telephoneCheck("555-555-5555");
