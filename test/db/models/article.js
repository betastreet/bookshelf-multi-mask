'use strict'

let db = require('../')

module.exports = db.bookshelf.model('Article', {
    tableName: 'articles',

    user: function () {
        return this.belongsToOne('User');
    },
})
