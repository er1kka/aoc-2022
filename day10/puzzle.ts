const input = async (filename = "input.txt"): Promise<string> => {
    const text = await Deno.readTextFile(filename);
    return text.trim();
};

let getCycles = (instrcutions: string[]) : Map<number, number> => {
    let X = 1;
    let offset = 1;
    let cycles: Map<number, number> = new Map();
    instrcutions.forEach((instruction, index) => {
        if(instruction == 'noop'){
            cycles.set(index + offset, X);
        }else{
            cycles.set(index + offset, X);
            offset++;
            let args  = <string[]>instruction.match(/(['addx']+)[' ']([-]?)([0-9]\d*)/);
            let value = args[2] == '-' ? parseInt('-' + args[3]) : parseInt(args[3]);
            cycles.set(index + offset, X);
            X = X + value;
        }
    })
    return cycles;
}

export const solutionOne = async (): Promise<number> => {
    const lines = await input();
    let commands = lines.split('\n');
    let cycles: Map<number, number> = getCycles(commands);
    let set:number[] = [20,60,100,140,180,220];
    let signalStrengthSums:number[] = [];
    cycles.forEach((value, key) => {
        if(set.indexOf(key) > -1){
            signalStrengthSums.push(value * key);
        }
    })
    return signalStrengthSums.reduce((x, y) => x + y);
};

export const solutionTwo = async (): Promise<number> => {
    const lines = await input();
    let commands = lines.split('\n');
    let cycles: Map<number, number> = getCycles(commands);
    let screen:string[][] = [];
    let row = 0;
    cycles.forEach((value, key) => {
        let mod40 = (key - 1) % 40;
        if(screen[row] == undefined) screen[row] = [];
        let spritePosition = (index: number, value: number): boolean => index == value -1 || index == value || index == value +1;
        if(spritePosition(mod40, value)){
            screen[row] .push('#');
        }else{
            screen[row].push('.');
        }
        if(mod40 == 39){
            row++;
        }
    });
    screen.forEach(row => {
        console.log(row.join(''));
    })
    return 1;
}

