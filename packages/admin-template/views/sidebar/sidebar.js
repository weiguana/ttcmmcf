
Template.ttcmmcfBootstrapSidebar.onRendered(function() {
    this.autorun(function() {
        const depend = ttcmmcf.links._collection.find().fetch();
        $('.ttcmmcf-links a[data-toggle="collapse"]').collapse()
    })
});
