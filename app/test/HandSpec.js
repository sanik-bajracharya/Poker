import { Hand } from '../src/Hand';

const expect = require('expect.js');

describe('Poker Hands Test', function() {
    describe('Given a poker hand of 5 cards 5H, 5D, 5S, 5C, KD', () => {
        let cards, pokerHand;
        beforeEach(() => {
            cards = ['5H', '5D', '5S', '5C', 'KD'];
            pokerHand = new Hand(cards);
        });

        describe('When findStraightFlush is called on the cards', () => {
            let result;
            beforeEach(() => {
                result = pokerHand.findStraight();
            });

            it('Then a straight flush should not be found', () => {
                expect(result.found).to.be(false);
            });
        });

        describe('When findFourOfAKind  is called on the cards', () => {
            let result;
            before(() => {
                result = pokerHand.findFourOfAKind();
            });

            it('Then a four of a kind should be found', () => {
                expect(result.found).to.be(true);
            });

            it('Then a four of a kind value found should equal to 5', () => {
                expect(result.result).to.be(5);
            });
        });
    
    });
});