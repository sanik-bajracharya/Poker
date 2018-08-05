import { Card } from './Card';

export class Hand {

    constructor(cards) {
        this._cards = cards.sort(this._compare.bind(this));
        this._highCard = this._findHighCard();
    }

    _compare(a, b) {
        let cardValueA = Card.getCardValue(a),
            cardValueB = Card.getCardValue(b);
        return cardValueA - cardValueB;
    }
    
    _findPairs() {
        let lastCardValue = Card.getCardValue(this._cards[0]),
            pairList = [];
    
        for (let idx = 1; idx < this._cards.length; idx++) {
            let card = this._cards[idx];
            let cardValue = Card.getCardValue(card);
    
            if (cardValue === lastCardValue && pairList.indexOf(cardValue) === -1) {
                pairList.push(cardValue);
            }
            lastCardValue = cardValue;
        }
        return pairList;
    }

    getAllCardValues() {
        let cardValues = [];
        for (let idx=0; idx < this._cards.length; idx++) {
            let cardValue = Card.getCardValue(this._cards[idx]);
            cardValues.push(cardValue);
        }
        return cardValues;
    }

    getHighCard() {
        return this._highCard;
    }

    _findHighCard() {
        let highestCardValue = Card.getCardValue(this._cards[0]);
    
        if (highestCardValue === 1) {
            //
            // ACE = 1
            //
            return highestCardValue;
        }
    
        for (let idx = 1; idx < this._cards.length; idx++) {
            let card = this._cards[idx];
            let cardValue = Card.getCardValue(card);
    
            if (cardValue > highestCardValue) {
                highestCardValue = cardValue;
            }
        }
        return highestCardValue;
    }
    
    findAPair(highestPair = true) {
        let pairs = this._findPairs(),
            result = [],
            bothPairsAreAvailable = pairs[0] && pairs[1] ? true : false;
            
        if (bothPairsAreAvailable && highestPair) {
            let pair = pairs[0] > pairs[1] ? [pairs[0]] : pairs[1];
            result = [pair];
        } else {
            result = [...pairs];
        }
    
        return {
            found: result.length > 0 ? true : false,
            result: result.length > 0 ? result : null
        };
    }
    
    findTwoPair() {
        let pairs = this._findPairs(),
            found = pairs.length === 2 ? true : false;

        return  {
            found: found,
            result: found ? pairs : null
        };
    }
    
    _findNOfAKind(n) {
        let lastCardValue = Card.getCardValue(this._cards[0]),
            nOfAKindCount = 1,
            nofAKindCardValue = lastCardValue,
            nofAKindfound = false;
    
        for (let idx = 1; idx < this._cards.length; idx++) {
            let card = this._cards[idx];
            let cardValue = Card.getCardValue(card);
            
            nOfAKindCount++;
            if (cardValue !== lastCardValue) {
                nOfAKindCount = 1;
                nofAKindCardValue = cardValue;
            }
            
            if (nOfAKindCount === n) {
                //
                // n of a kind found exit loop
                //
                nofAKindfound = true;
                break;
            }
    
            lastCardValue = cardValue;
        }
        
        return {
            found: nofAKindfound,
            result: nofAKindfound ? nofAKindCardValue : null
        };
    }

    findThreeOfAKind() {
        return this._findNOfAKind(3);
    }
    
    _isCardValueConsecutive(previousCardValue, currentCardValue) {
        let isConsecutive = previousCardValue + 1 === currentCardValue;
        
        if (!isConsecutive) {
            if (previousCardValue === 1 && currentCardValue === 10) {
                //
                // Assume 'A' card followed by '10' is consecutive for
                // possible straight A, 10, J, K, Q
                //
                isConsecutive = true;
            }
        }
    
        return isConsecutive;
    }
    
    findStraight() {
        let lastCardValue = Card.getCardValue(this._cards[0]),
            straightCardValues = [lastCardValue],
            isStraight = true;
    
        for (let idx = 1; idx < this._cards.length; idx++) {
            let card = this._cards[idx];
            let cardValue = Card.getCardValue(card);
    
            if (!this._isCardValueConsecutive(lastCardValue, cardValue)) {
                isStraight = false;
                break;
            }
            straightCardValues.push(cardValue);
            lastCardValue = cardValue;
        }
        
        return {
            found: isStraight,
            result: isStraight ? straightCardValues : null
        };
    }
    
    findFlush() {
        let lastCardSuit = Card.getCardSuit(this._cards[0]),
            isFlush = true,
            flushCardValues = [Card.getCardValue(this._cards[0])];
    
        for (let idx = 1; idx < this._cards.length; idx++) {
            let card = this._cards[idx];
            let cardSuit = Card.getCardSuit(card);
    
            if (lastCardSuit !== cardSuit) {
                isFlush = false;
                break;
            }
            flushCardValues.push(Card.getCardValue(card));
            lastCardSuit = cardSuit;
        }
        
        return {
            found: isFlush,
            result: isFlush ? flushCardValues : null
        };
    }
    
    findFullHouse() {
        let pair = this.findAPair(),
            pairResult = pair.result || [],
            threes = this.findThreeOfAKind(),
            threesResult = threes.result || -1;

        let isFullhouse = false;
        let result = {};
        let indexOfThreesInAPair = pairResult.indexOf(threesResult);
    
        if (pair.found && threes.found && indexOfThreesInAPair === -1) {
            isFullhouse = true;
            result = {
                pair: pairResult[0],
                threes: threesResult
            };
        } 
        
        return {
            found: isFullhouse,
            result: isFullhouse ? result : null
        };
    }
    
    findFourOfAKind() {
        return this._findNOfAKind(4);
    }
    
    findStraightFlush() {
        let straight = this.findStraight(),
            flush = this.findFlush(),
            isStraightFlush = straight.found && flush.found;

        return {
            found: isStraightFlush,
            result: isStraightFlush ? straight.result : null
        };
        
        
    }
}