// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by config.js.
import { name as packageName } from "meteor/ttcmmcf:config";

// Write your tests here!
// Here is an example.
Tinytest.add('config - example', function (test) {
  test.equal(packageName, "config");
});
