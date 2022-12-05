export default (input: string[], part: string): string => process(input, part);

let processCommand = (command: string, stackMap:Map<number, Stack<string>>):void => {
    //console.log(command);
    let commands:string[] = command.split(' ');
    let from = <Stack<string>>stackMap.get(parseInt(commands[3]) -1);
    let to = <Stack<string>>stackMap.get(parseInt(commands[5]) - 1);
    [...Array(parseInt(commands[1]))].forEach((_, i) => {
        to.push(<string>from.pop());
    });
};

let processCommandAlternate = (command: string, stackMap:Map<number, Stack<string>>):void => {
    //console.log(command);
    let commands:string[] = command.split(' ');
    let from = <Stack<string>>stackMap.get(parseInt(commands[3]) -1);
    let to = <Stack<string>>stackMap.get(parseInt(commands[5]) - 1);
    let tempStack = new Stack<string>();
    [...Array(parseInt(commands[1]))].forEach((_, i) => {
        tempStack.push(<string>from.pop());
    });
    [...Array(parseInt(commands[1]))].forEach((_, i) => {
        to.push(<string>tempStack.pop());
    });
};

let process = (input: string[], part:string): string => {
    let crane = part === 'part1' ? processCommand : processCommandAlternate;
    const COLUMNS = 9;
    let stackMap:Map<number, Stack<string>>  = new Map();
    let stacks = [...Array(COLUMNS)].map((_, i) => i);
    let stripBox = (box: string):string => box.substring(1,2);
    let getBox = (row: string, i:number) => row.substring(i * 4, (i* 4) + 3);
    let isBox = (box: string):boolean => box[0] === '[' && box[2] === ']';
    let boxFilter = (row: string):boolean => row.indexOf("mov") === -1 && row.indexOf("start") === -1 && row !== "";
    let commandFilter = (row: string):boolean => row.indexOf("move") > -1;
    let parseRow = (row: string, stackMap:Map<number, Stack<string>>):void => {
        stacks.forEach(i => {
            if(!stackMap.has(i)){
                stackMap.set(i, new Stack());
            }
            let box = getBox(row, i);
            if(isBox(box)){
                stackMap.get(i)?.push(stripBox(box));
            }
        });
    }

    let boxes = input.filter(row => boxFilter(row));
    boxes.reverse().forEach(row => parseRow(row, stackMap));

    input.filter(row => commandFilter(row)).forEach(command => crane(command, stackMap));

    let s = [...Array(COLUMNS)].map((_,i) => i).map(i => <string>stackMap.get(i)?.peek());

    return s.join('');
}

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}