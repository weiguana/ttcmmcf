// Write your package code here!

import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'meteor/aldeed:autoform';

/**
 * Adds the option the set ttcmmcfAttribute on SimpleSchema
 */
SimpleSchema.extendOptions({
    ttcmmcfAttribute: Match.Optional(String),
    ttcmmcf: Match.Optional(Object)
});

/**
 * Definition of the attributes object
 */
ttcmmcf.attributes = {};

/**
 * Returns the schema for the attribute
 */
ttcmmcf.attribute = function(name, schema, options) {
    if (!_.has(ttcmmcf.attributes, name)) {
        throw 'The attribute "' + name + '" does not exist';
    }
    schema = schema || {};
    options = options || {};
    const attributeSchema = ttcmmcf.attributes[name].getSchema.call(this, options);
    const override = {
        ttcmmcfAttribute: name,
        autoform: {
            type: 'ttcmmcf.' + name
        }
    };
    return ttcmmcf.helpers.deepExtend(ttcmmcf.helpers.deepExtend(schema, attributeSchema), override);
};

/**
 * Returns proper tabular column for the attribute
 */
ttcmmcf.attributeColumn = function(name, key, title, options = {}) {
    check(options, {
        orderable: Match.Optional(Boolean)
    });
    const attributeDef = ttcmmcf.attributes[name];

    if (attributeDef.orderable && options.orderable !== false) {
        options.orderable = true;
    }

    return {
        data: key,
        title: title,
        defaultContent: '',
        orderable: !!options.orderable,
        render: function() {
            return '';
        },
        createdCell: function(cell, cellData, rowData) {
            const collection = rowData._collection();
            const schema = rowData._collection().simpleSchema()._schema[key];
            const data = {
                key: key,
                value: cellData,
                item: rowData,
                collection: collection,
                schema: schema,
            };
            const template = ReactiveTemplates.get('attributePreview.' + name);
            Blaze.renderWithData(Template[template], data, cell);
        }
    };
};

/**
 * Helper function to use arrays of attributes (Ex: array of images)
 */
ttcmmcf.arrayOfAttribute = function(name, schema, options) {
    const subSchema = new SimpleSchema({
        item: ttcmmcf.attribute(name, {
            autoform: {
                label: false
            }
        })
    });
    return ttcmmcf.helpers.deepExtend(schema, {
        type: [subSchema]
    });
};

/**
 * Creates a new attribute
 */
ttcmmcf.attributes.registerAttribute = function(name, attribute) {
    check(name, String);
    check(attribute, {
        template: Match.Optional(String),
        columnTemplate: Match.Optional(String),
        previewTemplate: Match.Optional(String),
        getSchema: Function,
        valueOut: Match.Optional(Function),
        valueIn: Match.Optional(Function),
        valueConverters: Match.Optional(Function),
        contextAdjust: Match.Optional(Function),
        orderable: Match.Optional(Boolean)
    });

    if (attribute.template) {
        ReactiveTemplates.request('attribute.' + name, attribute.template);
    }

    if (attribute.previewTemplate) {
        ReactiveTemplates.request('attributePreview.' + name, attribute.previewTemplate);
    }

    ttcmmcf.attributes[name] = attribute;

    if (Meteor.isClient && attribute.template) {
        Tracker.autorun(function () {
            AutoForm.addInputType('ttcmmcf.' + name, {
                template: ReactiveTemplates.get('attribute.' + name),
                valueIn: attribute.valueIn,
                valueOut: attribute.valueOut,
                valueConverters: attribute.valueConverters,
                contextAdjust: attribute.contextAdjust
            });
        });
    }
};

// Variables exported by this module can be imported by other packages and
// applications. See attributes-tests.js for an example of importing.
export const name = 'attributes';
