export default (input: string[]): number => process(input);

let splitLines = (input: string[]):[string, string][] => input.map(s => [firstHalf(s), secondHalf(s)]);
let firstHalf = (lineToSplit: string) => lineToSplit.substring(0, lineToSplit.length/2);
let secondHalf = (lineToSplit: string) => lineToSplit.substring(lineToSplit.length/2, lineToSplit.length);
let process = (input: string[]):number => splitLines(input).map(tuple => charInBoth(tuple)).map(character => convertToPriority(character)).reduce((x, y) => x + y);

let priorities = [...Array(26)].map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i)).concat(
    [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i )));

let charInBoth = (splitLines: [string, string]): string =>  {
    for (let i = 0; i < splitLines[0].length; i++) {
        if(splitLines[1].indexOf(splitLines[0][i]) > -1){
            return splitLines[0][i];
        }
    }
    throw new Error("")
};

let convertToPriority = (character: string):number => priorities.indexOf(character) + 1;