# Force.com CLI in Node.js

A small little CLI you can use for prototype/testing. There are a couple of sample commands to get you started but feel free to make enhancements. It's also [Promise-based](https://github.com/kriskowal/q) which should make life easier when dealing with Force.com APIs.

To get started from terminal, clone this repo and run `npm install` to install the dependencies. You may also have to run `chmod 777 ./bin/cli` to make the file executable on OS X. 

You'll then need to enter your connection parameters into `config.js` for Force.com. To test you connection, simply run `bin/cli login` which should return a connection object.

To see the available commands run `bin/cli --help`.