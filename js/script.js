



let allProducts = [];

  function collectAllProducts() {
    allProducts = [];
    document.querySelectorAll('.tovar1').forEach(tovar => {
      let product = {
        element: tovar,
        txt: tovar.querySelector('.tovar_txt')?.innerText || '',
        price: tovar.querySelector('.tovar_price')?.innerText || '',
        img: tovar.querySelector('.tovar_img')?.src || '',
        button: tovar.querySelector('.tovar_btn'),
      };
      allProducts.push(product);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    collectAllProducts();
  });

let viewedProductIds = JSON.parse(localStorage.getItem('viewedProducts')) || [];

function addViewedProduct(id) {
  if (!viewedProductIds.includes(id)) {
    viewedProductIds.push(id);
    localStorage.setItem('viewedProducts', JSON.stringify(viewedProductIds));
  }
}

function searchAcrossAll() {
  
  const query = document.getElementById('searchInput').value.trim().toLowerCase();

  if (!query) {
    // Если поисковый запрос пустой, показываем сообщение или все товары по желанию
    document.getElementById('page11').style.display = 'block';
    document.getElementById('resultsContainer').innerHTML = '<p>Введите поисковый запрос</p>';
    return;
  }

  // Фильтруем товары по запросу и исключаем просмотренные
  const results = allProducts.filter(product => 
    product.txt.toLowerCase().includes(query) &&
    !viewedProductIds.includes(product.id)
  );

  document.getElementById('page11').style.display = 'block';

  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>Ничего не найдено</p>';
    return;
  }

  results.forEach(product => {
    const div = document.createElement('div');
    div.className = 'tovar1';

    div.innerHTML = `
      <img class="tovar_img" src="${product.img}" />
      <p class="tovar_txt">${product.txt}</p>
      <p class="tovar_price">${product.price}</p>
      <button type="button" class="tovar_btn"
          data-id="${product.id}"
          data-name="${product.name}"
          data-price="${product.price}"
          data-photo="${product.img}">В корзину (1)</button>
    `;
    resultsContainer.appendChild(div);

    div.querySelector('.tovar_btn').addEventListener('click', () => {
      addViewedProduct(product.id);
    });
  });
}

// очистка

function resetSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('page11').style.display = 'none';
  document.getElementById('pageMain').style.display = 'block';
  document.getElementById('resultsContainer').innerHTML = '';
}
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('tovar_btn')) {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    const photo = e.target.dataset.photo;

    // Логика добавления товара в корзину
    if (cartItems[id]) {
      cartItems[id].count++;
    } else {
      cartItems[id] = { name, price, photo, count: 1 };
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateButtons();
  }
});





