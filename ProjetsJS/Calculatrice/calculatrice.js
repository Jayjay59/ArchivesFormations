
function additionCalcul(nombreUn, nombreDeux) {

    return nombreUn + nombreDeux;
}

function multiplierCalcul(nombreUn, nombreDeux) {

    return nombreUn * nombreDeux;
}

function soustraireCalcul(nombreUn, nombreDeux) {

    let resultat = nombreUn - nombreDeux;
    return resultat;
}

function diviserCalcul(nombreUn, nombreDeux) {
    let resultat;
    try {
        if (nombreDeux > 0) {
            resultat = nombreUn / nombreDeux;
        } else {
            throw new Error("Impossible de diviser par Zéro");
        }
    } catch (error) {
        alert(error);
    }
    return resultat;
}

let resultat;
let choixUser;
let choixConvertInt;
let premierChiffre, deuxiemeChiffre;
let premierConvertit, deuxiemeConvertit;
let restart = false ; 

do{
    do {
        choixUser = prompt("Que souhaitez-vous faire ? \n\n 1- Addition \n 2- Multiplication \n 3- Soustraction \n 4- Division");
        choixConvertInt = parseInt(choixUser);
    } while (choixUser < 1 || choixUser > 4 || choixUser === "")
       
    do {
        premierChiffre = prompt("Renseignez le premier chiffre svp :");
        deuxiemeChiffre = prompt("Renseigner le deuxième chiffre svp");
        premierConvertit = parseInt(premierChiffre);
        deuxiemeConvertit = parseInt(deuxiemeChiffre);
    } while (isNaN(premierConvertit) || isNaN(deuxiemeConvertit))
    
    try {
        switch (choixConvertInt) {
            case 1:
                resultat = additionCalcul(premierConvertit, deuxiemeConvertit);
                break;
            case 2:
                resultat = multiplierCalcul(premierConvertit, deuxiemeConvertit);
                break;
            case 3:
                resultat = soustraireCalcul(premierConvertit, deuxiemeConvertit);
                break;
            case 4:
                resultat = diviserCalcul(premierConvertit, deuxiemeConvertit);
                break;
            default:
                throw new Error("Une erreur est survenue");
                break;
        }
        // SI PAS D'ERREUR ON AFFICHE LE RESULTAT
        alert("Le resultat de votre calcul est de : " + resultat);
    
    } catch (error) {
        alert(error);
    }

    if(confirm("Voulez vous recommencer un calcul ? ")){
        restart = true ; 
    }else{
        restart = false ; 
    }

}while(restart)







