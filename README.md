# Practice_Plant_Backend

## Локальный запуск сервисов

1. **Установка зависимостей**

    Для этого нужно открыть терминал в корневой папке проекта
    и выполнить команду для установки зависимостей.
    ```shell
    npm install
    ```
2. **Запуск сервера NATS**
3. **Заполнение .env файла** 

    Пример заполненного .env файла: файл .example_env
4. **Настройка базы данных PostgreSQL**
    
    Нужно создать базу данных с таким же именем как в PG_DB_NAME в .env
    и с теми же данными для входа как в .env файле.
    
    Затем нужно выполнить скрипты schema:sync или 1) migration:generate, а затем 2) migration:run
    
    ```shell
    # синхронизация схемы бд с удалением старых данных
    npm run schema:sync
    
    # генерация и выполнение миграции схемы бд 
    # с сохранением старых данных 
    npm run migration:generate
    npm run migration:run
    
    ```
5. **Запуск нужных сервисов**

    Для этого используется следующая команда:
    ```shell
    nest start <service-name>
    ```
    *Прим.: аргумент "--watch" включит **горячий перезапуск**, т.е. изменения 
    будут применяться сразу же после сохранения файлов с кодом*

## Используемые модули
* @nestjs/common
* @nestjs/core
* @nestjs/microservices
* @nestjs/config
* @nestjs/jwt
* @nestjs/swagger
* dotenv
* nats
* class-validator
* class-transformer
* typeorm
* pg
* bcrypt
* multer
* express

