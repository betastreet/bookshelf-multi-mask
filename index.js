const jsonMask = require('json-mask');

module.exports = (Bookshelf) => {
    Bookshelf.Model = Bookshelf.Model.extend({
        mask: function mask(scopes, options) {
            let scope = '';
            if (Array.isArray(scopes)) {
                scope = scopes.map((innerScope) => {
                    return (this.masks && this.masks[innerScope] ? this.masks[innerScope] : innerScope);
                }, this.constructor).join(',');
            } else {
                scope = (this.constructor.masks && this.constructor.masks[scopes] ? this.constructor.masks[scopes] : scope);
            }
            return jsonMask(this.toJSON(options), scope);
        },
    });

    Bookshelf.Collection = Bookshelf.Collection.extend({
        mask: function mask(scopes, options) {
            const masks = this.model.masks;
            let scope = '';
            if (Array.isArray(scopes)) {
                scope = scopes.map((innerScope) => {
                    return (masks && masks[innerScope] ? masks[innerScope] : innerScope);
                }).join(',');
            } else {
                scope = (this.model.masks && this.model.masks[scopes] ? this.model.masks[scopes] : scope);
            }
            return this.toJSON(options).map(model => jsonMask(model, scope));
        },
    });
};
