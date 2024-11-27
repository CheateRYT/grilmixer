Englist text below
---
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

# Grill-MixSer - Food Ordering Website

Welcome to Grill-MixSer! This is a commercial website for ordering food from the "Grill-MixSer" and "Farsh" stores located in the city of Taganrog. The site includes four main sections: cafe, food court, mourning, and banquet.

## About the Project
- **Frontend:**
  - **Vite**
  - **React**
  - **TypeScript**
  - **CSS Modules**
  - **Tailwind CSS**
  - **Material UI**
  - **Redux Toolkit 2.0**
- **Backend:**
  - **NestJS**
  - **Argon2**
  - **Socket.io**
  - **Prisma ORM**
- **Deploy:**
  - **Nginx**
  - **LetsEncrypt certBot for HTTPS**
  - **Ubuntu 20.11**
  - **VDS server**

## Key Features
- **Admin Panel**: A user-friendly interface for managing orders and users, creating promotions, products, additional ingredients, etc. Authorization in the admin panel is done via a login and password, which is encrypted. A token is also generated and checked for re-entering the admin panel without authorization.
- **Individual Cart**: A full-featured individual cart for each section, created using Redux and stored in local storage.
- **Integration with YooKassa Payment System**: Secure and convenient payment methods, with HTTP notifications connected for payment confirmations.
- **WebSockets (Socket.IO)**: Real-time implementation for updating order statuses and interacting with users, receiving notifications in the admin panel about new orders and payments.

## Usage
The website is intended for users who wish to order food from the "Grill-MixSer" and "Farsh" cafes. Users can select dishes, add them to their cart, and place orders through a user-friendly interface, choosing delivery methods and payment options.

## License
This project is commercial and intended for use in the "Grill-MixSer" and "Farsh" cafes. All rights reserved.

## Author
The project was developed by one person - me).
