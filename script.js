const items = [
  {
    title: "Хорошие жены",
    author: "Луиза Мэй Олкотт",
    tags: ["зарубежная классическая литература"],
    price: 12.44,
    img: "./img/1.jpg",
    rating: 4.8,
  },
  {
    title: "Мартин Иден",
    author: "Джек Лондон",
    tags: ["золотая коллекция классической литературы"],
    price: 13.21,
    img: "./img/2.jpg",
    rating: 4.0,
  },
  {
    title: "Ночь в Лиссабоне",
    author: "Эрих Мария Ремарк",
    tags: ["золотая коллекция классической литературы"],
    price: 15.66,
    img: "./img/3.jpg",
    rating: 3.5,
  },
  {
    title: "Гордость и предубеждение",
    author: "Джейн Остен",
    tags: ["зарубежная классическая литература"],
    price: 39.18,
    img: "./img/4.jpg",
    rating: 4.1,
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    tags: ["зарубежная классическая литература"],
    price: 14.13,
    img: "./img/5.jpg",
    rating: 4.3,
  },
  {
    title: "Театр",
    author: "Уильям Сомерсет Моэм",
    tags: ["зарубежная классическая литература"],
    price: 15.66,
    img: "./img/6.jpg",
    rating: 4.4,
  },
  {
    title: "Война и мир",
    author: "Лев Толстой",
    tags: ["золотая коллекция классической литературы"],
    price: 13.12,
    img: "./img/7.jpg",
    rating: 3.8,
  },
  {
    title: "Преступление и наказание",
    author: "Федор Достоевский",
    tags: ["золотая коллекция классической литературы"],
    price: 14.18,
    img: "./img/8.jpg",
    rating: 3.7,
  },
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    tags: ["золотая коллекция классической литературы"],
    price: 17.19,
    img: "./img/9.jpg",
    rating: 4.5,
  },
  {
    title: "Братья Карамазовы",
    author: "Федор Достоевский",
    tags: ["золотая коллекция классической литературы"],
    price: 14.22,
    img: "./img/10.jpg",
    rating: 3.2,
  },
  {
    title: "Анна Каренина",
    author: "Лев Толстой",
    tags: ["золотая коллекция классической литературы"],
    price: 15.18,
    img: "./img/11.jpg",
    rating: 4.9,
  },
  {
    title: "Герой нашего времени",
    author: "Михаил Лермонтов",
    tags: ["золотая коллекция классической литературы"],
    price: 13.22,
    img: "./img/12.jpg",
    rating: 3.1,
  },
];

const container = document.getElementById('shop-items');
const template = document.getElementById('item-template');

function prepareShopItem(shopItem, showRating = true) {
  const item = template.content.cloneNode(true);

  const h1 = item.querySelector('h1');
  h1.textContent = shopItem.title;

  const img = item.querySelector('img');
  img.src = shopItem.img;

  const p = item.querySelector('p');
  p.textContent = shopItem.author;

  const price = item.querySelector('.price');
  price.textContent = `${shopItem.price} BYN`;

  const tagsContainer = item.querySelector('.tags');
  shopItem.tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    span.classList.add('tag');
    
    const normalizedTag = tag.toLowerCase();
    
    if (normalizedTag === 'зарубежная классическая литература') {
      span.classList.add('tag-foreign-classic');
    }
    
    if (normalizedTag === 'золотая коллекция классической литературы') {
      span.classList.add('tag-golden-collection');
    }
    
    tagsContainer.appendChild(span);
  });

  const ratingContainer = item.querySelector('.rating');
  if (showRating) {
    const fullStar = Math.floor(shopItem.rating);
    const halfStar = shopItem.rating % 1 >= 0.5;

    for (let i = 0; i < fullStar; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      ratingContainer.appendChild(star);
    }

    if (halfStar) {
      const half = document.createElement('span');
      half.textContent = '☆';
      ratingContainer.appendChild(half);
    }

    const ratingValue = document.createElement('span');
    ratingValue.textContent = ` (${shopItem.rating.toFixed(1)})`;
    ratingValue.classList.add('rating-value');
    ratingContainer.appendChild(ratingValue);
  } else {
    ratingContainer.style.display = 'none';
  }

  return item;
}

function renderItems(itemsToRender, showRating = true) {
  container.innerHTML = '';
  itemsToRender.forEach((item) => {
    const newItem = prepareShopItem(item, showRating);
    container.append(newItem);
  });

  if (itemsToRender.length === 0) {
    nothingFound.style.display = 'block';
  } else {
    nothingFound.style.display = 'none';
  }
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const nothingFound = document.getElementById('nothing-found');
const sortSelect = document.getElementById('sort');

let currentItems = [...items];

function sortItems(itemsToSort, criterion) {
  const sorted = [...itemsToSort];
  switch (criterion) {
    case 'alphabet':
      sorted.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      break;
    
    case 'expensive':
      sorted.sort((a, b) => b.price - a.price);
      break;

    case 'cheap':
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sorted;
}

function performSearchAndSort() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query !== '') {
    sortSelect.value = 'alphabet';
  }
  
  const selectedSort = sortSelect.value;

  let showRating;
  if (selectedSort === 'rating') {
    showRating = true;
  } else {
    showRating = false;
  }

  if (query === '') {
    currentItems = [...items];
  } else {
    currentItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const title = item.title.toLowerCase();
      const author = item.author.toLowerCase();

      let hasMatchingTag = false;
      for (let j = 0; j < item.tags.length; j++) {
        const tag = item.tags[j].toLowerCase();
        if (tag.includes(query)) {
          hasMatchingTag = true;
          break;
        }
      }

      const matchesTitle = title.includes(query);
      const matchesAuthor = author.includes(query);

      if (matchesTitle || matchesAuthor || hasMatchingTag) {
        currentItems.push(item);
      }
    }
  }

  const sortedItems = sortItems(currentItems, selectedSort);
  renderItems(sortedItems, showRating);
}


searchBtn.addEventListener('click', performSearchAndSort);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    performSearchAndSort();
  }
});

sortSelect.addEventListener('change', performSearchAndSort);

const catalogLink = document.querySelector('a[href="#shop-items"]');

catalogLink.addEventListener('click', () => {
  searchInput.value = '';

  sortSelect.value = 'alphabet';

  nothingFound.style.display = 'none';

  currentItems = [...items];

  const sortedItems = sortItems(currentItems, 'alphabet');
  renderItems(sortedItems, false);
});

// Инициализация при загрузке
const initialSort = sortSelect.value;
let initialShowRating;

if (initialSort === 'rating') {
  initialShowRating = true;
} else {
  initialShowRating = false;
}

const sortedInitialItems = sortItems(items, initialSort);
renderItems(sortedInitialItems, initialShowRating);