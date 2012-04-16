var marx = require('../');

var work = { web : 3, auth : 2, logger : 1 };
var workers = { a : 2, b : 1, c : 5 };

var shares = marx(workers, work);
console.dir(shares);
