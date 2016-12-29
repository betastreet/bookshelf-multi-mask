'use strict'

const bookshelf = require('../db');
const Article = require('../db/models/article');

describe('collection masking', () => {

    // no masking
    it('should be a collection of articles with all columns visible (no masking)', (done) => {
        Article.fetchAll().then((models) => {
            const jsonModels = models.toJSON();
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].user_id).toBeDefined();
            expect(jsonModels[0].title).toBeDefined();
            expect(jsonModels[0].body).toBeDefined();
            expect(jsonModels[0].created_at).toBeDefined();
            expect(jsonModels[0].updated_at).toBeDefined();
            done();
        });
    });

    // non-existant role
    it('should be a collection of articles with all columns visible (masking with no masks set on model)', (done) => {
        Article.fetchAll().then((models) => {
            const jsonModels = models.mask('fake');
            expect(jsonModels[0].id).toBeDefined();
            expect(jsonModels[0].user_id).toBeDefined();
            expect(jsonModels[0].title).toBeDefined();
            expect(jsonModels[0].body).toBeDefined();
            expect(jsonModels[0].created_at).toBeDefined();
            expect(jsonModels[0].updated_at).toBeDefined();
            done();
        });
    });

});

describe('model masking', () => {

    // no masking
    it('should be an article with all columns visible (no masking)', (done) => {
        new Article({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.toJSON();
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.user_id).toBeDefined();
            expect(jsonModel.title).toBeDefined();
            expect(jsonModel.body).toBeDefined();
            expect(jsonModel.created_at).toBeDefined();
            expect(jsonModel.updated_at).toBeDefined();
            done();
        });
    });

    // non-existant role
    it('should be an article with all columns visible (masking with no masks set on model)', (done) => {
        new Article({ id: 1 }).fetch().then((model) => {
            const jsonModel = model.mask('fake');
            expect(jsonModel.id).toBeDefined();
            expect(jsonModel.user_id).toBeDefined();
            expect(jsonModel.title).toBeDefined();
            expect(jsonModel.body).toBeDefined();
            expect(jsonModel.created_at).toBeDefined();
            expect(jsonModel.updated_at).toBeDefined();
            done();
        });
    });

});
