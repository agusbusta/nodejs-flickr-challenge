const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const db = require('../src/config/db');
const fetchAndStorePhotos = require('../src/services/fetchPhotos');
require('dotenv').config();

const { expect } = chai;

describe('fetchAndStorePhotos', () => {
    let axiosGetStub;
    let dbQueryStub;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get').resolves({
            data: {
                photos: {
                    photo: [
                        {
                            id: '1',
                            server: 'server1',
                            secret: 'secret1',
                            tags: ['cat']
                        },
                        {
                            id: '2',
                            server: 'server2',
                            secret: 'secret2',
                            tags: ['cat']
                        }
                    ]
                }
            }
        });

        dbQueryStub = sinon.stub(db, 'query').resolves();
    });

    afterEach(() => {
        axiosGetStub.restore();
        dbQueryStub.restore();
    });

    it('should fetch and store photos from Flickr', async () => {
        await fetchAndStorePhotos();

        expect(axiosGetStub.calledOnce).to.be.true;
        expect(axiosGetStub.calledWith('https://api.flickr.com/services/rest', sinon.match.any)).to.be.true;
        expect(dbQueryStub.calledOnce).to.be.true;

        const [query, values] = dbQueryStub.getCall(0).args;
        expect(query).to.equal('INSERT INTO photos (published_date, image_url, tags) VALUES ?');
        expect(values[0]).to.have.lengthOf(2);
        expect(values[0][0][1]).to.equal('https://live.staticflickr.com/server1/1_secret1.jpg');
    });
});
