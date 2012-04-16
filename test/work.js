var test = require('tap').test;
var marx = require('../');

function totals (shares) {
    var totals = {};
    
    Object.keys(shares).forEach(function (worker) {
        Object.keys(shares[worker]).forEach(function (job) {
            totals[job] = (totals[job] || 0) + shares[worker][job];
        });
    });
    
    return totals;
}

test('simple workload', function (t) {
    var work = { web : 3, auth : 2, logger : 1 };
    var workers = { a : 2, b : 1, c : 5 };
    
    var shares = marx(workers, work);
    t.same(totals(shares), work);
    
    Object.keys(workers).forEach(function (worker) {
        var n = Object.keys(shares[worker]).reduce(function (sum, job) {
            return sum + shares[worker][job];
        }, 0);
        t.ok(n <= workers[worker]);
    });
    
    t.end();
});
