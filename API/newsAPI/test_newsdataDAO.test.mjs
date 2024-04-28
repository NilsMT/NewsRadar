import { assert } from 'chai';
import { NEWSDATA } from './newsdataDAO.mjs';

describe('newsdataDAO Tests', function() {
    describe('Tests de getNewsByCountry()', function() {
        it('CT1( DT1 ( “a”, null ), “Communication error with NewsDataAPI”)', async function() {
            const countryCode = 'a';
            const news = await NEWSDATA.getNewsByCountry(countryCode);
            assert.isObject(news, 'Un objet doit être retourné');
            assert.property(news, 'error', 'Un message d\'erreur doit être retourné');
            assert.equal(news.error, 'Communication error with NewsDataAPI')
        });
        it('CT2( DT2 ( “fr”, “nantes” ), NewsArrayObject )', async function() {
            const countryCode = 'fr';
            const city = 'nantes'
            const news = await NEWSDATA.getNewsByCountry(countryCode, city);
            assert.isObject(news, 'Un objet doit être retourné');
            assert.property(news, 'next_page', 'news possède l\'attribut next_page');
            assert.property(news, 'total_results', 'news possède l\'attribut next_page');
            assert.property(news, 'news', 'news possède l\'attribut news');
            assert.isArray(news.news, 'News should be an array');
            assert.isNotEmpty(news.news, 'News array should not be empty');
        });
        it('CT3( DT3 ( “fr”, “ghkj” ), “No such news found for the country : fr” )', async function() {
            const countryCode = 'fr';
            const city = 'ghkj';
            const news = await NEWSDATA.getNewsByCountry(countryCode, city);
            assert.isObject(news, 'Un objet doit être retourné');
            assert.property(news, 'error', 'Un message d\'erreur doit être retourné');
            assert.equal(news.error, 'No such news found for the country : fr')
        });
        it('CT4( DT4 ( “aa”, null), “Communication error with NewsDataAPI )', async function() {
            const countryCode = 'aa';
            const news = await NEWSDATA.getNewsByCountry(countryCode);
            assert.isObject(news, 'Un objet doit être retourné');
            assert.property(news, 'error', 'Un message d\'erreur doit être retourné');
            assert.equal(news.error, 'Communication error with NewsDataAPI')
        });
        it('CT5( DT5 (“aaa”, null), “Communication error with NewsDataAPI” )', async function() {
            const countryCode = 'aaa';
            const news = await NEWSDATA.getNewsByCountry(countryCode);
            assert.isObject(news, 'Un objet doit être retourné');
            assert.property(news, 'error', 'Un message d\'erreur doit être retourné');
            assert.equal(news.error, 'Communication error with NewsDataAPI')
        });
    });
});