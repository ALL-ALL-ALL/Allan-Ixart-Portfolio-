// Sélectionne tous les liens avec la classe 'mentionLink'
const mentionLinks = document.querySelectorAll('.mentionLink');

mentionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Vérifie si le lien cliqué est celui des mentions légales
        if (link.textContent === " Mentions légales ") {
            // Ne fait rien pour le lien des mentions légales
            return; // Sort de la fonction sans ajouter la classe 'visited'
        }

        // Ajoute la classe 'visited' pour tous les autres liens
        link.classList.add('visited'); 
    });
});










// /::::/::::::::::::::::::::::debut emailjs:::::::::::::::::::::::::::::::::::::::::


// Initialisation de EmailJS avec ton user ID
(function(){
    emailjs.init("kyMmDuX5KQfipVJz");
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Désactiver le bouton d'envoi

    // Envoi du formulaire avec EmailJS
    emailjs.sendForm('service_eumieoh', 'template_oib4hq7', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text); // Afficher la réponse du serveur
            alert('Message envoyé avec succès !');
        }, function(error) {
            console.error('Échec de l\'envoi : ', error); // Afficher l'erreur complète
            alert('Échec de l\'envoi : ' + error.text);
        })
        
});



emailjs.init("PKuTqNHDiPJMrO5bL");  // Remplacez par votre clé publique



    emailjs.sendForm("service_eumieoh", "template_oib4hq7", this)
        .then(function() {
            alert("Email envoyé avec succès !");
        }, function(error) {
            alert("Échec de l'envoi : " + JSON.stringify(error));
        });
});


// /::::/:::::::::::::::::::::FIN DU EMAILJS::::::::::::::::::::::::::::::::::::::::::







// /::::/:::::::::::::::::::::DEBUT DU MENU DEROULANT ::::::::::::::::::::::::::::::::::::::::::


// global. currently active menu item 
var current_item = 0;

// few settings
var section_hide_time = 1300;
var section_show_time = 1300;

// jQuery stuff
jQuery(document).ready(function($) {

	// Switch section
	$("a", '.mainmenu').click(function() 
	{
		if( ! $(this).hasClass('active') ) { 
			current_item = this;
			// close all visible divs with the class of .section
			$('.section:visible').fadeOut( section_hide_time, function() { 
				$('a', '.mainmenu').removeClass( 'active' );  
				$(current_item).addClass( 'active' );
				var new_section = $( $(current_item).attr('href') );
				new_section.fadeIn( section_show_time );
			} );
		}
		return false;
	});		
});


// Globalement, l'élément du menu actuellement actif
var current_item = 0;

// Paramètres pour le temps d'affichage/masquage
var section_hide_time = 1300;
var section_show_time = 1300;

jQuery(document).ready(function($) {

    // Comportement lors du clic sur un lien du menu
    $("a", '.mainmenu').click(function() {
        if( ! $(this).hasClass('active') ) { 
            current_item = this;
            // Masque toutes les sections visibles avec la classe .section
            $('.section:visible').fadeOut(section_hide_time, function() { 
                $('a', '.mainmenu').removeClass('active');  
                $(current_item).addClass('active');
                // Affiche la nouvelle section
                var new_section = $($(current_item).attr('href'));
                new_section.fadeIn(section_show_time);
            });
        }
        return false;
    });
});


// /::::/::::::::::::::::::::::FIN DU MENU DEROULANT:::::::::::::::::::::::::::::::::::::::::

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))





