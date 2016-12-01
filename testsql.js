var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./user.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (id varchar(15) PRIMARY KEY, pin varchar(10) NOT NULL)");
  // var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize
  db.run("insert into user_info VALUES('jiz3599','aaaa')");
  db.each("SELECT id AS id, pin FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.pin);
  });
});

db.close();

// Database#each(sql, [param, ...], [callback], [complete])

// Runs the SQL query with the specified parameters and calls the callback with for each result row. The function returns the Database object to allow for function chaining. The parameters are the same as the Database#run function, with the following differences:

// The signature of the callback is function(err, row) {}. If the result set succeeds but is empty, the callback is never called. In all other cases, the callback is called once for every retrieved row. The order of calls correspond exactly to the order of rows in the result set.

// After all row callbacks were called, the completion callback will be called if present. The first argument is an error object, and the second argument is the number of retrieved rows. If you specify only one function, it will be treated as row callback, if you specify two, the first (== second to last) function will be the row callback, the last function will be the completion callback.

// If you know that a query only returns a very limited number of rows, it might be more convenient to use Database#all to retrieve all rows at once.