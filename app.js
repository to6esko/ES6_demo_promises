import "babel-polyfill";
//Promises
/*
let fs=require('fs');

function readFile (filename) {
	return new Promise(function(resolve,reject){
		fs.readFile(filename,{encoding:'utf8'},function(err,contents){
			if (err) {
				reject(err);
			}
			resolve(contents);
		});
	});
}
let promise=readFile('example.txt');

promise.then(function(contents){
	console.log(contents);
},function(err){
    console.log(err.message);
});
*/

setTimeout(function() {
	console.log('Timeaut');
}, 50);
console.log('Hi!');

console.log('.'.repeat(20));

let promise = new Promise(function(resolve, reject) {
	console.log('Promise');
	resolve();
});
promise.then(function() {
	console.log('Resolved.')
});
console.log('Hi! Todor.');


console.log('.'.repeat(20));

//Създаване на определени обещания
//promis
let promise1 = Promise.resolve(42);
promise1.then(function(value) {
	console.log(value); //42
});
//reject
let promise2 = Promise.reject(42);
promise2.catch(function(value) {
	console.log(value); //42
});

//promis
let thenable = {
	then: function(resolve, reject) {
		resolve(43);
	}
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
	console.log(value); // 43
});

//reject
let thenable1 = {
	then: function(resolve, reject) {
		reject(44);
	}
};
let p2 = Promise.reject(thenable1);
p2.catch(function(value) {
	console.log(value); //44
});


//Изпълняване на грешки
let promise3 = new Promise(function(resolve, reject) {
	throw new Error('Explosion!');
});
promise3.catch(function(error) {
	console.log(error.message); //Explosion!
});
// еквивалентно на предишния пример
let promise4 = new Promise(function(resolve, reject) {
	try {
		throw new Error('Explosion!2');
	} catch (ex) {
		reject(ex);
	}
});
promise4.catch(function(error) {
	console.log(error.message); //Explosion!2
});


/*
//Node.js Rejection Handling
let possiblyUnhandledRejections=new Map();

  // когато, отхвърлянето е необработено го добавяме в map
process.on('unhadledRejection', function(reason,promise){
	possiblyUnhandledRejections.set(promise, reason);
});
process.on('rejectionHandled',function(promise){
	possiblyUnhandledRejections.delete(promise);
});
setInterval(function(){
	possiblyUnhandledRejections.forEach(function(reason,promise){
		console.log(reason.message ? reason.message:reason);

		  // направи нещо за да се справят с тези отхвърляния
		  handleRejection(promise,reason);
	});
	possiblyUnhandledRejections.clear();
},60000);
*/

/*
//Browser Rejection Handling
let rejcted;
window.onunhandledrejection=function(event){
	console.log(event.type); //unhandledrejection
	console.log(event.reason.message); //Explosion!4
	console.log(rejcted===event.promise); //true
};

window.onrejectionhandled=function(event){
	console.log(event.type); //rejectionhandled
	console.log(event.reason.message); //Explosion!4
	console.log(rejected===event.promise); //true
};
rejected=Promise.rejected(new Error('Explosion!4'));



let possiblyUnhandledRejections=new Map();
window.onunhandledrejection=function(event){
   possiblyUnhandledRejections.set(event.promise,event.reason);
};
window.onrejectionhandled=function(event){
	possiblyUnhandledRejections.delete(event.promise);
};
setInterval(function(){
	possiblyUnhandledRejections.forEach(function(reason,promeise){
		console.log(reason.message?reason.message:reason);
		// направи нещо за да се справят с тези отхвърляния
		handleRejection(promise,reason);
	});
	possiblyUnhandledRejections.clear();
},60000);
*/

let p3 = new Promise(function(resolve, reject) {
	resolve(45);
});
p3.then(function(value) {
	console.log(value);
}).then(function() {
	console.log('Finished');
});



//Error
let p4 = new Promise(function(resolve, reject) {
	resolve(45);
});
p4.then(function(value) {
	throw new Error('Booom');
}).catch(function(error) {
	console.log(error.message); //Booom
});


let p5 = new Promise(function(resolve, reject) {
	throw new Error('Explosion!3');
});
p5.catch(function(error) {
	console.log(error.message); //Explosion!3
	throw new Error('Booom2');
}).catch(function(error) {
	console.log(error.message); //Booom2
});


