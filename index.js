module.exports = function (workers, work) {
    var shares = {};
    var jobs = Object.keys(work);
    
    jobs.forEach(function (job) {
        for (var n = work[job]; n > 0; n--) {
            var id = mostIdle(workers, shares) || '_overflow';
            
            if (!shares[id]) shares[id] = {};
            shares[id][job] = (shares[id][job] || 0) + 1;
        }
    });
    
    return shares;
};

function mostIdle (workers, usage) {
    var load = Object.keys(workers).reduce(function (acc, id) {
        var procs = Object.keys(usage[id] || {})
            .reduce(function (sum, job) {
                return sum + ((usage[id] || {})[job] || 0);
            }, 0)
        ;
        var capacity = workers[id];
        var n = procs / capacity;
        acc[n] = id;
        
        return acc;
    }, {});
    
    var free = Object.keys(load)
        .filter(function (frac) { return frac < 1.0 })
        .sort()
    ;
    
    return free[0] && load[free[0]];
}
