
Template.ttcmmcfBootstrapLayout.events({
    'click .ttcmmcf-bootstrap-admin.toggled': function() {
        if ($(window).width() < 768) {
            $(".ttcmmcf-bootstrap-admin").removeClass("toggled");
            $("html,body").removeClass("no-overflow");
        }
    },
    'click .menu-toggle': function () {
        $(".ttcmmcf-bootstrap-admin").toggleClass("toggled");
        $("html,body").toggleClass("no-overflow");
    }
});

Template.ttcmmcfBootstrapHeader.events({
    'click .logout': function() {
        // Meteor.logout();
        return AccountsTemplates.logout();
    }
});

Template.ttcmmcfBootstrapTabs.helpers({
    items: function () {
        return this;
    }
});

Template.ttcmmcfBootstrapTabs.events({
    'click a': function () {
        this.onClick();
    }
});
