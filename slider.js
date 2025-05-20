export default function headerSlider({
    rootSelector = ".header-slider",
    interval = 5000,
} = {}){

// ───── DOM refs ────────────────────────────────
  const root   = document.querySelector(rootSelector);
  const imgs   = root.querySelectorAll("ul img");
  const prev   = root.querySelector(".header-control-previous");
  const next   = root.querySelector(".header-control-next");

  // ───── state helpers ───────────────────────────
  let idx = 0;
  const max = imgs.length;

    const show = i => {
        imgs.forEach(img => (img.style.display = "none"));
        imgs[i].style.display = "block";
    };

    const showNext = () => { 
        idx = (idx + 1) % max; 
        show(idx); 
    };
    
    const showPrev = () => { 
        idx = (idx - 1 + max) % max;
        show(idx);
    };

  // ───── autoplay (will die once user clicks) ────
  let timer = setInterval(showNext, interval);
  const stopAuto = () => {
    if (timer){ 
        clearInterval(timer); 
        timer = null; 
    }
  };

  // ───── user-control wiring ─────────────────────
  prev.addEventListener("click", e => {
    e.preventDefault();
    stopAuto();
    showPrev();
  });

  next.addEventListener("click", e => {
    e.preventDefault();
    stopAuto();
    showNext();
  });

  show(idx);
}