const items = [
  {
    title: "Хорошие жены",
    author: "Луиза Мэй Олкотт",
    tags: ["зарубежная классическая литература"],
    price: 12.44,
    img: "./img/1.jpg",
  },
  {
    title: "Мартин Иден",
    author: "Джек Лондон",
    tags: ["золотая коллекция классической литературы"],
    price: 13.21,
    img: "./img/2.jpg",
  },
  {
    title: "Ночь в Лиссабоне",
    author: "Эрих Мария Ремарк",
    tags: ["золотая коллекция классической литературы"],
    price: 15.66,
    img: "./img/3.jpg",
  },
  {
    title: "Гордость и предубеждение",
    author: "Джейн Остен",
    tags: ["зарубежная классическая литература"],
    price: 39.18,
    img: "./img/4.jpg",
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    tags: ["зарубежная классическая литература"],
    price: 14.13,
    img: "./img/5.jpg",
  },
  {
    title: "Театр",
    author: "Уильям Сомерсет Моэм",
    tags: ["зарубежная классическая литература"],
    price: 15.66,
    img: "./img/6.jpg",
  },
  {
    title: "Война и мир",
    author: "Лев Толстой",
    tags: ["классическая русская литература"],
    price: 13.12,
    img: "./img/7.jpg",
  },
  {
    title: "Преступление и наказание",
    author: "Федор Достоевский",
    tags: ["классическая русская литература"],
    price: 14.18,
    img: "./img/8.jpg",
  },
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    tags: ["классическая русская литература"],
    price: 17.19,
    img: "./img/9.jpg",
  },
  {
    title: "Братья Карамазовы",
    author: "Федор Достоевский",
    tags: ["классическая русская литература"],
    price: 14.22,
    img: "./img/10.jpg",
  },
  {
    title: "Анна Каренина",
    author: "Лев Толстой",
    tags: ["классическая русская литература"],
    price: 15.18,
    img: "./img/11.jpg",
  },
  {
    title: "Герой нашего времени",
    author: "Михаил Лермонтов",
    tags: ["классическая русская литература"],
    price: 13.22,
    img: "./img/12.jpg",
  },
];

const container = document.getElementById('shop-items');
const template = document.getElementById('item-template');

function prepareShopItem(shopItem) {
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
    tagsContainer.appendChild(span);
  });

  return item;
}

function renderItems(items) {
  container.innerHTML = '';
  items.forEach((item) =>{
    const newItem = prepareShopItem(item);
    container.append(newItem);
  })
}

renderItems(items);

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const nothingFound = document.getElementById('nothing-found');

let currentItems = [...items];

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

    const filtered = items.filter(item => {
    const title = item.title.toLowerCase();
    const author = item.author.toLowerCase();
    const tags = item.tags.map(tag => tag.toLowerCase()).join(' ');
    return title.includes(query) || author.includes(query) || tags.includes(query);
  });

}
