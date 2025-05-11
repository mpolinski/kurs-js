let numbers = [1, 2, 3, 5, 8, 13, 21, 26, 28];

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
        if (!result.includes(element)) {
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
        if (Array.isArray(element)) {

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
    for (character of lowerStr) {
        if (result[character]) {
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

    for (key in obj) {

        if (obj[key] in map) {
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
        for (let i = 0; i < 5; ++i) {
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


map = { pending: "w toku", done: "zrobione" }
obj = { status: "pending", estimation: 15, ownerId: 5 }
let remappedObj = remapValues(obj, map);
console.log(remappedObj)
game = new DiceGame()
game.play()

products = [{ name: "Laptop", price: 2000 }, { name: "Tablet", price: 1500 }, { name: "Mouse", price: 150 }]
cart = new ShoppingCart(products);
cart.addProduct(new Product("Keyboard", 300));
cart.addProduct({ name: "Keyboard", price: 300 });
console.log(cart.getTotal());

class BankAccount {
    constructor(accountName, transactions = [], balance = 0) {
        this.transactions = transactions;
        this.balance = balance;
        this.accountName = accountName
    }

    getBalance() {
        return this.balance;
    }

    getTransactions() {
        return this.transactions;
    }

    generateNewTransactionId() {
        let nextTransactionId = this.transactions.length + 1
        return `tx-${String(nextTransactionId).padStart(5, '0')}`;
    }

    printTransactions() {
        this.transactions.forEach(transaction => {
            console.log("Konto: ", this.accountName, "Id: ", transaction.id, "Typ: ", transaction.type, "Wartość: ", transaction.amount, "Data: ", transaction.date.toISOString());
        })
    }

    deposit(amount) {

        let numAmount = Number(amount);

        if (numAmount < 0) {
            console.log("Błąd!")
            return;
        }

        this.balance += numAmount;
        this.transactions.push(this.createTransaction("deposit", numAmount))
    }

    createTransaction(type, amount) {
        return {
            id: this.generateNewTransactionId(),
            type: type,
            amount: amount,
            date: new Date()
        }
    }

    withdraw(amount) {
        let numAmount = Number(amount)

        if (numAmount < 0 || this.balance < numAmount) {
            console.log("Błąd!")
            return;
        }

        this.balance -= numAmount;
        this.transactions.push(this.createTransaction("withdraw", numAmount))
    }

    transfer(toAccount, amount) {
        if(amount <= 0 || !(toAccount instanceof BankAccount) || toAccount == this)
            return false;

        this.transactions.push(this.createTransaction("outgoing-transfer", amount))
        this.withdraw(amount);
        toAccount.transactions.push(toAccount.createTransaction("incoming-transfer", amount))
        toAccount.deposit(amount);
    }
}

accountA = new BankAccount("Konto A");
accountB = new BankAccount("Konto B");
console.log(accountA.getBalance(), accountA.getTransactions())
accountA.deposit(1000);
accountA.deposit(500);
accountA.withdraw(600);
// console.log(accountA.getBalance(), accountA.getTransactions())
// accountA.printTransactions()
accountA.deposit(-100);
accountA.withdraw(-1000);
// accountA.printTransactions();

accountA.transfer(accountB, 100);
accountA.printTransactions();
accountB.printTransactions();
