
import { Hand } from './Hand';
import { Showdown } from './Showdown';
import { Logger } from './Logger';

export class Poker {
    
    constructor(dealtCards, validation) {
        this._blackCards = [];
        this._whiteCards = [];
        this._score = {
            black: 0,
            white: 0
        };
        this._generatePlayerCardStacks(dealtCards);
        this._validation = validation;
    }

    start() {
        if (!this._validation.isValid()) {
            Logger.log('Invalid.');
            return;
        }
        let blackHand = new Hand(this._blackCards),
            whiteHand = new Hand(this._whiteCards);
        
        let sd = new Showdown(blackHand, whiteHand);
        Logger.log(sd.determineResult());
    }

    _generatePlayerCardStacks(dealtCards) {
        let cards = dealtCards.split(' '),
            cardsTracker = 0;
        for (let idx=0; idx < cards.length; idx++) {
            let card = cards[idx];
            cardsTracker++;

            if (cardsTracker <= 5) {
                this._blackCards.push(card);
            } else {
                this._whiteCards.push(card);
            }
        }
    }
}