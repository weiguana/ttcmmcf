
import { _ } from 'meteor/underscore';
import { Options } from 'meteor/nicolaslopezj:options';
import { RouterLayer } from 'meteor/nicolaslopezj:router-layer';

/**
 * To set the secure routes
 */
Options.init('ensureSignedIn', []);

Tracker.autorun(function () {
    if (!Meteor.isClient) {
        return;
    }
    const routes = Options.get('ensureSignedIn');
    if (RouterLayer.router === 'iron-router') {
        RouterLayer.ironRouter.onBeforeAction(function() {
            if (RouterLayer.ironRouter.current && _.contains(routes, RouterLayer.ironRouter.current().route.getName()) && !Meteor.userId()) {
                let path = null;
                Tracker.nonreactive(function() {
                    path = RouterLayer.ironRouter.current().location.get().path
                });
                this.router.go('admin.login', {}, { replaceState: true, query: { ref: path } });
                return;
            }
            this.next();
        });
    } else if (RouterLayer.router === 'flow-router') {
        RouterLayer.flowRouter.triggers.enter([function(context, redirect) {
            Tracker.autorun(function() {
                if (_.contains(routes, RouterLayer.flowRouter.getRouteName()) && !Meteor.userId()) {
                    FlowRouter.withReplaceState(function() {
                        RouterLayer.flowRouter.go('admin.login', {}, { ref: FlowRouter.current().path });
                    });
                }
            });
        }]);
    }
});

ttcmmcf.authc.addProtectedRoute = function(routeName) {
    Options.arrayPush('ensureSignedIn', routeName);
};
