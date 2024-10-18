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
var x0 =50;
var x = x0;
var dx=6;
var ka=1;
var step=0;

function mouseClicked() {
if (step == 0) {
dx = (mouseX - x0)/20; // valeur à ajouter à x à chaque boucle
dy = (500 - mouseY)/50; // valeur à ajouter à y à chaque boucle
t = 0; // réinitialisation de temps (temps)
x = x0; // x en position initiale x0
ka = 1; // coef d’amortissement ka = 1
y = 0; // y=0 : hauteur de la balle : au sol
step = 1; // la prochaine étape du jeu : étape1
}
else{
	if (step==1) 
	step=0
}
}

function mouseMoved() { //à compléter
	if (step==0){
		// Dessine la couleur du ciel sur la totalité du canvas
        background(180, 220, 225);
		// Dessine le sol
        fill(255, 255, 255);        // couleur de remplissage : blanc
        // coin en haut à gauche du rectangle : (0,250), largeur : 400, hauteur : 150
        rect(0, 450, 1000, 150); 
		// Dessin de la balle
        fill(71, 117, 255);     // Choix de couleur
        // dessin d'une ellipse : centre : (200,correctedY) largeur : 50, hauteur : 50
        ellipse(x0, 500, 50, 50);   
		 // on rend l'ombre d'autant plus claire que y est grand
        var grey = 0.1 * y + 200;
        // on rend l'ombre d'autant plus grande que y est grand
        var shadowSize = 0.2 * y + 50;
        // Dessin de l'ombre
        fill(grey, grey, grey);    // gris d'autant plus claire que y est grand
        // dessin d'une ellipse : centre : (200,300) largeur : shadowSize, hauteur : 10
        ellipse(x0 , 520, shadowSize, 10);
		//trou du green
		fill(128,128,128); //Choix de couleur
		//ellipse
		ellipse(900,520,70,14);
		// Draw the arrow
		strokeWeight(8); // définit l’épaisseur du trait
		stroke(255,0,0); // définit la couleur du trait, le faire en rouge
		line(60, 480, mouseX, mouseY); // Trace la ligne (peut mieux faire niveau coordonnées)
		noStroke(); // supprime le contour pour la suite
	}	
};

draw = function() {
	if (step==1) {
        // Dessine la couleur du ciel sur la totalité du canvas
        background(180, 220, 225);
        // Dessine le sol
        fill(255, 255, 255);        // couleur de remplissage : blanc
        // coin en haut à gauche du rectangle : (0,250), largeur : 400, hauteur : 150
        rect(0, 450, 1000, 150);     

        // Calcul de y conformément à l'équation de la parabole en fonction de t:
        // y = (vitesse)*t - (acceleration)*t^2;
        y = ka*7*t - 0.03*t**2 ;
        // si y devient négatif c'est que la balle a touché le sol
        if (y < 0) {     // on reset y et t pour permettre un nouveau rebond
            y = 0;
            t = 0;
			ka=ka*0.85;
        }
    
        // on rend l'ombre d'autant plus claire que y est grand
        var grey = 0.1 * y + 200;
        // on rend l'ombre d'autant plus grande que y est grand
        var shadowSize = 0.2 * y + 50;
        // Dessin de l'ombre
        fill(grey, grey, grey);    // gris d'autant plus claire que y est grand
        // dessin d'une ellipse : centre : (200,300) largeur : shadowSize, hauteur : 10
        ellipse(x , 520, shadowSize, 10);

        // Comme y représente une hauteur positive, on doit l'inverser
        // pour qu'elle apparaisse comme il faut à l'écran
        var correctedY = 500 - y;       // 275 : hauteur du rebond au sol

        // Dessin de la balle
        fill(71, 117, 255);     // Choix de couleur
        // dessin d'une ellipse : centre : (200,correctedY) largeur : 50, hauteur : 50
        ellipse(x, correctedY, 50, 50);       
		
		//trou du green
		fill(128,128,128); //Choix de couleur
		//ellipse
		ellipse(900,520,70,14);
		
        // augmentation du temps pour la boucle suivante
        t = t + 5;
		x=x+dx
	}

};
