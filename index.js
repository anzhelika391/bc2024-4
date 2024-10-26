const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <directory>', 'шлях до директорії, яка міститиме закешовані файли');

program.parse(process.argv);

const options = program.opts();

console.log(`Адреса сервера: ${options.host}`);
console.log(`Порт сервера: ${options.port}`);
console.log(`Шлях до директорії кешу: ${options.cache}`);
