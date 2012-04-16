marx
====

Allocate worker roles among a collective of workers according to their
abilities.

example
=======

work.js

``` js
var marx = require('marx');

var work = { web : 3, auth : 2, logger : 1 };
var workers = { a : 2, b : 1, c : 5 };

var shares = marx(workers, work);
console.dir(shares);
```

output

```
$ node work.js
```

methods
=======

``` js
var marx = require('marx')
```

marx(workers, work)
-------------------

Return an object which how many of each type of work each worker should perform.
