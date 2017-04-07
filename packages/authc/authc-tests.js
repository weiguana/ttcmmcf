// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by authc.js.
import { name as packageName } from "meteor/ttcmmcf:authc";

// Write your tests here!
// Here is an example.
Tinytest.add('authc - example', function (test) {
  test.equal(packageName, "authc");
});
