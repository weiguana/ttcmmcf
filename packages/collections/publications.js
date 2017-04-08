
import { check } from 'meteor/check';

ttcmmcf.collections.onCreated(function() {
    const self = this;
    Meteor.publish('adminGetOne.' + this.name, function (_id) {
        check(_id, String);
        return self.find(_id);
    }, { is_auto: true });
});
