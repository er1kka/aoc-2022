const input = async (filename = "input.txt"): Promise<string> => {
    const text = await Deno.readTextFile(filename);
    return text.trim();
};

let range = (i:number) => Array(i).fill(0);

class Coordinates{
    constructor(public x: number, public y:number ) {
        this.id = `${x},${y}`;
    }
    public id:string;
    public up(distance: number):Coordinates[]{
        return range(distance).map((_, index) => new Coordinates(this.x, this.y + ( index + 1)))
    }
    public down(distance: number):Coordinates[]{
        return Array(distance).fill(0).map((_, index) => new Coordinates(this.x, this.y - ( index + 1)))
    }
    public left(distance: number):Coordinates[]{
        return Array(distance).fill(0).map((_, index) => new Coordinates(this.x- ( index + 1), this.y ))
    }
    public right(distance: number):Coordinates[]{
        return Array(distance).fill(0).map((_, index) => new Coordinates(this.x+ ( index + 1), this.y ))
    }
}
class Command{
    public direction:string;
    public distance:number;
    constructor(command: string) {
        let args  = <string[]>command.match(/(['U','D','L','R'])[' ']([\d]+)/);
        this.direction = args[1];
        this.distance = parseInt(args[2]);
    }
    public getMoves(current: Coordinates): Coordinates[]{
        switch (this.direction){
            case 'U':
                return current.up(this.distance);
            case 'D':
                return current.down(this.distance);
            case 'L':
                return current.left(this.distance);
            case 'R':
                return current.right(this.distance);
        }
        return [];
    }
}

class Head{
    constructor(public coordinates:Coordinates) {
    }
    public move(coordinates: Coordinates){
        this.coordinates = coordinates;
    }
}

class Tail{
    public visited:Set<string> = new Set();
    constructor(public coordinates:Coordinates) {
        this.visited.add(coordinates.id);
    }
    public follow(following: Coordinates): void{
        // on top
        if(following.id == this.coordinates.id){
            return;
        }
        // on perimeter
        if(Math.abs(following.x - this.coordinates.x) > 1 && Math.abs(following.y - this.coordinates.y) > 1 ) {
            let xDiff = following.x - this.coordinates.x;
            let yDiff = following.y - this.coordinates.y;
            this.move(new Coordinates(
                this.coordinates.x + xDiff + (xDiff > 0 ? -1 : 1),
                this.coordinates.y + yDiff + (yDiff > 0 ? -1 : 1)
                 ));
            return;
        }
        if(Math.abs(following.x - this.coordinates.x) > 1){
            let xDiff = following.x - this.coordinates.x;
            this.move(new Coordinates(
                this.coordinates.x + xDiff + (xDiff > 0 ? -1 : 1),
                Math.abs(following.y - this.coordinates.y) == 1 ? this.coordinates.y + (following.y - this.coordinates.y) : this.coordinates.y) );
            return;
        }
        if(Math.abs(following.y - this.coordinates.y) > 1 ){
            let yDiff = following.y - this.coordinates.y;
            this.move(new Coordinates(
                Math.abs(following.x - this.coordinates.x) == 1 ? this.coordinates.x + (following.x - this.coordinates.x) : this.coordinates.x,
                this.coordinates.y + yDiff + (yDiff > 0 ? -1 : 1)));
            return;
        }
        return;
    }
    public move(coordinates: Coordinates){
        this.coordinates = coordinates;
        this.visited.add(coordinates.id);
    }
}
export const solutionOne = async (): Promise<number> => {
    const lines = await input();
    let origin = new Coordinates(0,0);
    let head = new Head(origin);
    let tail = new Tail(origin);
    let commands = lines.split('\n').map(command => new Command(command));
    commands.forEach(command => {
        command.getMoves(head.coordinates).forEach(newCoordinate => {
            head.move(newCoordinate);
            tail.follow(head.coordinates);
        })
    });
    return tail.visited.size;
};

export const solutionTwo = async (): Promise<number> => {
    const lines = await input();
    let origin = new Coordinates(0,0);
    let head = new Head(origin);
    let tails = Array(9).fill(0).map(_ =>new Tail(origin)) ;
    let commands = lines.split('\n').map(command => new Command(command));
    let visited = new Set<string>();
    visited.add(tails[tails.length -1].coordinates.id);
    commands.forEach(command => {
        command.getMoves(head.coordinates).forEach(newCoordinate => {
            head.move(newCoordinate);
            let previous:Coordinates = head.coordinates;
            tails.forEach(knot => {
                knot.follow(previous);
                previous = knot.coordinates;
            })
            visited.add(tails[tails.length -1].coordinates.id);
        })
    });
    return visited.size;
}

