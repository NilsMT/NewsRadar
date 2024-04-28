import { assert } from 'chai';
import { OPENCAGE } from './opencageDAO.mjs';

describe('opencageDAO Tests', function() {
    describe('Tests de getCountryByPlace()', function() {
        it('CT1( DT1 ( “nantes” ), CountryArrayObject )', async function() {
            const place = 'nantes';
            const country = await OPENCAGE.getCountryByPlace(place);
            assert.isObject(country, 'Un objet doit être retourné');
            assert.equal(country.longitude, -1.5541362)
            assert.equal(country.latitude, 47.2186371)
            assert.equal(country.currency, 'Euro')
            assert.equal(country.flag, '🇫🇷')
            assert.equal(country.continent, 'Europe')
            assert.equal(country.country, 'France')
            assert.equal(country.country_code, 'fr')
            assert.equal(country.city, 'Nantes')
            assert.equal(country.adress, '🇫🇷 Nantes, Loire-Atlantique, France')
        });
        it('CT2( DT2 ( “&_ç” ), “Communication error with OpencageAPI” )', async function() {
            const place = '&_ç';
            const country = await OPENCAGE.getCountryByPlace(place);
            assert.isObject(country, 'Un objet doit être retourné');
            assert.property(country, 'error_message')
            assert.equal(country.error_message, 'Communication error with OpencageAPI')
        });
        it('CT3( DT3 ( “zxwvpgh” ), “No country found with the specified place” )', async function() {
            const place = 'zxwvpgh';
            const country = await OPENCAGE.getCountryByPlace(place);
            assert.isObject(country, 'Un objet doit être retourné');
            assert.property(country, 'error_message')
            assert.equal(country.error_message, 'No country found with the specified place')
        });
    });
    describe('Tests de getCountriesByPlace()', function(){
        it('CT1( DT1 ( "sainte-croix" ), CountryArrayObject )', async function() {
            const place = 'sainte-croix';
            const countries = await OPENCAGE.getCountriesByPlace(place);
            assert.equal(countries.total_results, 10)
            assert.isArray(countries.countries)
            assert.equal(countries.countries[0].longitude, 3.7781066)
            assert.equal(countries.countries[0].latitude, 49.4809517)
            assert.equal(countries.countries[0].currency, 'Euro')
            assert.equal(countries.countries[0].flag, '🇫🇷')
            assert.equal(countries.countries[0].continent, 'Europe')
            assert.equal(countries.countries[0].country, 'France')
            assert.equal(countries.countries[0].country_code, 'fr')
            assert.equal(countries.countries[0].postcode, '02820')
            assert.equal(countries.countries[0].adress, '🇫🇷 02820 Sainte-Croix, France')
        });
        it('CT2( DT2 ( “&_ç” ), “Communication error with OpencageAPI” )', async function() {
            const place = '&_ç';
            const countries = await OPENCAGE.getCountriesByPlace(place);
            assert.isObject(countries, 'Un objet doit être retourné');
            assert.property(countries, 'error_message')
            assert.equal(countries.error_message, 'Communication error with OpencageAPI')
        });
        it('CT3( DT3 ( “zxwvpgh” ), “No country found with the specified place” )', async function() {
            const place = 'zxwvpgh';
            const countries = await OPENCAGE.getCountriesByPlace(place);
            assert.isObject(countries, 'Un objet doit être retourné');
            assert.property(countries, 'error_message')
            assert.equal(countries.error_message, 'No countries found with the specified place')
        });
    })
});