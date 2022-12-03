export default (input: string[]): number => process(input);
let process = (input: string[]): number => groupByThrees(input).map(group => findBadge(group)).map(badge => convertToPriority(badge)).reduce((x, y) => x + y);
let groupByThrees = (input: string[]): string[][] => {
    let byThrees:string[] = [];
    let result:string[][] = [];
    for (let i = 0; i < input.length; i++) {
        if(i % 3 === 0){
            if(byThrees.length > 0) result.push(byThrees);
            byThrees = [input[i]];
        }else{
            byThrees.push(input[i]);
        }
    }
    result.push(byThrees);
    return result;
}

let findBadge = (groupOfThree: string[]): string => charInBoth(groupOfThree);

let charInBoth = (groupOfThree: string[]): string =>  {
    for (let i = 0; i < groupOfThree[0].length; i++) {
        if(groupOfThree[1].indexOf(groupOfThree[0][i]) > -1){
            for (let j = 0; j < groupOfThree[1].length; j++) {
                if(groupOfThree[2].indexOf(groupOfThree[0][i]) > -1){
                    return groupOfThree[0][i];
                }
            }
        }
    }
    throw new Error("")
};


let priorities = [...Array(26)].map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i)).concat(
    [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i )));
let convertToPriority = (character: string):number => priorities.indexOf(character) + 1;


