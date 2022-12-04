export default (input: string[], part: string): number => process(input, part);

let process = (input: string[], part:string): number => {


    let containsAll = (pairs :number[][]): boolean => {
        return pairs[0][0] <= pairs[1][0] && pairs[0][1] >= pairs[1][1];
    }

    let anyOverLap = (pairs :number[][]): boolean => {
        return pairs[0][1] >= pairs[1][0] && pairs[0][0] <= pairs[1][1];
    }

    let compareFunc = part === "part1" ? containsAll : anyOverLap;

    function overlap(twoRanges: string[], compareFunc: (pairs:number[][]) => boolean ) : boolean {
        let pairs = twoRanges.map(s => s.split('-', 2).map(x => parseInt(x)));
        return compareFunc(pairs) || compareFunc(pairs.reverse());
    }

    function toNumber(trueOfFalse: boolean): number {
        return trueOfFalse ? 1 : 0;
    }
    return input.map(line => line.split(',', 2)).map(s => overlap(s, compareFunc)).map(overlap => toNumber(overlap)).reduce((x, y) => x + y);
}