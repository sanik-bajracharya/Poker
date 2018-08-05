const cardValueMap = {
    'A': 1,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10
};

const cardSuits = ['H', 'C', 'S', 'D'];

export class Card {
    static getCardValue(card) {
        let cardValue = card.substr(0, 1);
        return cardValueMap[cardValue] || parseInt(cardValue);
    }
    
    static getCardSuit(card) {
        return card.substr(1, 1);
    }

    static _isCardSuitValid(card) {
        return cardSuits.indexOf(Card.getCardSuit(card)) !== -1;
    }

    static _isCardValueValid(card) {
        let cardValue = Card.getCardValue(card);
        return cardValue >= 1 && cardValue <= 13;
    }

    static isValid(card) {
        if (card.length === 2 && Card._isCardValueValid(card) && Card._isCardSuitValid(card)) {
            return true;
        }
        return false;
    }
}