export default (input: string[], part: string): number => process(input, part);

class Element{
    constructor(public name: string, public parent: Element | null, public type: string, public children: Element[] = [], public size:number = 0 ) {}
}
let process = (input: string[], part: string) : number => {
    let root: Element = new Element('/', null, 'dir');
    let current: Element;
    input.forEach(line => {
        if(line[0] == '$'){
            let command = line.split(' ');
            if(command[1] == 'cd' && command[2] == '/'){
                current = root;
            }else if(command[1] == 'cd' && command[2] == '..'){
                current =<Element>current.parent;
            }else if(command[1] == 'cd'){
                let i = current.children.findIndex(dir => dir.name == command[2]);
                current = i == -1 ? new Element(command[2], current, 'dir') : <Element>current.children[i];
            }
        }else{
            let result = line.split(' ');
            if(result[0] == 'dir'){
                let i = current.children.findIndex(dir => dir.name == result[1]);
                if(i == -1){
                    current.children.push(new Element(result[1], current, 'dir'));
                }
            }else{
                let i = current.children.findIndex(file => file.name == result[1]);
                if(i == -1){
                    current.children.push(new Element(result[1], current, 'file', [], parseInt(result[0])));
                }
            }
        }
    });
    let countFile = (e: Element) : number => {
        let fileCount = 0;
        let fileCountArray = e.children.filter(element => element.type == 'file').map(element => element.size);
        if(fileCountArray.length > 0){
            fileCount = fileCountArray.reduce((x, y) => x + y);

        }
        let subDirCount = 0;
        let subDircountArray = e.children.filter(element => element.type == 'dir').map(element => countFile(element));
        if(subDircountArray.length > 0){
            subDirCount = subDircountArray.reduce((x, y) => x + y);
        }
        return fileCount + subDirCount;
    }

    let walkTree = (element:Element, counts: number[]):void => {
        element.children.filter(c => c.type == 'dir').forEach(c => {
            counts.push(countFile(c));
            walkTree(c, counts);
        })
    }

    let walkTreeCountFiles = (element:Element, counts: number[]):void => {
        element.children.filter(c => c.type == 'file').forEach(c => {
            counts.push(c.size);
        })
        element.children.filter(c => c.type == 'dir').forEach(c => {
            walkTreeCountFiles(c, counts);
        });
    }

    if(part == 'part1' && false){
        let counts: number[] = [];
        walkTree(root, counts);
        return counts.filter(s => s <= 100000).reduce((x, y) => x + y);
    }else{
        let files: number[] = [];
        walkTreeCountFiles(root, files);
        let used = files.reduce((x, y) => x + y);
        let free = 70000000 - used;
        let toBeFreed = 30000000 - free;
        let dirSizes: number[] = [];
        walkTree(root, dirSizes);
        return <number>dirSizes.sort((n1,n2) => n1 - n2).find(count => count > toBeFreed);
    }
}





