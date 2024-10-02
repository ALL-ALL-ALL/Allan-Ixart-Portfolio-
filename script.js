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

$("#contact-form").submit(function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    

    emailjs.sendForm("service_eumieoh", "template_oib4hq7", this)
        .then(function() {
            alert("Email envoyé avec succès !");
        }, function(error) {
            alert("Échec de l'envoi : " + JSON.stringify(error));
        });
});








