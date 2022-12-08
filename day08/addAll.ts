export default (input: string[], part: string): number => process(input, part);
class TreeVisibility{
    constructor(public id: string, public height: number, public visible: boolean = false, public view: number = 1) {
    }
}

let visibleTrees = (array: TreeVisibility[]): void => {
    let previous:number = -1;
    array.forEach(tree => {
        if(tree.height > previous){
            tree.visible = true;
            previous = tree.height;
        }
    });
}

let viewFromTreeHouse = (array: TreeVisibility[], site: TreeVisibility): void => {
    let view = 0;
    array.every(tree => {
        view++;
        return tree.height < site.height;
    } );
    site.view = site.view * view;
}
let rotate = (matrix: TreeVisibility[][]):TreeVisibility[][] => {
    let rotated: TreeVisibility[][] = new Array<Array<TreeVisibility>>();
    for(let i = 0; i < matrix[0].length; i++) {
        let row = new Array();
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(matrix[j][i]);
        }
        rotated.push(row);
    }
    return rotated;
}

let mapToInArrayWithId = (line: string, row: number):TreeVisibility[] => {
    return line.split('').map((tree, index ) => new TreeVisibility(`[${row},${index}]`, parseInt(tree)) )
}

let process = (input: string[], part: string) : number => {
    if(part == 'part1'){
        let rows = input.map((line, i) => mapToInArrayWithId(line, i));
        for(let i = 0; i < rows.length; i++){
            let leftToRight = rows[i];
            visibleTrees(leftToRight);
            visibleTrees(leftToRight.reverse())
        }
        let columns = rotate(rows);
        for(let i = 0; i < columns.length; i++){
            let upToDown = columns[i];
            visibleTrees(upToDown);
            visibleTrees(upToDown.reverse());
        }
        return columns.flat().map(t => t.visible ? 1 : 0).reduce((x, y) => x + y);
    }else{
        let rows = input.map((line, i) => mapToInArrayWithId(line, i));
        rows.forEach((row, i) =>
           row.forEach((tree, j) => {
               viewFromTreeHouse(row.slice(0, j).reverse(), tree);
               viewFromTreeHouse(row.slice(j + 1, row.length), tree);
           })
        );
        let columns = rotate(rows);
        columns.forEach((column, i) =>
            column.forEach((tree, j) => {
                viewFromTreeHouse(column.slice(0, j).reverse(), tree);
                viewFromTreeHouse(column.slice(j + 1, column.length), tree);
            })
        );
        return columns.flat().map(t => t.view).reduce((x, y) => x < y ? y : x, 0);
    }
}