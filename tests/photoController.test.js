const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app'); // Asegúrate de que tu app.js exporta la instancia de express
const db = require('../src/config/db');

const { expect } = chai;
chai.use(chaiHttp);

describe('Photo Controller', () => {
    let dbQueryStub;

    beforeEach(() => {
        dbQueryStub = sinon.stub(db, 'query');
    });

    afterEach(() => {
        dbQueryStub.restore();
    });

    it('should list photos with pagination', (done) => {
        dbQueryStub.resolves([{
            id: 1,
            published_date: new Date(),
            image_url: 'https://example.com/photo1.jpg',
            tags: 'cat'
        }, {
            id: 2,
            published_date: new Date(),
            image_url: 'https://example.com/photo2.jpg',
            tags: 'cat'
        }]);

        chai.request(app)
            .get('/photos')
            .query({ page: 1 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.has.lengthOf(2);
                expect(res.body[0]).to.have.property('image_url').that.equals('https://example.com/photo1.jpg');
                done();
            });
    });

    it('should delete a photo', (done) => {
        dbQueryStub.resolves();

        chai.request(app)
            .delete('/photos/1')
            .end((err, res) => {
                expect(res).to.have.status(204);
                expect(dbQueryStub.calledOnce).to.be.true;
                done();
            });
    });
});
