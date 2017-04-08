
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Inject } from 'meteor/meteorhacks:inject-initial';

/**
 * Restarts the server after updates
 */
ttcmmcf.config.collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    // Timeout is necessary to no enter a infinit loop of restarts
    Meteor.setTimeout(function () {
        console.log('Updating ttcmmcf config');
        process.exit();
    }, 500);
});

/**
 * Creates one object in the config collection
 */
if (ttcmmcf.config.collection.find(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {}).count() === 0) {
    ttcmmcf.config.collection.insert(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {}, function(){
        console.log("ttcmmcf config initialized");
    });
}

/**
 * Publications of the config. Only for admins
 */
Meteor.publish('ttcmmcf_config', function() {
    if (!this.userId) {
        return [];
    }
    if (Roles.userHasPermission(this.userId, 'config.update')) {
        return ttcmmcf.config.collection.find(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {});
    }
});

/**
 * Get the config from the database only once
 */
ttcmmcf.config.object = ttcmmcf.config.collection.findOne(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {});

/**
 * Send the data to the client (only public values).
 * It uses the injection method (meteorhacks:inject-initial) not
 * the publish/subcribe, because this is not meant to be reactive
 * and the values should be on the client when it starts.
 */
Meteor.startup(function () {
    if (!ttcmmcf.config.getPublicFields()) {
        Inject.obj('ttcmmcf.config', {});
        return;
    }

    const fields = { _id: 0 };

    //we needs to add in private fields so we can tell our query to not return them
    //so that private fields won't be injected and remain secure
    _.each(ttcmmcf.config.getPrivateFields(), function(field) {
        fields[field] = 0;
    });

    const config = ttcmmcf.config.collection.findOne(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {}, { fields: fields });

    Inject.obj('ttcmmcf.config', config);
});
