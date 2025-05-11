class Samochod {
    constructor(marka, model) {
        this.marka = marka;
        this.model = model;
    }

    wypiszInfo() {
        console.log(this.marka, " ", this.model)
    }
}

class SamochodElektryczny extends Samochod {
    constructor(marka, model, zasieg) {
        super(marka, model);
        this.zasieg = zasieg;
    }

    wypiszZasieg() {
        console.log(this.zasieg);
    }
}

let vw_golf = new Samochod("VW", "Golf" );
let tesla = new SamochodElektryczny("Tesla", "Y", 300);

tesla.wypiszInfo();
tesla.wypiszZasieg()

class Zwierze {
    wydajDzwiek() {
        console.log("zwierze wydaje dzwiek");
    }
}

class Pies extends Zwierze {
    // constructor() {
    //     super()
    // }

    wydajDzwiek() {
        console.log("Hau!");
    }
}

class Kot extends Zwierze {
    constructor() {
        super()
    }

    wydajDzwiek() {
        console.log("Miau!");
    }
}

zwierze = new Zwierze()
pies = new Pies()
kot = new Kot()

zwierze.wydajDzwiek();
pies.wydajDzwiek()
kot.wydajDzwiek()