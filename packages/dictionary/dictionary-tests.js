// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by dictionary.js.
import { name as packageName } from "meteor/ttcmmcf:dictionary";

// Write your tests here!
// Here is an example.
Tinytest.add('dictionary - example', function (test) {
  test.equal(packageName, "dictionary");
});
