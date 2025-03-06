
// // /::::/::::::::::::::::::::::debut emailjs:::::::::::::::::::::::::::::::::::::::::


// //  l'initialisation

// (function(){
//     emailjs.init("kyMmDuX5KQfipVJz"); // cléf-publique 
// });

// document.getElementById('contact-form').addEventListener('submit', function(event) { // je selectione l'id de  (contact-form) et je lui mets une ecoute 
//     event.preventDefault(); // Empêche le rechargement de la page

//     const submitButton = this.querySelector('button[type="submit"]'); // pour eviter quil clik plusieur fois dessus comme un bourrin pendant l'envoi
//     submitButton.disabled = true; // Désactiver le bouton d'envoi

//     // Envoi du formulaire avec EmailJS
//     emailjs.sendForm('service_eumieoh', 'template_oib4hq7', this)   // service eumioh et template a voir sur la doc email.js je tilt
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text); // Afficher la réponse du serveur
//             alert('Message envoyé avec succès !');
//         }, function(error) {
//             console.error('Échec de l\'envoi : ', error); // Afficher l'erreur complète
//             alert('Échec de l\'envoi : ' + error.text);
//         })
        
// });


// // /::::/:::::::::::::::::::::FIN DU EMAILJS::::::::::::::::::::::::::::::::::::::::::







// // /::::/:::::::::::::::::::::DEBUT DU MENU DEROULANT avec effet fondu ::::::::::::::::::::::::::::::::::::::::::

// //durée des animations des section en millisecondo
// var current_item = 0;
// var section_hide_time = 1300;
// var section_show_time = 1300;

// // bibliothèque JavaScript
// jQuery(document).ready(function($) {


// 	$("a", '.mainmenu').click(function() // je cible tout les liens à l'intérieur de l'élément avec la classe .mainmenu et jy mets clik 
// 	{
// 		if( ! $(this).hasClass('active') ) { // si le liens est active ya rien sinon je continue
// 			current_item = this;
//                 // Masque toutes les sections visibles avec la classe .section
// 			    $('.section:visible').fadeOut( section_hide_time, function() { 
// 				$('a', '.mainmenu').removeClass( 'active' );  
// 				$(current_item).addClass( 'active' );
//                  // Affiche la nouvelle section
// 				var new_section = $( $(current_item).attr('href') );
// 				new_section.fadeIn( section_show_time );
// 			} );
// 		}
// 		return false;
// 	});		
// });



// // /::::/::::::::::::::::::::::FIN DU MENU DEROULANT:::::::::::::::::::::::::::::::::::::::::



