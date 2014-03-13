var url = require('url'),
  Bookshelf = require('bookshelf');

var db = url.parse(process.env.DATABASE_URL || 'tcp://localhost:5432/smartgames');
var connection = {
  host: db.hostname,
  database: db.path.substring(1, db.path.length),
  charset: 'utf8'
};
if (db.auth) {
  connection.user = db.auth.split(':')[0];
  connection.password = db.auth.split(':')[1];
}

console.log('[database url]')
console.log(db);
console.log('[database connection setting]')
console.log(connection);

module.exports = Bookshelf.initialize({client: 'pg', connection: connection});
