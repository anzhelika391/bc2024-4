const http = require('http');
const { Command } = require('commander');

const program = new Command();

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <directory>', 'шлях до директорії, яка міститиме закешовані файли');

program.parse(process.argv);

const options = program.opts();

// Перевірка обов'язкових параметрів
if (!options.host || !options.port || !options.cache) {
  console.error('Помилка: Всі параметри -h (host), -p (port) та -c (cache) є обовʼязковими.');
  process.exit(1); // Завершення програми з кодом помилки 1
}

console.log(`Адреса сервера: ${options.host}`);
console.log(`Порт сервера: ${options.port}`);
console.log(`Шлях до директорії кешу: ${options.cache}`);

// Запуск сервера
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

server.listen(options.port, options.host, () => {
  console.log(`Сервер запущено на http://${options.host}:${options.port}`);
});