// Обработка кликов по вкладкам или навигации
document.querySelectorAll('.page-link, .header-basket, .header-catalog').forEach(link => {
  link.addEventListener('click', function() {
    // Очищаем поиск и показываем все товары
    currentSearchTerm = '';

    // Удаляем результаты поиска
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (resultsContainer) resultsContainer.remove();

    // Удаляем сообщение о "ничего не найдено"
    const oldMsg = document.getElementById('noResultsMessage');
    if (oldMsg) oldMsg.remove();

    // Показываем все товары
    document.querySelectorAll('.tovar1').forEach(tovar => {
      tovar.style.display = 'block';
    });
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const pages = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4'),
    page5: document.getElementById('page5'),
    page6: document.getElementById('page6'),
    page7: document.getElementById('page7'),
    page8: document.getElementById('page8'),
    page9: document.getElementById('page9'),
    page10: document.getElementById('page10'),
    page11: document.getElementById('page11')
  };

  const allPages = Object.values(pages);

  function hideAllPages() {
    Object.values(pages).forEach(p => {
      p.style.display = 'none';
    });
  }

  // Показываем главную страницу по умолчанию
  hideAllPages();
  pages.page1.style.display = 'block';

  // Функция скрытия поиска и корзины
  function hideSearchAndCart() {
    const searchBlock = document.getElementById('search');
    if (searchBlock) {
      searchBlock.style.display = 'none';
    }
  }

  // Функция отображения поиска и корзины
  function showSearchAndCart() {
    const searchBlock = document.getElementById('search');
    if (searchBlock) {
      searchBlock.style.display = '';
    }
  }



  // Обновляем отображение при смене страницы
  function showPage(section) {
    hideAllPages();
    switch (section) {
      case 'section-detskiy':
        pages.page2.style.display = 'block';
        break;
      case 'section-shool':
        pages.page3.style.display = 'block';
        break;
      case 'section-tvorch':
        pages.page4.style.display = 'block';
        break;
      case 'section-office':
        pages.page5.style.display = 'block';
        break;
      case 'section-doma':
        pages.page6.style.display = 'block';
        break;
      case 'section-oplata':
        pages.page7.style.display = 'block';
        break;
      case 'section-time':
        pages.page8.style.display = 'block';
        break;
      case 'section-contacts':
        pages.page9.style.display = 'block';
        break;
      case 'section-korzina':
        pages.page10.style.display = 'block';
        break;
      case 'section-poisk':
        pages.page11.style.display = 'block';
        break;
      default:
        pages.page1.style.display = 'block';
    }
  }
  showPage('section-home');

  // Обработчики навигации
  document.querySelectorAll('.bottom_nav_item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      window.scrollTo(0, 0);
      showPage(section);
      updateButtonVisibility(section);
      // при просмотре страниц через нижнюю навигацию — показываем поиск и корзину
      showSearchAndCart();
    });
  });

  // Обработчики верхней навигации
  document.querySelectorAll('.header_nav p').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      window.scrollTo(0, 0);
      showPage(section);
      updateButtonVisibility(section);
      // при просмотре страниц через верхнюю навигацию — скрываем поиск и корзину
      if (section !== 'section-home') { 
        hideSearchAndCart();
      }
    });
  });


  // Обработчик для кнопки "На главную"
  document.querySelector('.nav_1').addEventListener('click', () => {
    window.scrollTo(0, 0);
    hideAllPages();
    pages.page1.style.display = 'block';
    showSearchAndCart(); // при возврате на главную показываем поиск и корзину
  });


  //обработчик корины
  document.querySelectorAll('.cart').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      window.scrollTo(0, 0);
      showPage(section);
      // при просмотре страниц через нижнюю навигацию — показываем поиск и корзину
      showSearchAndCart();
      updateFooterMargin();
    });
  });

  // На загрузке страницы — показываем правильно
  window.addEventListener('load', () => {
      const currentDisplay = Object.values(pages).some(p => p.style.display === 'block');
      if (!currentDisplay || pages.page1.style.display !== 'block') {
        hideSearchAndCart();
      } else {
        showSearchAndCart();
      }
      const currentSection = 'section1';
      showPage(currentSection);
      updateButtonVisibility(currentSection);
    });

    // Функция поиска
    function searchAcrossAll() {
  const query = document.getElementById('searchInput').value.trim();
  const searchTextDiv = document.getElementById('searchResultText');
  const resultsContainer = document.getElementById('resultsContainer');
  

  // Очищаем предыдущие результаты и сообщение
  resultsContainer.innerHTML = '';
  searchTextDiv.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Введите что-то для поиска</p>';
    window.scrollTo(0, 0);
    Object.values(pages).forEach(p => p.style.display = 'none');
    document.getElementById('page11').style.display = 'block';
    return;
  }

  // Устанавливаем текст с запросом
  searchTextDiv.innerHTML = `Результаты поиска по "${query}"`;

  const items = document.querySelectorAll('.tovar1');
  let found = false;

  items.forEach(item => {
    const starElem = item.querySelector('.tovar_star');
    if (starElem) {
      const starText = starElem.textContent.trim();
      if (starText === '🎉' || starText === '⭐') {
        return;
      }
    }

    const textElement = item.querySelector('.tovar_txt');
    if (textElement) {
      const text = textElement.textContent.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        const clone = item.cloneNode(true);
        resultsContainer.appendChild(clone);
        found = true;
      }
    }
  });

  if (!found) {
    resultsContainer.innerHTML = '<p>Результаты не найдены</p>';
  }

  window.scrollTo(0, 0);
  Object.values(pages).forEach(p => p.style.display = 'none');
  document.getElementById('page11').style.display = 'block';
}

    window.searchAcrossAll = searchAcrossAll;

  });


window.addEventListener('load', () => {
  document.body.style.overflow = 'auto';
  window.scrollTo(0, 0);
});

function updateButtonVisibility(section) {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  // Если раздел контакты или оплата, скрываем кнопку
  if (section === 'section-contacts' || section === 'section-time' || section === 'section-oplata') {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'block';
  }
}
// Обработчик для навигационных пунктов
document.querySelectorAll('.header_nav p').forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;
    window.scrollTo(0, 0);
    showPage(section);
    // Обновляем видимость кнопки
    updateButtonVisibility(section);
    // при просмотре страниц через верхнюю навигацию — скрываем поиск и корзину
    if (section !== 'section-btn') {
      hideSearchAndCart();
    }
  });
});




let cartItems = {};

// Инициализация
function initialize() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  } else {
    cartItems = {};
  }
  updateButtons();
  showCart();
  updateFooterMargin()
}


// Обновление кнопок "В корзине"
function updateButtons() {
  document.querySelectorAll('.tovar_btn').forEach(btn => {
    const id = btn.dataset.id;
    if (cartItems[id]) {
      const count = cartItems[id].count;
      btn.textContent = `В корзине (${count})`;
      btn.classList.add('added');
    } else {
      btn.textContent = `В корзину (1)`;
      btn.classList.remove('added');
    }
  });
  updateFooterMargin();
}

