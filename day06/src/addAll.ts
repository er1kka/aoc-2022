export default (input: string[], part: string): number => process(input, part);

let process = (input: string[], part: string) : number => {
    let communication = input[0];
    let markerLength = part === 'part1' ? 4 : 14;
    let unique = (marker: string):boolean => new Set<string>(marker.split('')).size === marker.length;
    for(let i = 0; i < communication.length; i++){
        if(unique(communication.substring(i, i + markerLength))) return i + markerLength;
    }
    throw new Error("marker not found");
}


