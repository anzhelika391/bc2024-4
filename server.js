const http = require('http');
const fs = require('fs');
const path = require('path');
const superagent = require('superagent');

const CACHE_DIR = path.join(__dirname, 'cache');

// Створення директорії для кешу, якщо її немає
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
}

const server = http.createServer((req, res) => {
    const statusCode = req.url.slice(1); // Отримуємо статусний код з URL
    const cacheFilePath = path.join(CACHE_DIR, `${statusCode}.jpg`);

    // Перевірка наявності кешу
    if (fs.existsSync(cacheFilePath)) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        fs.createReadStream(cacheFilePath).pipe(res); // Відправка кешованого зображення
    } else {
        // Отримання зображення з https://http.cat
        superagent.get(`https://http.cat/${statusCode}`)
            .then(response => {
                fs.writeFileSync(cacheFilePath, response.body); // Збереження у кеш
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(response.body); // Відправка отриманого зображення
            })
            .catch(err => {
                res.writeHead(404);
                res.end('Not Found');
                console.error(err);
            });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Проксі-сервер запущено на http://localhost:${PORT}`);
});
