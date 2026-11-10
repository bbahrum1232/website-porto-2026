const currentUrl = new URL(window.location.href);
if(currentUrl.searchParams.get('utm_source')==='chatgpt.com'){
  currentUrl.searchParams.delete('utm_source');
  window.history.replaceState(window.history.state,'',`${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
}

  // Filter project berdasarkan company.
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  const emptyProject = document.querySelector('.empty-project');
  const projectSearch = document.getElementById('projectSearch');
  const portfolioVideos = document.querySelectorAll('.card video[data-src]');
  const loadPortfolioVideo = video=>{
    if(video.dataset.loaded) return;
    video.src = video.dataset.src;
    video.dataset.loaded = 'true';
    video.load();
  };
  document.querySelectorAll('.card .play').forEach(button=>{
    const video = button.closest('.card').querySelector('video');
    if(!video) return;
    const syncPlaybackState = ()=>{
      const playing = !video.paused && !video.ended;
      button.dataset.playing = String(playing);
      button.setAttribute('aria-label',`${playing ? 'Jeda' : 'Putar'} video`);
    };
    video.addEventListener('play',syncPlaybackState);
    video.addEventListener('playing',syncPlaybackState);
    video.addEventListener('pause',syncPlaybackState);
    video.addEventListener('ended',syncPlaybackState);
    syncPlaybackState();
    button.addEventListener('click',()=>{
      loadPortfolioVideo(video);
      video.controls = true;
      if(video.paused){
        video.play().catch(error=>{
          console.error('Video portofolio gagal diputar:',error);
        });
      }else{
        video.pause();
      }
    });
  });
  const videoObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const video = entry.target;
        if(entry.isIntersecting && !video.closest('.card').classList.contains('hidden')){
          loadPortfolioVideo(video);
        }else{
          video.pause();
        }
      });
    },{rootMargin:'120px 0px',threshold:0.01})
    : null;
  portfolioVideos.forEach(video=>videoObserver?.observe(video));
  let selectedCompany = document.querySelector('.chip.active')?.dataset.filter;
  let searchTerm = '';
  const applyCompanyFilter = company=>{
    selectedCompany = company;
    let visibleCards = 0;
    cards.forEach(card=>{
      const searchableText = `${card.textContent} ${card.querySelector('img')?.alt || ''} ${card.dataset.cat || ''}`.toLowerCase();
      const isVisible = card.dataset.company===company && searchableText.includes(searchTerm);
      card.classList.toggle('hidden',!isVisible);
      if(!isVisible) card.querySelector('video')?.pause();
      else if(!videoObserver){
        const video = card.querySelector('video[data-src]');
        if(video) loadPortfolioVideo(video);
      }
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
  document.querySelectorAll('.portfolio-category').forEach(category=>{
    category.addEventListener('click',()=>{
      const matchingChip = document.querySelector(`.chip[data-filter="${category.dataset.filter}"]`);
      matchingChip?.click();
      document.querySelector('#portfolio-gallery .chips')?.scrollIntoView({behavior:'smooth',block:'center'});
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
