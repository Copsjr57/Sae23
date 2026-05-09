var deplacements = 0; // Compteur de déplacements
var modeImage = false; // false = mode chiffres, true = mode image
var imageUrl = imageUploadee; // L'image uploadée par l'utilisateur

// Initialisation du puzzle
function melanger() {
  var nouveau = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null);
  // Mélanger les cases de manière aléatoire
  for (var i=0;i<100;i++) {
    var pos1=Math.floor(Math.random() * 16);
    var pos2=Math.floor(Math.random() * 16);
    var temp=nouveau[pos1];
    nouveau[pos1]=nouveau[pos2];
    nouveau[pos2]=temp;
  }
  cases=nouveau;
  deplacements=0;
  afficher();
}
// Tableau représentant les cases du puzzle
function afficher() {
  var puzzle=document.getElementById("puzzle");
  puzzle.innerHTML="";
// Affichage des cases
  for (var i=0;i<16;i++) {
    var div=document.createElement("div");
    div.className="tile";
    if (cases[i]==null) {
      div.className = "tile empty";
    } else {
      div.setAttribute("data-index",i);
      div.onclick=function() {
        var index=this.getAttribute("data-index");
        deplacer(parseInt(index));
      };
      // Affichage de l'image ou du chiffre selon le mode
      if (modeImage==true) {
        var numero=cases[i];
        var ligne=Math.floor((numero-1)/4);
        var colonne=(numero-1)%4;
        div.style.backgroundImage="url('"+imageUrl+"')";
        div.style.backgroundSize="320px 320px";
        div.style.backgroundPosition ="-"+(colonne*80)+"px -"+(ligne*80)+"px";
        div.style.color="transparent";
      } else {
        div.innerHTML=cases[i];
      }
    }
    puzzle.appendChild(div);
  }
  
  document.getElementById("moves").innerHTML=deplacements;
}
// Fonction pour déplacer une case
function deplacer(index) {
  var indexVide=0;
  for (var i=0;i<16;i++) {
    if (cases[i]==null) {
      indexVide=i;
    }
  }
  var ligne=Math.floor(index/4);
  var ligneVide=Math.floor(indexVide/4);
  var possible=false;
  
  if (index==indexVide-1 && ligne==ligneVide) {
    possible=true;
  }
  if (index==indexVide+1 && ligne==ligneVide) {
    possible=true;
  }
  
  if (index==indexVide-4) {
    possible=true;
  }
  
  if (index==indexVide+4) {
    possible=true;
  }
  
  if (possible==true) {
    var temp=cases[index];
    cases[index]=cases[indexVide];
    cases[indexVide]=temp;
    deplacements=deplacements + 1;
    afficher();
    verifierVictoire();
  }
}
// Fonction pour vérifier si le joueur a gagné
function verifierVictoire() {
  var gagne=true;
  
  for (var i=0;i<15;i++) {
    if (cases[i] !=i+1) {
      gagne=false;
    }
  }
  
  if (gagne==true) {
    alert("Bravo ! Tu as gagné !");
  }
}
// Fonction pour changer de mode d'affichage
function changerMode() {
  modeImage=!modeImage;
  afficher();
}

afficher();
