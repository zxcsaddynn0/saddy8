# Client - React приложение

Клиентская часть интернет-магазина садовых товаров.

## Технологический стек

- **React 18.3.1**
- **Redux Toolkit 2.2.7**
- **React Router DOM 6.28.0**
- **React Hook Form 7.53.0**
- **React Redux 9.1.3**

## Структура папок

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── PrimaryButton/   # Универсальная кнопка
│   ├── HeroSection/    # Главный баннер
│   ├── Logo/            # Логотип
│   ├── BasketIcon/      # Иконка корзины
│   ├── SectionsSlider/ # Карусель категорий
│   ├── SectionCard/    # Карточка категории
│   ├── AppLayout/      # Общий layout
│   ├── NavigationMenu/  # Навигационное меню
│   ├── GoodsFilter/    # Фильтр товаров
│   ├── GoodCard/       # Карточка товара
│   ├── DiscountsSlider/# Карусель акций
│   ├── DiscountForm/   # Форма заявки на купон
│   ├── AmountSelector/ # Селектор количества
│   ├── Footer/         # Подвал сайта
│   └── Header/          # Шапка сайта
├── pages/               # Страницы приложения
│   ├── HomePage/        # Главная страница
│   ├── SectionsListPage/# Список категорий
│   ├── SectionGoodsPage/# Товары категории
│   ├── GoodsCatalogPage/# Каталог товаров
│   ├── GoodDetailsPage/ # Детали товара
│   ├── DiscountsPage/  # Страница акций
│   ├── BasketPage/      # Корзина
│   └── NotFoundPage/    # Страница 404
├── store/               # Redux store
│   ├── slices/          # Redux slices
│   │   ├── basketSlice.js
│   │   ├── sectionsSlice.js
│   │   └── goodsSlice.js
│   └── index.js         # Конфигурация store
└── assets/              # Медиа файлы
    └── images/          # Изображения
```

## Компоненты

### PrimaryButton

Универсальная кнопка с вариантами:

- `addToBasket` - кнопка добавления в корзину
- `hero` - кнопка для баннеров

### GoodsFilter

Фильтр и сортировка товаров:

- Фильтрация по цене (от/до)
- Фильтрация по наличию скидки
- Сортировка (по умолчанию, новинки, цена)

### Карусели

- **SectionsSlider** - горизонтальная прокрутка категорий
- **DiscountsSlider** - горизонтальная прокрутка товаров со скидкой
- Поддержка drag-and-drop для прокрутки

## Страницы

### HomePage

Главная страница с:

- Баннером с призывом к действию
- Каруселью категорий
- Формой заявки на скидочный купон
- Каруселью товаров со скидкой

### BasketPage

Страница корзины с:

- Списком товаров в корзине
- Возможностью изменения количества
- Формой оформления заказа
- Модальным окном подтверждения заказа

## Redux Store

### goodsSlice

- `loadAllGoods` - загрузка всех товаров
- `loadGoodById` - загрузка товара по ID
- `clearSelectedGood` - сброс текущего товара

### sectionsSlice

- `loadAllSections` - загрузка всех категорий
- `loadSectionGoods` - загрузка товаров категории
- `clearSectionData` - сброс данных категории

### basketSlice

- `addToBasket` - добавление в корзину
- `removeFromBasket` - удаление из корзины
- `changeQuantity` - обновление количества
- `emptyBasket` - очистка корзины
- `getBasketItemsCount` - селектор количества товаров

## Маршруты

- `/` - главная страница (HomePage)
- `/sections` - список всех категорий (SectionsListPage)
- `/sections/:id` - товары выбранной категории (SectionGoodsPage)
- `/goods` - каталог всех товаров (GoodsCatalogPage)
- `/goods/:id` - детальная информация о товаре (GoodDetailsPage)
- `/discounts` - страница товаров со скидкой (DiscountsPage)
- `/basket` - страница корзины (BasketPage)
- `*` - страница 404 (NotFoundPage)

## Стилизация

- CSS Modules для изоляции стилей
- Глобальные переменные в `index.css`
- Адаптивный дизайн
- Модульная структура стилей

## Запуск

```bash
npm install
npm start
```

Приложение запустится на http://localhost:3000

## Прокси

Все API запросы проксируются на бэкенд (localhost:3333) через настройку в `package.json`:

```json
"proxy": "http://localhost:3333"
```
