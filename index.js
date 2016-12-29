'use strict'

const jsonMask = require('json-mask');

function scopesToScopeString(scopes, masks) {
    let scope = '';
    if (Array.isArray(scopes)) {
        scope = scopes.map((innerScope) => {
            return (masks && masks[innerScope] ? masks[innerScope] : innerScope);
        }).join(',');
    } else {
        scope = (masks && masks[scopes] ? masks[scopes] : scopes);
    }
    return scope;
}

module.exports = (Bookshelf) => {
    Bookshelf.Model = Bookshelf.Model.extend({
        mask: function mask(scopes, options) {
            const masks = this.constructor.masks;
            if (!masks) return this.toJSON(options);
            const scope = scopesToScopeString(scopes, masks);
            return jsonMask(this.toJSON(options), scope);
        }
    });

    Bookshelf.Collection = Bookshelf.Collection.extend({
        mask: function mask(scopes, options) {
            const masks = this.model.masks;
            if (!masks) return this.toJSON(options);
            const scope = scopesToScopeString(scopes, masks);
            return this.toJSON(options).map(model => jsonMask(model, scope));
        }
    });
};
