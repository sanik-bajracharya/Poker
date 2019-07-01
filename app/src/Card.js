const cardValueMap = {
    'A': 1,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10
};

const cardSuits = ['H', 'C', 'S', 'D'];

const getCardSuit = (card) => {
    return card.substr(1, 1);
};

const getCardValue = (card) => {
    let cardValue = card.substr(0, 1);
    return cardValueMap[cardValue] || parseInt(cardValue);
};

const isCardSuitValid = (card) => {
    return cardSuits.indexOf(getCardSuit(card)) !== -1;
}

const isCardValueValid = (card) => {
    let cardValue = getCardValue(card);
    return cardValue >= 1 && cardValue <= 13;
}

export const isValid = (card) => {
    if (card.length === 2 && isCardValueValid(card) && isCardSuitValid(card)) {
        return true;
    }
    return false;
}