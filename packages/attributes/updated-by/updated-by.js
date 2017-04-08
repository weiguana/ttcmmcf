
import { check } from 'meteor/check';
import { ReactiveTemplates } from 'meteor/nicolaslopezj:reactive-templates';

ttcmmcf.attributes.registerAttribute('updatedBy', {
    previewTemplate: 'updatedByPreview',
    getSchema: function(options) {
        return {
            type: String,
            index: 1,
            autoform: {
                omit: true
            },
            autoValue: function() {
                if (this.isUpdate || this.isInsert) {
                    return this.userId;
                } else if (this.isUpsert) {
                    return {$setOnInsert: this.userId};
                } else {
                    this.unset();
                }
            }
        };
    }
});

if (Meteor.isServer) {
    Meteor.publish('userProfileForUpdatedByAttributeColumn', function(userId) {
        check(userId, String);
        return Meteor.users.find({ _id: userId }, { fields: { profile: 1 } });
    });
}

if (Meteor.isClient) {
    ReactiveTemplates.onRendered('attributePreview.updatedBy', function() {
        this.subscribe('userProfileForUpdatedByAttributeColumn', this.data.value)
    });
    ReactiveTemplates.helpers('attributePreview.updatedBy', {
        name: function() {
            const user = Meteor.users.findOne(this.value);
            return user && user.profile.name;
        }
    });
}
