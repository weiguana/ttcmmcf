// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by admin-template.js.
import { name as packageName } from "meteor/ttcmmcf:admin-template";

// Write your tests here!
// Here is an example.
Tinytest.add('admin-template - example', function (test) {
  test.equal(packageName, "admin-template");
});
