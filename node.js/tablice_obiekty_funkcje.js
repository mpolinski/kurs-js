let numbers = [1,2,3,5,8,13,21, 26, 28];

function groupEvenOdd(numbers) {
    let even = [];
    let odd = [];
    numbers.forEach(element => {
        if (element % 2 === 0) {
            even.push(element)
        } else {
            odd.push(element)
        }
    });

    return {
        odd: odd,
        even: even
    }
}

let result = groupEvenOdd(numbers);
console.log(result);

function removeDuplicates(arr) {
    let result = [];
    arr.forEach(element => {
        if(!result.includes(element)) {
            result.push(element);
        }
    })

    return result;
}

let arr = ["jablko", "banan", "cytryna", "jablko"];

result = removeDuplicates(arr)
console.log(result);

let arrayToFlatten = [1, [2, 3], [4, 5], 6];

function flattenOneLevel(array) {

    let flattenedArr = []
    // pierwsza petla
    array.forEach(element => {
        if(Array.isArray(element)) {

            // druga petla - forEach
            element.forEach(element2ndlevel => {
                flattenedArr.push(element2ndlevel);
            })

            // druga petla - zwyczajny for
            // for(let j=0; j< element.length; ++j) {
            //     flattenedArr.push(element[j]);    
            // }
        } else {
            flattenedArr.push(element);
        }

    })

    return flattenedArr;
}

console.log(flattenOneLevel(arrayToFlatten));

function letterFrequency(str) {
    let result = {}
    lowerStr = str.toLowerCase()

    // pętla ze zwyczajnym forem

    // for(let i=0; i < lowerStr.length; ++i) {       
    //     // jezeli klucz istnieje w obiekcie i wartość jest niezerowa
    //     if(result[lowerStr[i]]) {
    //         result[lowerStr[i]] += 1;
    //     } else {
    //         result[lowerStr[i]] = 1;
    //     }
    // }

    // pętla for ... of
    for(character of lowerStr) {
        if(result[character]) {
            result[character] += 1;
        } else {
            result[character] = 1;
        }
    }

    return result;
}

console.log(letterFrequency("hello"))

function remapValues(obj, map) {

    let result = {}

    for(key in obj) {
        
        if(obj[key] in map) {
            result[key] = map[obj[key]]
        } else {
            result[key] = obj[key]
        }
    }

    return result;
}


class DiceGame {
    roll() {
        return Math.floor(Math.random() * 6) + 1
    }

    play() {
        for(let i=0; i< 5; ++i) {
            console.log("Wynik rzutu: ", this.roll());
        }
    }
}

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    constructor(products = []) {
        this.productList = products;
    }

    addProduct(product) {
        this.productList.push(product)
    }

    getTotal() {
        let sum = 0;

        // pętla forEach
        this.productList.forEach(product => {
            sum += product.price;
        })

        // pętla for
        // for(let i=0; i<this.productList.length; ++i) {
        //     sum = sum + this.productList[i].price;
        // }

        return sum;
    }
}


map = {pending: "w toku", done: "zrobione"}
obj = {status: "pending", estimation: 15, ownerId: 5}
let remappedObj = remapValues(obj, map);
console.log(remappedObj)
game = new DiceGame()
game.play()

products = [{ name: "Laptop", price: 2000 },{ name: "Tablet", price: 1500 }, { name: "Mouse", price: 150 }]
cart = new ShoppingCart(products);
cart.addProduct(new Product("Keyboard", 300));
cart.addProduct({name: "Keyboard",price: 300});
console.log(cart.getTotal());

class BankAccount {
    constructor(transactions = [], balance = 0) {
        this.transactions = transactions;
        this.balance = balance;
    }

    getBalance() {
        return this.balance;
    }

    getTransactions() {
        return this.transactions;
    }

    printTransactions() {
        this.transactions.forEach(transaction => {
            console.log("Typ: ", transaction.type, "Wartość: ", transaction.amount);
        })
    }

    deposit(amount) {

        let numAmount = Number(amount);

        if (numAmount < 0) {
            console.log("Błąd!")
            return;
        }

        this.balance += numAmount;
        this.transactions.push({
            type: "deposit",
            amount: numAmount
        });
    }

    withdraw(amount) {
        let numAmount = Number(amount)

        if (numAmount < 0 || this.balance < numAmount) {
            console.log("Błąd!")
            return;
        }

        this.balance -= numAmount;
        this.transactions.push({
            type: "withdraw",
            amount: numAmount
        })
    }
}

account = new BankAccount();
console.log(account.getBalance(), account.getTransactions())
account.deposit(1000);
account.deposit(500);
account.withdraw(600);
console.log(account.getBalance(), account.getTransactions())
account.printTransactions()
account.deposit(-100);
account.withdraw(-1000);
account.printTransactions();

const numbersList = [1, 2, 3, 5, 8, 13, 21];

const doubleNumbers = numbersList.map(element => 2 * element)
const moreThanTen = doubleNumbers.filter(element => element > 10)

console.log(doubleNumbers);
console.log(moreThanTen)

function display() {
    console.log(n)
}

let n = 1
// Błąd, 6 razy wypisze się 6, poniewaz w momencie wykonania funkcji zmienna globalna n ma wartość 6
for (n = 1; n <= 5; n++) {
    setTimeout(display, n * 1000);
}

// Poprawne wykonanie, funkcja strzałkowa pamięta kontekst i wartość, z jaką została wywołana
for (let i = 1; i <= 5; i++) {
    setTimeout((value) => console.log(value), i * 1000, i);
}