// Обработчик для кнопок "В корзину"
document.getElementById('resultsContainer').addEventListener('click', (event) => {
  if (event.target.classList.contains('tovar_btn')) {
    const btn = event.target;
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const photo = btn.dataset.photo;

    if (cartItems[id]) {
      cartItems[id].count++;
    } else {
      cartItems[id] = { name, price, photo, count: 1 };
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  updateFooterMargin();
});

// Обработчик для кнопки "Показать корзину"
const cartBtn = document.querySelector('.cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    showCart();
    document.getElementById('page10').style.display = 'block';
  });
  updateFooterMargin()
}

function showCart() {
  const container = document.getElementById('cart-container');
  if (!container) return;


  container.innerHTML = '';

  const items = Object.entries(cartItems);

  if (items.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Ваша корзина пуста</p>';
    return;
  }

  // Вывод товаров
  for (let i = items.length - 1; i >= 0; i--) {
    const [key, item] = items[i];

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <div class="image-container">
        <img src="${item.photo}" class="cart-item-image" />
        <button class="delete-btn" data-key="${key}">
          <img src="png/musorka.gif" alt="Удалить" />
        </button>
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.name}</h3>
        <div class="quantity-controls">
          <button class="decrease" data-key="${key}">-</button>
          <span class="quantity" id="quantity-${key}">${item.count}</span>
          <button class="increase" data-key="${key}">+</button>
        </div>
        <p class="cart-item-price">${item.price} ₽</p>
      </div>
    `;

    // Обработчики для кнопок
    div.querySelector('.decrease').addEventListener('click', () => {
      if (cartItems[key].count > 1) {
        cartItems[key].count--;
      } else {
        delete cartItems[key];
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      showCart();
      updateButtons();
      updateFooterMargin();
    });

    div.querySelector('.increase').addEventListener('click', () => {
      cartItems[key].count++;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      showCart();
      updateButtons();
      updateFooterMargin();
    });

    div.querySelector('.delete-btn').addEventListener('click', () => {
      delete cartItems[key];
      updateFooterMargin();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      showCart();
      updateButtons();
      
    });

    container.appendChild(div);
  }

  // Расчет итоговой стоимости
  const total = Object.values(cartItems).reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  // Создаем блок с итоговой стоимостью
  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total';

  totalDiv.innerHTML = `
    <div class="oformit_zakaz">
      <div class="zakaz_txt">
        <p class="zakaz_title">Итоговая стоимость</p>
        <p class="total-amount">${total.toFixed(2)} ₽</p>
      </div>
      <button class="order-btn">Оформить заказ</button>
    </div>
  `;

  container.appendChild(totalDiv);

  // Блок с рекламой
  const adDiv = document.createElement('div');
  adDiv.className = 'cart-ad';

  adDiv.innerHTML = `
    <div class="reklama">
      <div class="reklama_img">
        <img class="reklama_0" src="png/реклама 0+.png" alt="м" />
        <img class="reklama_tochki" src="png/три точки.png" alt="м" />
        <p class="reklama_title">Канцелярия по суперценам!</p>
        <img class="reklama_shtuki" src="png/рекламные штуки.png" alt="м" />
        <img class="reklama_podarok3d" src="png/подарок.png" alt="м" />
      </div>
      <div class="reklama_text">
        <p>Заказывайте онлайн — удобно и быстро. Выбирайте и заказывайте, мы доставим прямо к вам!</p>
        <div class="vertical-line"></div>
        <button class="buy-online-btn">Купить сейчас</button>
      </div>
      
    </div>
  `;

  container.appendChild(adDiv);
  checkOverlap();
  updateFooterMargin();
}
// Вызов initialize при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initialize();
  updateFooterMargin();
});



// Вызов функции initialize при загрузке и при изменениях хеша
window.addEventListener('load', initialize);
window.addEventListener('hashchange', () => {
  initialize();
  updateFooterMargin()
});


// Обработчик клика по кнопке

function smoothScrollToTop() {
  const duration = 600; // продолжительность анимации в миллисекундах
  const start = window.scrollY;
  const startTime = performance.now();

  function scroll() {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // кубическая easing-функция
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

document.getElementById('scrollTopBtn').addEventListener('click', smoothScrollToTop);

/* футер чтоб не налезал*/
function updateFooterMargin() {
  const footer = document.getElementById('footer');
  const itemCount = Object.keys(cartItems).length;

  if (itemCount === 1) {
    footer.style.marginTop = '15%'; // или любой другой стиль
  } else {
    footer.style.marginTop = ''; // сбросить стиль, если нужно
  }
};
window.addEventListener('load', checkOverlap);