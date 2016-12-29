'use strict'

const bookshelf = require('../db');
const User = require('../db/models/user');

describe('collection masking', () => {

    // no masking
    it('should be a collection of users with all columns visible (no masking)', (done) => {
        User.fetchAll().then((models) => {
            const jsonModels = models.toJSON();
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].first_name).toBeDefined();
            expect(jsonModels[0].last_name).toBeDefined();
            expect(jsonModels[0].email).toBeDefined();
            expect(jsonModels[0].created_at).toBeDefined();
            expect(jsonModels[0].updated_at).toBeDefined();
            done();
        });
    });

    // admin role
    it('should be a collection of users with admin role columns visible', (done) => {
        User.fetchAll().then((models) => {
            const jsonModels = models.mask('admin');
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].first_name).toBeDefined();
            expect(jsonModels[0].last_name).toBeDefined();
            expect(jsonModels[0].email).toBeDefined();
            expect(jsonModels[0].created_at).toBeDefined();
            expect(jsonModels[0].updated_at).toBeDefined();
            done();
        });
    });

    // user role
    it('should be a collection of users with user role columns visible', (done) => {
        User.fetchAll().then((models) => {
            const jsonModels = models.mask('user');
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].first_name).toBeDefined();
            expect(jsonModels[0].last_name).toBeDefined();
            expect(jsonModels[0].email).toBeUndefined();
            expect(jsonModels[0].created_at).toBeUndefined();
            expect(jsonModels[0].updated_at).toBeUndefined();
            done();
        });
    });

    // admin + user + non-existant roles
    it('should be a collection of users with admin + user role columns visible', (done) => {
        User.fetchAll().then((models) => {
            const jsonModels = models.mask(['admin', 'user', 'fake']);
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].first_name).toBeDefined();
            expect(jsonModels[0].last_name).toBeDefined();
            expect(jsonModels[0].email).toBeDefined();
            expect(jsonModels[0].created_at).toBeDefined();
            expect(jsonModels[0].updated_at).toBeDefined();
            done();
        });
    });

    // non-existant role
    it('should be a collection of users with no columns visible (non-existant role)', (done) => {
        User.fetchAll().then((models) => {
            const jsonModels = models.mask('fake');
            expect(jsonModels[0].id).toBeUndefined();
            expect(jsonModels[0].first_name).toBeUndefined();
            expect(jsonModels[0].last_name).toBeUndefined();
            expect(jsonModels[0].email).toBeUndefined();
            expect(jsonModels[0].created_at).toBeUndefined();
            expect(jsonModels[0].updated_at).toBeUndefined();
            done();
        });
    });

});

describe('model masking', () => {

    // no masking
    it('should be a user with all columns visible (no masking)', (done) => {
        new User({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.toJSON();
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.first_name).toBeDefined();
            expect(jsonModel.last_name).toBeDefined();
            expect(jsonModel.email).toBeDefined();
            expect(jsonModel.created_at).toBeDefined();
            expect(jsonModel.updated_at).toBeDefined();
            done();
        });
    });

    // admin role
    it('should be user with admin role columns visible', (done) => {
        new User({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.mask('admin');
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.first_name).toBeDefined();
            expect(jsonModel.last_name).toBeDefined();
            expect(jsonModel.email).toBeDefined();
            expect(jsonModel.created_at).toBeDefined();
            expect(jsonModel.updated_at).toBeDefined();
            done();
        });
    });

    // user role
    it('should be user with user role columns visible', (done) => {
        new User({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.mask('user');
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.first_name).toBeDefined();
            expect(jsonModel.last_name).toBeDefined();
            expect(jsonModel.email).toBeUndefined();
            expect(jsonModel.created_at).toBeUndefined();
            expect(jsonModel.updated_at).toBeUndefined();
            done();
        });
    });

    // admin + user + non-existant roles
    it('should be user with admin + user role columns visible', (done) => {
        new User({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.mask(['admin', 'user', 'fake']);
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.first_name).toBeDefined();
            expect(jsonModel.last_name).toBeDefined();
            expect(jsonModel.email).toBeDefined();
            expect(jsonModel.created_at).toBeDefined();
            expect(jsonModel.updated_at).toBeDefined();
            done();
        });
    });

    // non-existant role
    it('should be user with no columns visible (non-existant role)', (done) => {
        new User({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.mask('fake');
            expect(jsonModel.id).toBeUndefined();
            expect(jsonModel.first_name).toBeUndefined();
            expect(jsonModel.last_name).toBeUndefined();
            expect(jsonModel.email).toBeUndefined();
            expect(jsonModel.created_at).toBeUndefined();
            expect(jsonModel.updated_at).toBeUndefined();
            done();
        });
    });

});
