import { Validation } from '../src/Validation';

const expect = require('expect.js');

describe('Validation Test', function() {
    describe('Given dealt cards as 6C 8D QS 9S QH 6D 9C KS TD QS for two players', () => {
        let dealtCards, objValidation;
        beforeEach(() => {
            dealtCards = '6C 8D QS 9S QH 6D 9C KS TD QS';
            objValidation = new Validation(dealtCards);
        });

        describe('When isValid is called on the cards', () => {
            let result;
            beforeEach(() => {
                result = objValidation.isValid();
            });

            it('Then it should be invalid', () => {
                expect(result).to.be(false);
            });
        });
    });

    describe('Given dealt cards as 2C AH AS TC KH TD AC KS KD 2S for two players', () => {
        let dealtCards, objValidation;
        beforeEach(() => {
            dealtCards = '2C AH AS TC KH TD AC KS KD 2S';
            objValidation = new Validation(dealtCards);
        });

        describe('When isValid is called on the cards', () => {
            let result;
            beforeEach(() => {
                result = objValidation.isValid();
            });

            it('Then it should be vlid', () => {
                expect(result).to.be(true);
            });
        });
    });
});