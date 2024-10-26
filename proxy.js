const http = require('http');
const fs = require('fs');
const path = require('path');
const superagent = require('superagent');

const PORT = 3000;
const CACHE_DIR = path.join(__dirname, 'cache');

// Переконайтеся, що каталог кешу існує
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
}

const server = http.createServer(async (req, res) => {
    const statusCode = req.url.slice(1); // Витягуємо статусний код з URL
    const cacheFilePath = path.join(CACHE_DIR, `${statusCode}.jpg`);

    try {
        if (fs.existsSync(cacheFilePath)) {
            // Якщо файл кешу існує, відправляємо його клієнту
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(cacheFilePath).pipe(res);
        } else {
            // Якщо файл кешу не існує, робимо запит до іншого сервера
            const response = await superagent.get(`https://http.cat/${statusCode}`);
            fs.writeFileSync(cacheFilePath, response.body); // Зберігаємо відповідь у кеш
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(response.body);
        }
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error: ' + error.message);
    }
});

server.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
