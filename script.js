const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = -100, my = -100, rx = -100, ry = -100;

    // Mesma condição do CSS: fora dela o cursor customizado fica escondido
    if (matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx - 10 + 'px';
        cursor.style.top = my - 10 + 'px';
      });

      function animRing() {
        rx += (mx - rx - 20) * 0.12;
        ry += (my - ry - 20) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animRing);
      }
      animRing();

      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
      });
    }

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
