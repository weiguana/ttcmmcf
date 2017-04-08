// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lang-messages-en.js.
import { name as packageName } from "meteor/ttcmmcf:lang-en";

// Write your tests here!
// Here is an example.
Tinytest.add('lang-en - example', function (test) {
  test.equal(packageName, "lang-en");
});
