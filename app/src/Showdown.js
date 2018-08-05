const ACE_HIGH_VALUE = 14;
const showdownResult = {
    BLACK: 1,
    WHITE: 2,
    TIE: 3
};

export class Showdown {
    
    constructor(blackHand, whiteHand) {
        this._blackHand = blackHand;
        this._whiteHand = whiteHand;
    }

    determineResult() {
        let result;

        //
        //  TODO Improvement: Alternative approach would be to convert it into a while loop
        //
        result = this._determinStraightFlushResult();
        if (!result) {
            result = this._determineFourOfAKindResult();
            if (!result) {
                result = this._determineFullHouseResult();
                if (!result) {
                    result = this._determineFlushResult();
                    if (!result) {
                        result = this._determineStraightResult();
                        if (!result) {
                            result = this._determineThreeOfAKindResult();
                            if (!result) {
                                result = this._determineTwoPairResult();
                                if (!result) {
                                    result = this._determineAPairResult();
                                    if (!result) {
                                        result = this._determineHighCardResult();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return this._getTextResult(result);
    }

    
    _determinStraightFlushResult() {
        let bHRank = this._blackHand.findStraightFlush(),
            wHRank = this._whiteHand.findStraightFlush(),
            result;
        
        if (!bHRank.found && !wHRank.found) {
            return;
        }

        if (bHRank.found && wHRank.found) {
            result = this._getResultUsingHighestCard(this._blackHand.getAllCardValues(), this._whiteHand.getAllCardValues());
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineFourOfAKindResult() {
        let bHRank = this._blackHand.findFourOfAKind(),
            wHRank = this._whiteHand.findFourOfAKind();

        return this._determineNOfAKindResult(bHRank, wHRank);
    }

    _determineFullHouseResult() {
        let bHRank = this._blackHand.findFullHouse(),
            wHRank = this._whiteHand.findFullHouse(),
            result;
        
        if (!bHRank.found && !wHRank.found) {
            return;
        }

        if (bHRank.found && wHRank.found) {
            //
            // `threes` on black and white hands cannot be equal because
            // there are only 4 suits of a card
            //

            // make ACE card powerful by adding higher value temporaryly
            // greater than K (13)
            let bHRankResult = this._convertAceToAHighCard(bHRank.result.threes);
            let wHRankResult = this._convertAceToAHighCard(wHRank.result.threes);
            if (bHRankResult > wHRankResult) {
                result = showdownResult.BLACK;
            } else {
                result = showdownResult.WHITE;
            }
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineFlushResult() {
        let bHRank = this._blackHand.findFlush(),
            wHRank = this._whiteHand.findFlush(),
            result;
        
        if (!bHRank.found && !wHRank.found) {
            return;
        }

        if (bHRank.found && wHRank.found) {
            result = this._getResultUsingHighestCard(this._blackHand.getAllCardValues(), this._whiteHand.getAllCardValues(), true);
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineStraightResult() {
        let bHRank = this._blackHand.findStraight(),
            wHRank = this._whiteHand.findStraight(),
            result;
        
        if (!bHRank.found && !wHRank.found) {
            return;
        }

        if (bHRank.found && wHRank.found) {
            result = this._getResultUsingHighestCard(this._blackHand.getAllCardValues(), this._whiteHand.getAllCardValues());
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineThreeOfAKindResult() {
        let bHRank = this._blackHand.findThreeOfAKind(),
            wHRank = this._whiteHand.findThreeOfAKind();

        return this._determineNOfAKindResult(bHRank, wHRank);
    }

    _determineTwoPairResult() {
        let bHRank = this._blackHand.findTwoPair(),
            wHRank = this._whiteHand.findTwoPair(),
            result;

        if (!bHRank.found && !wHRank.found) {
            return;
        }
    
        if (bHRank.found && wHRank.found) {
            result = this._compareAPair(bHRank.result[1], wHRank.result[1], false);
            if (result === showdownResult.TIE) {
                result = this._compareAPair(bHRank.result[0], wHRank.result[0]);
            }
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineAPairResult() {
        let bHRank = this._blackHand.findAPair(),
            wHRank = this._whiteHand.findAPair(),
            result;

        if (!bHRank.found && !wHRank.found) {
            return;
        }
    
        if (bHRank.found && wHRank.found) {
            result = this._compareAPair(bHRank.result[0], wHRank.result[0]);
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _determineHighCardResult() {
        return this._getResultUsingHighestCard(this._blackHand.getAllCardValues(), this._whiteHand.getAllCardValues(), true);
    }

    _determineNOfAKindResult(bHRank, wHRank) {
        let result;

        if (!bHRank.found && !wHRank.found) {
            return;
        }

        if (bHRank.found && wHRank.found) {
            //
            // 3 or 4 of a kind on black and white hands cannot be equal
            // because there are only 4 suits of a card
            //
            
            // make ACE card powerful by adding higher value temporaryly
            // greater than K (13)
            let bHRankResult = this._convertAceToAHighCard(bHRank.result);
            let wHRankResult = this._convertAceToAHighCard(wHRank.result);
            if (bHRankResult > wHRankResult) {
                result = showdownResult.BLACK;
            } else {
                result = showdownResult.WHITE;
            }
            
        } else {
            result = this._getWinnerBasedOnOfTheTwoRanksFound(bHRank, wHRank);
        }
        return result;
    }

    _convertAceToAHighCard(card) {
        return card === 1 ? ACE_HIGH_VALUE : card;
    }

    _compareAPair(bPair, wPair, checkForHighCardIsRequired = true) {
        let result;
        if (bPair === wPair) {
            if (checkForHighCardIsRequired) {
                result = this._getResultUsingHighestCard(this._blackHand.getAllCardValues(), this._whiteHand.getAllCardValues(), true);
            } else {
                result = showdownResult.TIE;
            }
        } else {
            bPair = this._convertAceToAHighCard(bPair);
            wPair = this._convertAceToAHighCard(wPair);
            result = bPair > wPair ? showdownResult.BLACK : showdownResult.WHITE;
        }
        return result;
    }


    _getResultUsingHighestCard(bCards, wCards, useAceAsHighCard = false) {
        let winner;

        if (useAceAsHighCard) {
            bCards = this._getCardsWithAceAsHighCard(bCards);
            wCards = this._getCardsWithAceAsHighCard(wCards);
        }
        //
        //  Use length of either bCards or wCards. It doesn't matter
        //  because both hands will have same number of cards
        //
        for (let idx=bCards.length - 1; idx >= 0; idx--) {
            if (bCards[idx] !== wCards[idx]) {
                winner = bCards[idx] > wCards[idx] ? showdownResult.BLACK : showdownResult.WHITE;
                break;
            }
        }

        return winner || showdownResult.TIE;
    }

    _getCardsWithAceAsHighCard(cards) {
        if (cards[0] === 1) {
            let newCards = cards.filter(card => card !== 1);
            //
            //  Provide ACE (1) with higher power
            //
            newCards.push(ACE_HIGH_VALUE);
            return newCards;
        }
        return cards;
    }

    _getTextResult(result) {
        let text;
        switch(result) {
            case 1:
                text = 'Black wins.';
                break;
            case 2:
                text = 'White wins.';
                break
            default:
                text = 'Tie.'
        }
        return text;
    }

    _getWinnerBasedOnOfTheTwoRanksFound(b, w) {
        if (b.found && w.found) throw '_getWinner() method cannot be called when a rank is found on black and white hands';
        return b.found ? showdownResult.BLACK : showdownResult.WHITE; 
    }

}