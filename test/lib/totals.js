module.exports = function (shares) {
    var totals = {};
    
    Object.keys(shares).forEach(function (worker) {
        Object.keys(shares[worker]).forEach(function (job) {
            totals[job] = (totals[job] || 0) + shares[worker][job];
        });
    });
    
    return totals;
}
