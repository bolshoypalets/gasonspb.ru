/**
 * Ядро инициализации gazonspb.ru
 * Модульная структура, обработка ошибок, уважение к prefers-reduced-motion
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Проверка настроек доступности
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Инициализация Lenis (Smooth Scroll)
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
    });

    // Синхронизация Lenis и GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // 3. Регистрация плагинов GSAP
  gsap.registerPlugin(ScrollTrigger);

  // 4. Базовая анимация появления контента (пример)
  const fadeElements = document.querySelectorAll('[data-animate="fade-up"]');
  if (!prefersReducedMotion && fadeElements.length > 0) {
    gsap.fromTo(fadeElements, 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: fadeElements[0].parentElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // 5. Обработка ошибок (глобальная)
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Здесь можно добавить отправку ошибки в аналитику
  });
});

