var test = require('tap').test;
var marx = require('../');
var totals = require('./lib/totals');

test('overloaded inequality', function (t) {
    var work = { web : 20, auth : 5, logger : 1 };
    var workers = { a : 2, b : 1, c : 5 };
    
    var shares = marx(workers, work);
    t.same(totals(shares), work);
    
    Object.keys(workers).forEach(function (worker) {
        var n = Object.keys(shares[worker]).reduce(function (sum, job) {
            return sum + shares[worker][job];
        }, 0);
        t.ok(n <= workers[worker]);
    });
    
    t.same(Object.keys(shares._overflow).sort(), [ 'auth', 'web' ]);
    t.equal(
        Object.keys(shares._overflow).reduce(function (sum, job) {
            return sum + shares._overflow[job];
        }, 0),
        18
    );
    
    t.end();
});

test('overloaded equality', function (t) {
    var work = { web : 20, auth : 20, logger : 20 };
    var workers = { a : 5, b : 5, c : 5 };
    
    var shares = marx(workers, work);
    t.same(totals(shares), work);
    
    Object.keys(workers).forEach(function (worker) {
        var n = Object.keys(shares[worker]).reduce(function (sum, job) {
            return sum + shares[worker][job];
        }, 0);
        t.ok(n <= workers[worker]);
    });
    
    t.same(shares._overflow, { web : 15, auth : 15, logger : 15 });
    
    t.end();
});
