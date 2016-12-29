'use strict'

exports.seed = (knex, Promise) => {
    let users = [
        { id: 1, first_name: 'Amira', last_name: 'Dooley', email: 'Raina_Kunde14@hotmail.com' },
        { id: 2, first_name: 'Joaquin Leffler', last_name: 'Leffler', email: 'Brandyn_Collier44@yahoo.com' },
        { id: 3, first_name: 'Chaim', last_name: 'Herman', email: 'Emmie.Stehr@yahoo.com' },
    ];

    return Promise.join(
        knex('users').del(),
        knex('users').insert(users)
    );
}
