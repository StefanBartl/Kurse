
# The Hard Parts of OOP / Will Sentance / Mitte Oktober, 23`


## Takeaways

+ *Object.create():*
```javascript
    userFunctions = {
	sayName: function(){
	    console.log("I'm " + this.name);
	    };
    };

    function userCreator(name, score){
	const newUser = Object.create(userFunctions);
    };
```

Durch `newUser = Object.create(userFunctions)` ist `newUser.__proto__` das *Prototypen-Objekt* der Funktion `userFunctions` mit der zugehörigen `sayName`-Funktion

+

+

## Objects





