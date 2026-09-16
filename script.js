  // Filter project berdasarkan company.
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  const emptyProject = document.querySelector('.empty-project');
  const applyCompanyFilter = company=>{
    let visibleCards = 0;
    cards.forEach(card=>{
      const isVisible = card.dataset.company===company;
      card.classList.toggle('hidden',!isVisible);
      if(isVisible) visibleCards++; 
    });
    if(emptyProject) emptyProject.hidden = visibleCards > 0;
  };
  chips.forEach(chip=>{
    chip.addEventListener('click',()=>{
      chips.forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      applyCompanyFilter(chip.dataset.filter);
    });
  });
  applyCompanyFilter(document.querySelector('.chip.active')?.dataset.filter);

  // mobile nav
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click',()=>{
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position='absolute';
    navLinks.style.top='60px';
    navLinks.style.right='20px';
    navLinks.style.background='#fff';
    navLinks.style.padding='20px';
    navLinks.style.borderRadius='12px';
    navLinks.style.boxShadow='0 10px 30px rgba(0,0,0,.15)';
    navLinks.style.gap='16px';
  });

  // Fill each marquee so the moving logo loop never leaves an empty area.
  document.querySelectorAll('.adobe-marquee-track').forEach(track=>{
    const logoSet = track.querySelector('.adobe-marquee-set');
    if(!logoSet) return;
    const unit = logoSet.outerHTML;
    track.innerHTML = unit;
    while(track.scrollWidth < window.innerWidth * 1.2){
      track.insertAdjacentHTML('beforeend',unit);
    }
    track.insertAdjacentHTML('beforeend',track.innerHTML);
  });
