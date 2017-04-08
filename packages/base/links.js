
import { Roles } from 'meteor/nicolaslopezj:roles';

ttcmmcf.links = {};
ttcmmcf.links = new Meteor.Collection(null); //ttcmmcf.links._collection = ttcmmcf.links; // Backwards compatibility

ttcmmcf.links.attachSchema(new SimpleSchema({
    index: {
        type: Number,
        optional: true
    },
    identifier: {
        type: String,
        regEx: /^[a-z0-9A-Z_-]+$/
    },
    parent: {
        type: String,
        optional: true,
        regEx: /^[a-z0-9A-Z_-]+$/
    },
    title: {
        type: String
    },
    routeName: {
        type: String,
        optional: true
    },
    activeRouteRegex: {
        type: String,
        optional: true
    },
    permission: {
        type: String,
        optional: true
    }
}));

ttcmmcf.links.add = function(options) {
    const self = this;
    Tracker.autorun(function() {
        if (_.isFunction(options.title)) {
            options.title = options.title();
        }
        self.upsert({ identifier: options.identifier }, { $set: options });
    });
};

ttcmmcf.links.get = function() {
    const links = this.find({ index: { $exists: true }, parent: { $exists: false } }, { sort: { index: 1 } }).fetch();
    return _.filter(links, function(link) {
        return !(link.permission && !Roles.userHasPermission(Meteor.userId(), link.permission));
    });
};

ttcmmcf.links.getLink = function(identifier) {
    return this.findOne({ identifier: identifier });
};

ttcmmcf.links.helpers({
    childs: function() {
        const links = ttcmmcf.links.find({ index: { $exists: true }, parent: this.identifier }, { sort: { index: 1 } }).fetch();
        return _.filter(links, function(link) {
            return !(link.permission && !Roles.userHasPermission(Meteor.userId(), link.permission));
        });
    }
});

Template.registerHelper('adminLinks', function() {
    return ttcmmcf.links.get();
});

Template.registerHelper('getAdminLink', function(identifier) {
    return ttcmmcf.links.getLink(identifier);
});
