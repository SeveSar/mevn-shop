# mevn-shop
Это современное веб-приложение для заказа пиццы, которое предоставляет удобный и гибкий интерфейс для выбора пиццы с различными дополнительными ингредиентами. Приложение ориентировано на обеспечение комфортного пользовательского опыта и обладает следующими ключевыми возможностями:

## Основные возможности:

### Выбор пиццы и ингредиентов:
+ Пользователи могут выбрать базовую пиццу и добавить или убрать дополнительные ингредиенты по своему вкусу.
+ Реализована динамическая цена в зависимости от выбранных ингредиентов.
  
### Фильтрация пицц:
+ Возможность фильтровать пиццы по категориям, таким как «мясные», «вегетарианские», «острые» и т.д.
  
### Корзина:
+ До авторизации корзина сохраняется локально с помощью LocalStorage.
+ После авторизации или регистрации корзина синхронизируется с сервером и сохраняется в базе данных.

### Аутентификация и авторизация:
+ Поддержка регистрации новых пользователей.
+ Авторизация реализована с использованием рефреш и аксесс токенов для обеспечения безопасности и обновления сессии.
+ Работа с корзиной сохраняется при переходе из неавторизованного в авторизованный статус.

### История заказов с пагинацией:
+ Авторизованные пользователи могут просматривать историю своих заказов.
+ Реализована пагинация для удобной навигации по большому количеству заказов.

### Технические особенности:
+ Используется LocalStorage для временного хранения данных корзины у неавторизованных пользователей.
+ Реализована клиент-серверная синхронизация данных.
+ Фильтрация пицц выполняется на основе заранее заданных критериев для удобного выбора.
+ История заказов сохраняется в базе данных и может быть просмотрена с разбивкой на страницы.
+ Структура проекта и код организованы таким образом, чтобы легко добавлять новые функциональности и улучшения.


### Модульная архитектура:
+ Проект построен по модульному принципу, что обеспечивает простоту сопровождения, тестирования и масштабирования приложения.
### Stack технологий:
+ Vue 3 , pinia, typescript
