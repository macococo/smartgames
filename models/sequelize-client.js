var url = require('url'),
  Sequelize = require('sequelize');

var urlParsed = url.parse(process.env.DATABASE_URL || 'tcp://localhost:5432/smartgames'),
  database = urlParsed.path.substring(1, urlParsed.path.length),
  user = '',
  password = '';

if (urlParsed.auth) {
  user = urlParsed.auth.split(':')[0];
  password = urlParsed.auth.split(':')[1];
}

console.log('[database connection setting]');
console.log('database: ' + database);
console.log('user: ' + user);
console.log('password: ' + password);
console.log('hostname: ' + urlParsed.hostname);
console.log('port: ' + urlParsed.port);

Sequelize.conn = new Sequelize(database, user, password, {host: urlParsed.hostname, port: urlParsed.port, dialect: 'postgres'});

module.exports = Sequelize;
