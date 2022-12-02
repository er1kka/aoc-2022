export default (games: string[]): number =>
{
    return games.map(game => getPlay(getOpponentDraw(game[0]), getResult(game[2])) + getResultScore(getResult(game[2]))).reduce((x, y) => x+y);
}

function getPlay(opponentDraw: Move, result: Result): number {
    if(result === 'DRAW') return getPoints(opponentDraw);
    if(opponentDraw === 'ROCK' && result === 'WIN') return getPoints('PAPER');
    if(opponentDraw === 'ROCK' && result === 'LOOSE') return getPoints('SCISSOR');
    if(opponentDraw === 'PAPER' && result === 'WIN') return getPoints('SCISSOR');
    if(opponentDraw === 'PAPER' && result === 'LOOSE') return getPoints('ROCK');
    if(opponentDraw === 'SCISSOR' && result === 'WIN') return getPoints('ROCK');
    if(opponentDraw === 'SCISSOR' && result === 'LOOSE') return getPoints('PAPER');
    throw new Error("");
}

function getOpponentDraw(symbol: string): Move{
    switch (symbol){
        case 'A': return 'ROCK';
        case 'B': return 'PAPER';
        case 'C': return 'SCISSOR';
        default:
            throw new Error("");
    }
}

function getResult(symbol: string){
    switch (symbol){
        case 'X': return 'LOOSE';
        case 'Y': return 'DRAW';
        case 'Z': return 'WIN';
        default:
            throw new Error("");
    }
}

function getPoints(move: Move): number{
    switch (move){
        case "ROCK": return 1;
        case "PAPER": return 2;
        case "SCISSOR": return 3;
    }
}

function getResultScore(result: Result){
    switch (result){
        case "WIN": return 6;
        case "DRAW": return 3;
        case "LOOSE": return 0;
    }
}

type Result = 'WIN' | 'LOOSE' | 'DRAW';
type Move = 'ROCK' | 'PAPER' | 'SCISSOR';




