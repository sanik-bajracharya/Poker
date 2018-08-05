# Poker

Compare several pairs of poker hands to indicate which, if either, has a higher rank.

## Usage

1. Clone https://github.com/sanik-bajracharya/Poker
2. Install dependencies `npm install`
3. Start application using `npm run start <absoulte_path_to_input_txt_file>`

Example: `npm run start D:/path/to/file/input.txt`

## Sample Input/Output
The input file contains several lines, each containing the designation of ten cards: the first five cards are the hand for the player named `Black` and the next five cards are the hand for the player named `White`.  

**Input**
  
5H 5D 5S 5C KD 2C 2H 2S 8C AH  
4H 5H 8H 7H 6H KC QC TC JC AC  
4H 5H 8H 7H 6H 9C 9D 9S 9H KD  
AH AD AS AC JD 2C 2H 2S 8C KH  
4H 5H 8H 7H 6H 4S 5S 8S 7S 6S  
2H 2S 2C 8D 8H 5S 5D 5H QS 3S  
6C 8D QD 9S QU 6D 9C KS TD QS  
TH TS TC QD QH 5S 5D AH AS AC  
  
**Output**  
  
Black wins.  
White wins.  
Black wins.  
Black wins.  
Tie.  
Black wins.  
Invalid.    
White wins.

*Note:* Any invalid input will output as "Invalid."

## Unit test
Run `npm test`


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments



