setup = function() {
    myCanvas = createCanvas(1000,600);
    var divContainer = document.getElementById('myContainer');
    divContainer.style.textAlign = 'center';
    myCanvas.parent(divContainer);
    background(200);
    noStroke();
}

// Adapté du site natureofcode.com de Dan Shiffman
/*
 Ce programme simule le rebond d'une balle,
 en calculant en boucle la position de la balle
 à l'aide d'une équation parabolique
*/

// Définition du temps de départ : t=0
var t = 0;
// Définition de la hauteur de la balle  : y = 0 correspond au sol.
var y = 0;
//Définition d'une variable x0 : correspondant à la position de départ de la balle et de son ombre.
var x0 = 50;
// Définition d'une variable x : correspondant à la position de la balle et de son ombre à l’instant t.
var x = x0;
// Définition d'une variable dx : correspond au déplacement de la balle a droite.
var dx = 6;
// Définition d'une variable ka : correspond au coefficient d’amortissement à chaque rebond.
var ka = 1;
// Définition d'une variable step : correspond au changement entre la fonction mouseMoved et draw.
var step = 0;
// Définition d'une variable cdr : correspond au nombre de rebond effectué par la balle.
var cdr = 0;
// Définition d'une variable w : utilisée pour compter quelque chose (à définir selon votre besoin).
var w = 0;

function mouseMoved() { //Permet de suivre la souris n'importe où dans la canvas et dessiner un trait rouge de la balle a la souris.
// Draw the arrow
if (step == 0) {
// Dessine la couleur du ciel sur la totalité du canvas
background(180, 220, 225);
// Dessine le sol
fill(255, 255, 255);        // couleur de remplissage : blanc
// coin en haut à gauche du rectangle : (0,250), largeur : 400, hauteur : 150
rect(0, 450, 1000, 150); 

// Dessin de l'ombre
fill("grey");    // gris d'autant plus claire que y est grand
// dessin d'une ellipse : centre : (200,300) largeur : shadowSize, hauteur : 10
ellipse(50 , 525, 50, 10);

// Dessin de la balle
fill(71, 117, 255);     // Choix de couleur
// dessin d'une ellipse : centre : (200,correctedY) largeur : 50, hauteur : 50
ellipse(50, 500, 50, 50);

//Dessin du trou de green
fill("darkgreen")    // Choix de la couleur
ellipse(900,525,70,14)  //dessin d'une ellipse : centre: (900,525) largeur : 70 , hauteur : 14


strokeWeight(10); // définit l’épaisseur du trait
stroke(255, 0, 0); // définit la couleur du trait, le faire en rouge
line(x0, 500, mouseX, mouseY); // Trace la ligne
noStroke(); // supprime le contour pour la suite
}};

function mouseClicked() {
if (step == 0) {
dx = (mouseX - x0)/20; // valeur à ajouter à x à chaque boucle
dy = (500 - mouseY)/50; // valeur à ajouter à y à chaque boucle
t = 0; // réinitialisation de temps (temps)
x = x0; // x en position initiale x0
ka = 1; // coef d’amortissement ka = 1
y = 0; // y=0 : hauteur de la balle : au sol
step = 1; // la prochaine étape du jeu : étape 1
}
else {
	step = 0

}
};

draw = function() {
		if (step ==1) {

        // Dessine la couleur du ciel sur la totalité du canvas
        background(180, 220, 225);
        // Dessine le sol
        fill(255, 255, 255);        // couleur de remplissage : blanc
        // coin en haut à gauche du rectangle : (0,250), largeur : 400, hauteur : 150
        rect(0, 450, 1000, 150);     

        // Calcul de y conformément à l'équation de la parabole en fonction de t:
        // y = (vitesse)*t - (acceleration)*t^2;
        y=(ka*8*t-0.03*t**2) ;
        // si y devient négatif c'est que la balle a touché le sol
        if (y < 0) {     // on reset y et t pour permettre un nouveau rebond
            y = 0;
            t = 0;
			ka = ka*0.85;
			cdr = cdr + 1
        }
    
        // on rend l'ombre d'autant plus claire que y est grand
        var grey = 0.1 * y + 200;
        // on rend l'ombre d'autant plus grande que y est grand
        var shadowSize = 0.2 * y + 50;
        // Dessin de l'ombre
        fill(grey, grey, grey);    // gris d'autant plus claire que y est grand
        // dessin d'une ellipse : centre : (200,300) largeur : shadowSize, hauteur : 10
        ellipse(x , 525, shadowSize, 10);

        // Comme y représente une hauteur positive, on doit l'inverser
        // pour qu'elle apparaisse comme il faut à l'écran
        var correctedY = 500 - y;       // 275 : hauteur du rebond au sol

        // Dessin de la balle
        fill(71, 117, 255);     // Choix de couleur
        // dessin d'une ellipse : centre : (200,correctedY) largeur : 50, hauteur : 50
        ellipse(x, correctedY, 50, 50);       

        // augmentation du temps pour la boucle suivante
        t = t + 5;
		
		//Dessin du trou de green
		fill("darkgreen")    // Choix de la couleur
		ellipse(900,525,70,14)  //dessin d'une ellipse : centre: (900,525) largeur : 70 , hauteur : 14
		
		x = x + dx;

        // Vérification de la condition de victoire
        if (dist(x, correctedY, 900, 520) < 35 && (cdr == 0 || cdr == 1)) {
            // Affiche un message de victoire
            textSize(32);
            fill(0, 102, 153);
            text('Victoire!', 400, 300);
            noLoop(); // Arrête l'animation
            // Réactualise la page après 5 secondes
            setTimeout(function() {
                location.reload();
            }, 5000);
        }

		if(x > 880 && x < 920 && cdr == 3) {
			// Dessine la couleur du ciel sur la totalité du canvas
			background(180, 220, 225);
			// Dessine le sol
			fill(255, 255, 255);        // couleur de remplissage : blanc
			// coin en haut à gauche du rectangle : (0,250), largeur : 400, hauteur : 150
			rect(0, 450, 1000, 150); 
			//Dessin du trou de green
			fill("darkgreen")    // Choix de la couleur
			ellipse(900,525,70,14)  //dessin d'une ellipse : centre: (900,525) largeur : 70 , hauteur : 14
			circle(200,200,100)
			w = w + 1
		}
		}
};
