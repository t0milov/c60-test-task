const AI    : string = 'X';
const HUMAN : string = 'O';

function equals3(a: string, b: string, c: string) {
    return a == b && b == c && a != '';
}

export function checkWinner(board: any) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function minimax(scores: any, board: any, depth: number, isMaximizing: boolean) {
    let result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = AI;
                    let score = minimax(scores, board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }

        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = HUMAN;
                    let score = minimax(scores, board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }

        return bestScore;
    }
}

export function getOpponentMoveBoard(board: any){

    let result = checkWinner(board);
    if (result !== null) {
        return board;
    }

    let newBoard: any = board;

    let scores: any = {
        X: 10,
        O: -10,
        tie: 0
    };


    let bestScore: number = -Infinity;
    let move: any = {};
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (newBoard[i][j] == '') {
                newBoard[i][j] = AI;
                let score = minimax(scores, newBoard, 0, false);
                newBoard[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    newBoard[move.i][move.j] = AI;

    return newBoard
}

