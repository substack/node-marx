module.exports = function (workers, work) {
    var shares = {};
    var jobs = Object.keys(work).sort().sort(function (a, b) {
        return work[a] - work[b];
    });
    
    var total = jobs.reduce(function (sum, job) {
        return sum + work[job];
    }, 0);
    
    var pendingJobs = jobs.slice();
    var allocated = jobs.reduce(function (acc, job) {
        acc[job] = 0;
        return acc;
    }, {});
    
    for (var i = total - 1; i >= 0; i--) {
        var job = pendingJobs[i % pendingJobs.length];
        var id = mostIdle(workers, shares) || '_overflow';
        
        if (!shares[id]) shares[id] = {};
        shares[id][job] = (shares[id][job] || 0) + 1;
        
        allocated[job] ++;
        if (allocated[job] === work[job]) {
            var ix = pendingJobs.indexOf(job);
            pendingJobs.splice(ix, 1);
        }
    }
    
    return shares;
};

function mostIdle (workers, usage) {
    var load = Object.keys(workers).sort().reduce(function (acc, id) {
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
