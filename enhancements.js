/* Progressive images: the embedded preview is visible while the chosen responsive image decodes. */
document.querySelectorAll('.progressive-media').forEach((picture) => {
  const image = picture.querySelector('img');
  const revealImage = async () => {
    if (!image.naturalWidth) return;
    try { await image.decode(); } catch { /* A decoded fallback can still be displayed. */ }
    if (image.naturalWidth) {
      picture.classList.remove('has-error');
      picture.classList.add('is-loaded');
    }
  };
  image.addEventListener('load', revealImage);
  image.addEventListener('error', () => picture.classList.add('has-error'));
  if (image.complete) {
    if (image.naturalWidth) revealImage();
    else picture.classList.add('has-error');
  }
});

/* Architecture builds as it enters the viewport; experience draws its own timeline. */
(() => {
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const nodes=[...document.querySelectorAll('.system-node')];
  const timeline=document.querySelector('.timeline');
  const map=document.querySelector('.system-map');
  const rows=[...document.querySelectorAll('.impact-row')];
  let frame=0;
  const clamp=value=>Math.min(1,Math.max(0,value));
  function update() {
    frame=0;
    const rect=map.getBoundingClientRect();
    const progress=motion.matches?1:clamp((innerHeight*.85-rect.top)/(rect.height+innerHeight*.2));
    map.style.setProperty('--system-progress',progress);
    nodes.forEach((node,index)=>node.classList.toggle('is-powered',progress>(index+.25)/nodes.length));
    const position=timeline.getBoundingClientRect();
    timeline.style.setProperty('--timeline-progress',motion.matches?1:clamp((innerHeight*.7-position.top)/position.height));
    rows.forEach(row=>{
      const bounds=row.getBoundingClientRect();
      row.style.setProperty('--signal-growth',motion.matches?1:clamp((innerHeight*.95-bounds.top)/(bounds.height*.8)));
    });
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule); motion.addEventListener('change',schedule); update();
  document.querySelectorAll('.skill-group, .case-copy, .timeline-item').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      if(motion.matches||event.pointerType!=='mouse')return;
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--light-x',`${event.clientX-rect.left}px`);
      card.style.setProperty('--light-y',`${event.clientY-rect.top}px`);
    });
  });
})();
/* Depth responds to the pointer without replacing the original mockup transforms. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.case-visual').forEach(scene => {
    let frame = 0, x = 0, y = 0;
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0;
      scene.style.setProperty('--depth-x', '0');
      scene.style.setProperty('--depth-y', '0');
      scene.classList.remove('is-exploring');
    };
    scene.addEventListener('pointermove', event => {
      if (preference.matches || !pointer.matches || event.pointerType !== 'mouse') return;
      const rect = scene.getBoundingClientRect();
      x = (event.clientX - rect.left) / rect.width - .5;
      y = (event.clientY - rect.top) / rect.height - .5;
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        scene.style.setProperty('--depth-x', x);
        scene.style.setProperty('--depth-y', y);
        scene.classList.add('is-exploring');
      });
    });
    scene.addEventListener('pointerleave', reset);
    preference.addEventListener('change', reset);
  });
  document.querySelectorAll('.circle-link, .contact-pill, .desktop-nav a').forEach(link => {
    // Move the contents, not the hit target, so the link never escapes the pointer.
    const contents = [...link.children];
    const reset = () => contents.forEach(child => child.style.translate = '0px 0px');
    link.addEventListener('pointermove', event => {
      if (preference.matches || !pointer.matches || event.pointerType !== 'mouse') return;
      const rect = link.getBoundingClientRect();
      const x = Math.max(-7, Math.min(7, (event.clientX - rect.left - rect.width / 2) * .12));
      const y = Math.max(-5, Math.min(5, (event.clientY - rect.top - rect.height / 2) * .12));
      contents.forEach(child => child.style.translate = `${x}px ${y}px`);
    });
    link.addEventListener('pointerleave', reset);
    link.addEventListener('blur', reset);
    preference.addEventListener('change', reset);
  });
  const scenes = document.querySelectorAll('.case, .contact, .about');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
  }, {threshold: .2});
  scenes.forEach(scene => observer.observe(scene));
})();

/* Impact numbers count up once their row is on screen; language toggles snap instead of re-animating. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function animate(el) {
    const target = parseInt(el.dataset.countTo, 10) || 0;
    const duration = 1100;
    const start = performance.now();
    function frame(time) {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    }
    requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: .6 });
  function bind() {
    document.querySelectorAll('.count-up').forEach(el => {
      const row = el.closest('.impact-row');
      if (motion.matches || (row && row.classList.contains('is-visible'))) {
        el.textContent = el.dataset.countTo;
      } else {
        io.observe(el);
      }
    });
  }
  bind();
  document.querySelector('.lang-toggle')?.addEventListener('click', bind);
})();

/* Hero tech tags decode into place once the loader clears, echoing the HUD styling of the orbit. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const rail = document.querySelector('.hero-rail');
  const spans = rail ? [...rail.querySelectorAll('span')] : [];
  if (!spans.length || motion.matches) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&';
  function scramble(span, delay) {
    const final = span.textContent;
    const duration = 480;
    let startTime = null;
    function frame(time) {
      if (startTime === null) startTime = time + delay;
      if (time < startTime) { requestAnimationFrame(frame); return; }
      const progress = Math.min(1, (time - startTime) / duration);
      const revealCount = Math.floor(progress * final.length);
      let output = '';
      for (let i = 0; i < final.length; i++) {
        output += i < revealCount ? final[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      span.textContent = output;
      if (progress < 1) requestAnimationFrame(frame);
      else span.textContent = final;
    }
    requestAnimationFrame(frame);
  }
  function run() {
    spans.forEach((span, index) => scramble(span, index * 80));
  }
  if (!document.documentElement.classList.contains('is-loading')) {
    run();
  } else {
    const loaderObserver = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('is-loading')) {
        loaderObserver.disconnect();
        run();
      }
    });
    loaderObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
})();
