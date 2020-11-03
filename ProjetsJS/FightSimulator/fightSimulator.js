
class Personnage {

    constructor(pseudo, classe, sante, attaque, niveau) {
        this.pseudo = pseudo;
        this.classe = classe;
        this.sante = sante;
        this.attaque = attaque;
        this.niveau = 1;
    }

    get informations() {
        return this.pseudo + " ( " + this.classe + ")  a " + this.sante + " points de vie et est au niveau " + this.niveau;
    }

    evoluer() {
        this.niveau++;
        console.log(this.pseudo + " passe au niveau " + this.niveau + " !");
    }

    verifierSante() {
        if (this.sante <= 0) {
            this.sante = 0;
            console.log(this.pseudo + " a perdu ! ");
        }
    }
}

class Magicien extends Personnage {

    constructor(pseudo) {
        super(pseudo, "magicien", 170, 90);
    }

    attaquer(personnage) {

        // Coup classique
        personnage.sante -= this.attaque;

        // affichage du coup
        console.log(this.pseudo + " attaque " + personnage.pseudo + " en lançant un sort " + this.attaque + " dégats ");

        // Appel fonction évoluer
        this.evoluer();
        personnage.verifierSante();
    }

    coupSpecial(personnage) {

        // Coup spécial
        personnage.sante -= this.attaque * 5;

        // affichage du coup
        console.log(this.pseudo + " attaque avec son coup spécial puissance des arcanes " + personnage.pseudo + " : " + this.attaque * 5 + " dégats");

        // Appel fonction évoluer
        this.evoluer();
        personnage.verifierSante();
    }
}

class Guerrier extends Personnage {

    constructor(pseudo) {
        super(pseudo, "guerrier", 350, 50);
    }

    attaquer(personnage) {
        // Coup classique
        personnage.sante -= this.attaque;

        // affichage du coup
        console.log(this.pseudo + " attaque " +personnage.pseudo + " avec son épée " + this.attaque + " dégats ");

        // Appel fonction évoluer
        this.evoluer();
        personnage.verifierSante();
    }

    coupSpecial(personnage) {

        // Coup spécial
        personnage.sante -= this.attaque * 5;

        // affichage du coup
        console.log(this.pseudo + " attaque avec son coup spécial haches de guerre " +personnage.pseudo + " : " + this.attaque * 5 + " dégats");

        // Appel fonction évoluer
        this.evoluer();
        personnage.verifierSante();
    }
}

var jeremLeBarbare = new Guerrier('Jérém');
var anaLananas = new Magicien('Ana');

console.log(jeremLeBarbare.informations);
console.log(anaLananas.informations);

jeremLeBarbare.attaquer(anaLananas);
console.log(anaLananas.informations);

anaLananas.attaquer(jeremLeBarbare);
console.log(jeremLeBarbare.informations);

jeremLeBarbare.coupSpecial(anaLananas); 