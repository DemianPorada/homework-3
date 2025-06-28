
// ===== Ліниве завантаження зображень через IntersectionObserver =====

// Знаходимо всі зображення з data-src
const images = document.querySelectorAll('img[data-src]');

// Створюємо IntersectionObserver
let observer;

// Функція для заміни data-src на src
const loadImage = (img) => {
  img.src = img.dataset.src;
  img.onload = () => {
    img.classList.add('loaded'); // додаємо анімацію прозорості
  };
};

// Функція для ініціалізації Observer
const initLazyLoading = () => {
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img); // після завантаження припиняємо спостереження
      }
    });
  }, {
    rootMargin: "100px", // заздалегідь завантажуємо за 100px до появи
    threshold: 0.1
  });

  images.forEach(img => observer.observe(img));
};

// Завантаження лише після натискання кнопки
document.getElementById('load-images-btn').addEventListener('click', () => {
  initLazyLoading();
  document.getElementById('load-images-btn').disabled = true;
});

// Додатково — для перевірки: log в консоль
console.log("Ліниве завантаження готове до активації.");

/*
 Поліпшення:
 1. Можна додати підтримку WebP-формату через data-srcset.
 2. Можна додати заглушки-картинки (loading spinner або SVG).
 3. Для дуже великих сайтів - оптимізувати через dynamic import.
 4. Перевірено: при скролі зображення не вантажаться, поки не активовано кнопку.
*/
