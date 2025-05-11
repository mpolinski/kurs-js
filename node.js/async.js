const numbersList = [1, 2, 3, 5, 8, 13, 21];

const doubleNumbers = numbersList.map(element => 2 * element)
const moreThanTen = doubleNumbers.filter(element => element > 10)

console.log(doubleNumbers);
console.log(moreThanTen)

function display() {
    console.log(n)
}


// Błąd, 6 razy wypisze się 6, poniewaz w momencie wykonania funkcji zmienna globalna n ma wartość 6
// let n = 1
// for (n = 1; n <= 5; n++) {
//     setTimeout(display, n * 1000);
// }

// Poprawne wykonanie, funkcja strzałkowa pamięta kontekst i wartość, z jaką została wywołana
for (let i = 1; i <= 5; i++) {
    setTimeout((value) => console.log(value), i * 1000, i);
}