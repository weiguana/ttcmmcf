
Template.ttcmmcfBootstrapDictionaryUpdate.helpers({
    getDataForTabs: function () {
        var categories = ttcmmcf.dictionary.availableCategories();
        return categories.map(function (category) {
            return {
                title: category,
                onClick: function() {
                    Session.set('dictionaryUpdateCurrentCategory', category);
                },
                class: function() {
                    return Session.get('dictionaryUpdateCurrentCategory') === category ? 'btn-default disabled': 'btn-primary';
                }
            }
        });
    }
});