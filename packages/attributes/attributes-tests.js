// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by attributes.js.
import { name as packageName } from "meteor/ttcmmcf:attributes";

// Write your tests here!
// Here is an example.
Tinytest.add('attributes - example', function (test) {
  test.equal(packageName, "attributes");
});
