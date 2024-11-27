# Гриль-МикСер - Сайт для заказа еды

Добро пожаловать в Гриль-МикСер! Это коммерческий сайт для заказа еды из магазинов "Гриль-МикСер" и "Фарш", расположенных в городе Таганрог. Сайт включает в себя четыре основных раздела: кафе, фуд-корт, поминки и банкет.

## О проекте

- **Frontend:**

  - **Vite**
  - **React**
  - **TypeScript**
  - **CSS Modules**
  - **Tailwind CSS**
  - **Material UI**
  - **Redux Toolkit 2.0**

- **Backend:**

  - **NestJS**:
  - **Argon2**:
  - **Socket.io**:
  - **Prisma ORM**:

- **Deploy:**
  - **Nginx**:
  - **LetsEncypt certBot for HTTPS**:
  - **Ubuntu 20.11**:
  - **VDS server**:

## Основные функции

- **Админ панель**: Удобный интерфейс для управления заказами и пользователями, создание акций, продуктов, дополнительных ингредиентов и т.д. Авторизация в админ панели путем логина и пароля, который зашифрован. Так же генерируется токен и проверяется для повторного захода в админ панель без авторизации.
- **Индивидуальная корзина**: Полноценная индивидуальная корзина для каждого раздела, созданая через redux и сохраняется в localstorage.
- **Интеграция с платежной системой YooKassa**: Безопасные и удобные способы оплаты, подключены http уведомления для подтверждения платежей.
- **WebSockets (Socket.IO)**: Реализация реального времени для обновления статуса заказов и взаимодействия с пользователями, получения уведомлений в админ панели о новых заказах и об оплатах.

## Использование

Сайт предназначен для пользователей, желающих заказать еду из кафе "Гриль-МикСер" и "Фарш". Пользователи могут выбирать блюда, добавлять их в корзину и оформлять заказы через удобный интерфейс, выбирать способы доставки и способы оплаты.

## Лицензия

Этот проект является коммерческим и предназначен для использования в кафе "Гриль-МикСер" и "Фарш". Все права защищены.

## Автор

Проект разработан одним человеком - мной).

---
