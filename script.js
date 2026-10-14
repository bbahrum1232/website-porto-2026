  // Filter project berdasarkan company.
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  const emptyProject = document.querySelector('.empty-project');
  const projectSearch = document.getElementById('projectSearch');
  let selectedCompany = document.querySelector('.chip.active')?.dataset.filter;
  let searchTerm = '';
  const applyCompanyFilter = company=>{
    selectedCompany = company;
    let visibleCards = 0;
    cards.forEach(card=>{
      const searchableText = `${card.textContent} ${card.querySelector('img')?.alt || ''} ${card.dataset.cat || ''}`.toLowerCase();
      const isVisible = card.dataset.company===company && searchableText.includes(searchTerm);
      card.classList.toggle('hidden',!isVisible);
      if(isVisible) visibleCards++; 
    });
    if(emptyProject){
      emptyProject.hidden = visibleCards > 0;
      emptyProject.textContent = searchTerm ? 'Tidak ada karya yang cocok dengan pencarian ini.' : 'Project untuk company ini belum ditambahkan.';
    }
  };
  projectSearch?.addEventListener('input',()=>{
    searchTerm = projectSearch.value.trim().toLowerCase();
    applyCompanyFilter(selectedCompany);
  });
  chips.forEach(chip=>{
    chip.addEventListener('click',()=>{
      chips.forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      applyCompanyFilter(chip.dataset.filter);
    });
  });
  applyCompanyFilter(selectedCompany);

  // mobile nav
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  burger?.addEventListener('click',()=>{
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    navLinks.classList.remove('open');
    burger?.setAttribute('aria-expanded','false');
  }));

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
