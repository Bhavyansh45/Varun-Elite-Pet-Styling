const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

const counterEls = document.querySelectorAll('[data-counter]');
const statsSection = document.querySelector('.hero-stats');
let counterStarted = false;

const animateCounters = () => {
  if (counterStarted) return;
  counterStarted = true;

  counterEls.forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    const decimal = String(target).includes('.');
    const duration = 1200;
    const steps = 40;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (decimal) {
        el.textContent = `${current.toFixed(1)}★`;
      } else if (target >= 1000) {
        el.textContent = `${Math.round(current).toLocaleString()}+`;
      } else {
        el.textContent = `${Math.round(current)}+`;
      }
    }, duration / steps);
  });
};

new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  },
  { threshold: 0.4 }
).observe(statsSection);
