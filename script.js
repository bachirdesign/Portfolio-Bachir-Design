// une scrpit pour gerer l'interactivite du site

// Fonction pour afficher une alerte de bienvenue
function afficherAlerteBienvenue() {
    alert("Bienvenue sur le portfolio de Seydou Bassirou Ndour !");
}
// Appeler la fonction lorsque la page est complètement chargée
window.onload = afficherAlerteBienvenue;
// Fonction pour changer la couleur de fond lors du clic sur un bouton
function changerCouleurFond() {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
}
// Ajouter un écouteur d'événement au bouton
document.addEventListener('DOMContentLoaded', function() {
    const boutonCouleur = document.getElementById('bouton-couleur');
    if (boutonCouleur) {
        boutonCouleur.addEventListener('click', changerCouleurFond);
    }
});
// Fonction pour afficher une boîte de dialogue de confirmation avant de quitter la page
window.onbeforeunload = function() {
    return "Êtes-vous sûr de vouloir quitter cette page ?";
};  
// Fonction pour afficher un message dans la console lorsque l'utilisateur fait défiler la page
window.onscroll = function() {
    console.log("L'utilisateur fait défiler la page.");
};
// Fonction pour afficher une alerte lorsque l'utilisateur soumet un formulaire
function alerteSoumissionFormulaire(event) {
    event.preventDefault(); // Empêcher la soumission réelle du formulaire
    alert("Merci pour votre soumission !");
}
document.addEventListener('DOMContentLoaded', function() {
    const formulaire = document.getElementById('mon-formulaire');
    if (formulaire) {
        formulaire.addEventListener('submit', alerteSoumissionFormulaire);
    }
});
// Fonction pour afficher un message lorsque l'utilisateur survole un élément
function messageSurvol() {
    console.log("Vous survolez l'élément !");
}
document.addEventListener('DOMContentLoaded', function() {
    const elementSurvol = document.getElementById('element-survol');    
    if (elementSurvol) {
        elementSurvol.addEventListener('mouseover', messageSurvol);
    }
});
// Fonction pour afficher une alerte lorsque l'utilisateur clique sur un lien
function alerteClicLien(event) {
    event.preventDefault(); // Empêcher la navigation réelle
    alert("Vous avez cliqué sur un lien !");
}
document.addEventListener('DOMContentLoaded', function() {
    const lien = document.getElementById('mon-lien');
    if (lien) {
        lien.addEventListener('click', alerteClicLien);
    }
});

// Fonction pour afficher un message lorsque l'utilisateur redimensionne la fenêtre
window.onresize = function() {
    console.log("La fenêtre a été redimensionnée.");
};
// Fonction pour afficher une alerte lorsque l'utilisateur appuie sur une touche
function alerteTouche(event) {
    alert("Vous avez appuyé sur la touche : " + event.key);
}
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', alerteTouche);
}
);

// Fonction pour afficher un message lorsque l'utilisateur clique n'importe où sur la page
document.addEventListener('click', function() {
    console.log("L'utilisateur a cliqué quelque part sur la page.");
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const carousels = Array.from(document.querySelectorAll('.carousel'));

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const btnPrev = carousel.querySelector('.carousel-btn.prev');
    const btnNext = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    // create dots
    const dots = [];
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot';
        d.type = 'button';
        if (i === 0) d.classList.add('active');
        dotsContainer.appendChild(d);
        dots.push(d);
        d.addEventListener('click', () => goTo(i));
      });
    }

    let index = 0;
    let slideSize = 0;
    let gap = 0;
    let autoplayId = null;
    const AUTOPLAY_MS = 3500;

    function updateSizes() {
      const style = getComputedStyle(track);
      gap = parseFloat(style.gap || style.columnGap || 24) || 24;
      // use first slide width (min-width set in CSS)
      slideSize = slides[0].getBoundingClientRect().width;
      moveToIndex(index, false);
    }
    function moveToIndex(i, animate = true) {
      index = Math.max(0, Math.min(i, slides.length - 1));
      const offset = (slideSize + gap) * index;
      if (!animate) track.style.transition = 'none';
      else track.style.transition = '';
      track.style.transform = `translateX(-${offset}px)`;
      updateButtons();
      updateDots();
      // re-enable transition after frame if disabled
      if (!animate) requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = '';
        });
      });
    }
    function updateButtons() {
      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) btnNext.disabled = index === slides.length - 1;
    }
    function updateDots() {
      if (!dots.length) return;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function next() { moveToIndex(index + 1); }
    function prev() { moveToIndex(index - 1); }
    function goTo(i) { moveToIndex(i); }

    // Attach controls
    if (btnPrev) btnPrev.addEventListener('click', prev);
    if (btnNext) btnNext.addEventListener('click', next);

    // autoplay
    function startAutoplay() {
      stopAutoplay();
      autoplayId = setInterval(() => {
        // loop to start when at end
        if (index >= slides.length - 1) moveToIndex(0);
        else next();
      }, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    }

    // pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // responsive
    window.addEventListener('resize', updateSizes);

    // keyboard support
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // init
    updateSizes();
    startAutoplay();
  });

});