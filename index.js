// index.js
const http = require('http'); // Імпортуємо модуль http
const { Command } = require('commander'); // Імпортуємо модуль commander
const program = new Command(); // Створюємо екземпляр Commander

// Визначаємо аргументи командного рядка
program
  .requiredOption('-h, --host <host>', 'адреса сервера') // Обовʼязковий параметр для адреси сервера
  .requiredOption('-p, --port <port>', 'порт сервера') // Обовʼязковий параметр для порту
  .requiredOption('-c, --cache <directory>', 'шлях до директорії, яка міститиме закешовані файли'); // Обовʼязковий параметр для шляху до кешу

program.parse(process.argv); // Парсимо аргументи командного рядка

const options = program.opts(); // Отримуємо значення опцій

// Виводимо інформацію про сервер
console.log(`Адреса сервера: ${options.host}`);
console.log(`Порт сервера: ${options.port}`);
console.log(`Шлях до директорії кешу: ${options.cache}`);

// Створюємо веб-сервер
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Встановлюємо статус 200 (OK)
  res.setHeader('Content-Type', 'text/plain'); // Встановлюємо заголовок Content-Type
  res.end('Веб-сервер працює!\n'); // Відправляємо відповідь
});

// Запускаємо сервер
server.listen(options.port, options.host, () => {
  console.log(`Сервер запущено на http://${options.host}:${options.port}`); // Інформуємо про запуск сервера
});
