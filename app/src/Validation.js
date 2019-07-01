import * as Card from './Card'

export class Validation {
    constructor(dealtCards) {
        this._cards = dealtCards;
    }

    isValid() {
        let cards = this._cards.split(' '),
            validatedCards = [];

        if (cards.length !== 10) {
            return false;
        }
        
        for (let idx=0; idx < cards.length; idx++) {
            let card = cards[idx];
            if (!Card.isValid(card) ||  validatedCards.indexOf(card) !== -1) {
                return false;
            }
            validatedCards.push(card);
        }
        return true;
    }
}