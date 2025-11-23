// Script helpers: smooth scroll for anchor links and simple DOM-ready helper
document.addEventListener('DOMContentLoaded', function(){
	// Smooth scroll for internal anchors + focus management for accessibility
	document.querySelectorAll('a[href^="#"]').forEach(function(link){
		link.addEventListener('click', function(e){
			var href = this.getAttribute('href');
			var target = document.querySelector(href);
			if(target){
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// after the scroll, set focus to the first focusable element in the target
				window.setTimeout(function(){
					var focusable = target.querySelector('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
					if(focusable){ focusable.focus(); }
				}, 500);
				// close mobile nav if open
				var nav = document.getElementById('mainNav'); if(nav && nav.classList.contains('open')) nav.classList.remove('open');
			}
		});
	});

	// Hint if profile image is missing
	var img = document.querySelector('.profile-photo');
	if(img && img.getAttribute('src').includes('images/profile.jpg')){
		console.info('Remplacez images/profile.jpg par le chemin vers votre photo de profil.');
	}
		<script>
	(function(){
	  const root = document.getElementById('real-carousel');
	  const track = root.querySelector('.carousel-track');
	  const slides = Array.from(track.children);
	  const prev = root.querySelector('.carousel-btn.prev');
	  const next = root.querySelector('.carousel-btn.next');
	  const dotsWrap = root.querySelector('.carousel-dots');
	  let index = 0;
	
	  // Crée les dots
	  slides.forEach((s,i)=>{
		const d = document.createElement('button');
		d.className = 'carousel-dot';
		d.setAttribute('aria-label', 'Aller à la diapositive '+(i+1));
		d.addEventListener('click', ()=> goTo(i));
		dotsWrap.appendChild(d);
	  });
	  const dots = Array.from(dotsWrap.children);
	
	  function slideWidth(){
		return slides[0].getBoundingClientRect().width;
	  }
	  function goTo(i){
		index = i;
		track.style.transform = 'translateX('+(-index * slideWidth())+'px)';
		update();
	  }
	  function update(){
		dots.forEach((d, i)=> d.classList.toggle('active', i === index));
		prev.disabled = index === 0;
		next.disabled = index === slides.length - 1;
	  }
	  prev.addEventListener('click', ()=> goTo(Math.max(index-1,0)));
	  next.addEventListener('click', ()=> goTo(Math.min(index+1, slides.length-1)));
	  window.addEventListener('resize', ()=> goTo(index));
	  goTo(0);
	})();
	</script>

		// Mobile nav toggle
		var navToggle = document.getElementById('navToggle');
		var mainNav = document.getElementById('mainNav');
		if(navToggle && mainNav){
			navToggle.addEventListener('click', function(){
				mainNav.classList.toggle('open');
			});
			// close when clicking outside
			document.addEventListener('click', function(e){ if(!mainNav.contains(e.target) && !navToggle.contains(e.target)) mainNav.classList.remove('open'); });
		}

		// Active link on scroll
		var navLinks = document.querySelectorAll('.main-nav a');
		function setActiveLink(){
			var fromTop = window.scrollY + 80;
			navLinks.forEach(function(link){
				var section = document.querySelector(link.getAttribute('href'));
				if(section){
					if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
						link.classList.add('active');
					}else{ link.classList.remove('active'); }
				}
			});
		}
		window.addEventListener('scroll', setActiveLink);
		setActiveLink();
});
