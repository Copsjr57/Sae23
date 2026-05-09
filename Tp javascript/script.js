// Initialisation du jeu et des éléments du DOM
let nombreSecret=Math.floor(Math.random()*10)+1;
let essais=0;

const boutonJouer=document.getElementById("play");
const boutonReset=document.getElementById("reset");
const message=document.getElementById("message");
const tentatives=document.getElementById("tentatives");
const input=document.getElementById("guess");

// Gestion du clic sur le bouton Jouer
boutonJouer.addEventListener("click", () => {
    const valeur=Number(input.value);
    essais++;

    if (valeur===nombreSecret) {
        message.textContent="Gagné !";
        message.style.color="green";
    } 
    else if (valeur<nombreSecret) {
        message.textContent="Trop petit";
        message.style.color="orange";
    } 
    else {
        message.textContent="Trop grand";
        message.style.color="orange";
    }
    tentatives.textContent="Essais : "+essais;
});

// Réinitialisation du jeu
boutonReset.addEventListener("click", () => {
    nombreSecret=Math.floor(Math.random()*10)+1;
    essais=0;
    message.textContent="";
    tentatives.textContent="";
    input.value="";
});