// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lang-zh.js.
import { name as packageName } from "meteor/ttcmmcf:lang-zh";

// Write your tests here!
// Here is an example.
Tinytest.add('lang-zh - example', function (test) {
  test.equal(packageName, "lang-zh");
});
