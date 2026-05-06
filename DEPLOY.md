# NFT Club - Инструкция по запуску

## 1. Деплой Frontend

### Вариант 1: Vercel (рекомендуется)
1. Зарегистрируйся на https://vercel.com
2. Создай новый проект, подключив этот GitHub репозиторий
3. Vercel автоматически определит настройки из vercel.json
4. Получишь URL вида: `nft-club.vercel.app`

### Вариант 2: Netlify
1. Зарегистрируйся на https://netlify.com
2. Подключи GitHub репозиторий
3. Настройки:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Получишь URL для Mini App

### Вариант 3: GitHub Pages
```bash
npm run build
# Загрузить содержимое dist/ в GitHub Pages
```

## 2. Создание Telegram бота

### Шаг 1: Создание бота
1. Открой @BotFather в Telegram
2. Отправь `/newbot`
3. Следуй инструкциям, получишь токен вида: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### Шаг 2: Настройка Menu Button
1. В @BotFather отправь `/mybots`
2. Выбери своего бота
3. Нажми "Menu Button" -> "Configure Menu Button"
4. Отправь URL твоего деплоя (например: `https://nft-club.vercel.app`)
5. Назови кнопку (например: "NFT Club")

### Шаг 3: Добавление бота
1. Открой бота по ссылке из @BotFather
2. Нажми кнопку "Start" или Menu Button

## 3. Настройка смарт-контракта

### Вариант 1: TON Web IDE (онлайн)
1. Открой https://tonwebide.com или https://tact-lang.github.io/web-ide
2. Загрузи файл `contracts/NFTCollection.tact`
3. Скомпилируй для сети TON Mainnet

### Вариант 2: Локальная компиляция
```bash
npm install -g @tact-lang/compiler
tact --version
tact contracts/NFTCollection.tact
```

### Деплой
1. Открой https://ton.app (или Tonkeeper -> Settings -> Deploy Contract)
2. Загрузи скомпилированный .pkg файл
3. Заплати комиссию за деплой (~0.5 TON)

### Обновление адреса
После деплоя обнови адрес контракта в `src/utils/contract.ts`

## 4. Подключение домена (опционально)

Для красивой ссылки:
1. Купи домен или используй бесплатный .vercel.app
2. SSL включен автоматически

## Тестирование

После деплоя:
1. Открой Mini App через Telegram бота
2. Подключи кошелёк (Tonkeeper, TON Wallet)
3. Проверь mint NFT
4. Проверь доступ к клубным привилегиям

## Структура URL для Telegram
```
t.me/{bot_username}/app
```
Или используй inline кнопку в боте.