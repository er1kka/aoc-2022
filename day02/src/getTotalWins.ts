export default (games: string[]): number =>
{
    const rock = {id:"Rock", points: 1, beats:"Scissors" , mapsOpponent : "A", mapsMe : "X"};
    const paper = {id:"Paper", points: 2, beats:"Rock" , mapsOpponent : "B", mapsMe : "Y"};
    const scissors = {id:"Scissors", points: 3,beats:"Paper" , mapsOpponent : "C", mapsMe : "Z"};
    const opponentMapper = new Map([rock, paper, scissors].map(gesture => [gesture.mapsOpponent, gesture]));
    const meMapper = new Map([rock, paper, scissors].map(gesture => [gesture.mapsMe, gesture]));

    return games
        .map(g => [mapTo(g[0], opponentMapper), mapTo(g[2], meMapper)])
        .map(game => evaluate(game[0], game[1])).reduce((x, y) => x+y);
}

function mapTo(symbol: string, map: Map<string,Gesture>): Gesture {
    let gesture = map.get(symbol);
    if(gesture == undefined)
        throw new Error("");
    return gesture;
}

function getOutcome(opponent: Gesture, me: Gesture): number{
    if(opponent.id === me.id){
        return 3;
    }else{
        return opponent.id === me.beats ? 6 : 0;
    }
}

function evaluate(opponent: Gesture, me: Gesture): number{
    return getOutcome(opponent, me) + me.points;
}

interface Gesture {
    id: string;
    points: number;
    beats: string;
    mapsOpponent: string;
    mapsMe: string;
}

