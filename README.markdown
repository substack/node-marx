marx
====

Allocate worker roles among a collective of workers according to their
abilities.

example
=======

``` js
var marx = require('marx');

var work = { web : 3, auth : 2, logger : 1 };
var workers = { a : 2, b : 1, c : 5 };

var shares = marx(workers, work);
console.dir(shares);
```

output:

```
{ c: { web: 1, auth: 2 },
  b: { web: 1 },
  a: { web: 1, logger: 1 } }
```

methods
=======

``` js
var marx = require('marx')
```

marx(workers, work)
-------------------

Take an object mapping worker names to role capacity and an object mapping
work names to a number of instances.

Return an object mapping worker names to objects mapping how many of each type
of work each worker should perform.

If the workers don't have enough capacity to do the work, the extra work will
appear in an `'_overflow'` key in the result.

install
=======

With [npm](http://npmjs.org) do:

```
npm install marx
```

license
=======

MIT