//Връщане на стйност от обещания
let p6 = new Promise(function(resolve, reject) {
	resolve(46);
});
p6.then(function(value) {
	console.log(value); //46
	return value + 1;
}).then(function(value) {
	console.log(value); //47
});

let p7 = new Promise(function(resolve, reject) {
	reject(48);
});
p7.catch(function(value) {
	console.log(value); //48
	return value + 1;
}).then(function(value) {
	console.log(value); //49
});



let p8 = new Promise(function(resolve, reject) {
	resolve(50);
});
let p9 = new Promise(function(resolve, reject) {
	resolve(51);
})
p8.then(function(value) {
	console.log(value); //50
	return p9;
}).then(function(value) {
	console.log(value); //51
});



let p10 = new Promise(function(resolve, reject) {
	resolve(52);
});
p10.then(function(value) {
	console.log(value); //52


	let p11 = new Promise(function(resolve, reject) {
		resolve(53);
	});
	return p11;
}).then(function(value) {
	console.log(value); //53
});


//Promise.all()

let p12 = new Promise(function(resolve, reject) {
	resolve(54);
});
let p13 = new Promise(function(resolve, reject) {
	resolve(55);
});
let p14 = new Promise(function(resolve, reject) {
	resolve(56);
});
let p15 = Promise.all([p12, p13, p14]);
p15.then(function(value) {
	console.log(Array.isArray(value)); //true
	console.log(value[0]); //54
	console.log(value[1]); //55
	console.log(value[2]); //56
});



//Promise.race()
//resolve
let p16 = Promise.resolve(57);

let p17 = new Promise(function(resolve, reject) {
	resolve(58);
});

let p18 = new Promise(function(resolve, reject) {
	resolve(59);
});

let p19 = Promise.race([p16, p17, p18]);

p19.then(function(value) {
	console.log(value); //57
});


//reject
let p20 = new Promise(function(resolve, reject) {
	resolve(60);
});

let p21 = Promise.reject(61);

let p22 = new Promise(function(resolve, reject) {
	resolve(62);
});

let p23 = Promise.race([p20, p21, p22]);

p23.catch(function(value) {
	console.log(value); // 61
});



//Asynchronus Tsak Running
/*
let fs = require('fs');

function run(taskDef) {
	let task = taskDef();
	let result = task.next();

	function step() {
		if (!result.done) {
			if (typeof result.value === 'function') {
				result.value(function(err, data) {
					if (err) {
						result = task.throw(err);
						return;
					}
					result = task.next(data);
					step();
				});
			} else{
				result=task.next(result.value);
				step();
			}
		}
	}
	step();
}

run(function*(){
	let contents=yield readFile('config.json');
	doSomethingWith(contents);
	console.log('Done');
});
*/
//ES 6

let fs = require("fs");

function run(taskDef) {

	// създаване на итератор
	let task = taskDef();

	// начало на задачата
	let result = task.next();

	// рекурсивна функция за обхождане
	(function step() {

		// ако има още нещо за правене
		if (!result.done) {

			// разрешаване на обещание за лесно правене
			let promise = Promise.resolve(result.value);
			promise.then(function(value) {
				result = task.next(value);
				step();
			}).catch(function(error) {
				result = task.throw(error);
				step();
			});
		}
	}());
}

// Дефиниране на функция за използване на task runner

function readFile(filename) {
	return new Promise(function(resolve, reject) {
		fs.readFile(filename, function(err, contents) {
			if (err) {
				reject(err);
			} else {
				resolve(contents);
			}
		});
	});
}

// Стартиране на задачата

run(function*() {
	let contents = yield readFile("config.json");
	doSomethingWith(contents);
	console.log("Done");
});


//Наследяване на общания
class MyPromise extends Promise {
	success(resolve, reject) {
		return this.then(resolve, reject);
	}
	failure(reject) {
		return this.catch(reject);
	}
}
let promise6 = new MyPromise(function(resolve, reject) {
	resolve(70);
});
promise6.success(function(value) {
	console.log(value); //70
}).failure(function(value) {
	console.log(value);
});



let p24 = new Promise(function(resolve, reject) {
	resolve(75);
});

let p25 = MyPromise.resolve(p24);

p25.success(function(value) {
	console.log(value); //75
});
console.log(p25 instanceof MyPromise);