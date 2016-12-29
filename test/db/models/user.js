'use strict'

let db = require('../')

module.exports = db.bookshelf.model('User', {
    tableName: 'users',

    articles: function () {
        return this.hasMany('Article');
    },
},
{
    masks: {
        user: 'id,first_name,last_name',
        admin: '*',
    },
})
