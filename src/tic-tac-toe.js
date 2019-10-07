class TicTacToe {
    constructor() {
        this.player = 'x';
        this.size = 3;
        this.dash = this.initMatrix(this.size);
    }

    initMatrix(cols, rows) {
        return Array.from(Array(cols), () => new Array(rows));
    }

    getCurrentPlayerSymbol() {
        return this.player;
    }

    nextTurn(rowIndex, columnIndex) {
        if(this.dash[rowIndex][columnIndex] === undefined){
            this.dash[rowIndex][columnIndex] = this.player;
            this.player = (this.player === 'x') ? 'o' : 'x';
        }
    }

    isFinished() {
        return this.isDraw() || this.getWinner() !== null;
    }

    getWinner() {
        let check_lines = this.initMatrix(8, 1);
        for(var i=0; i<this.size; i++) {
            for(var j=0; j<this.size; j++) {
                check_lines[i][j] = this.dash[i][j];
                check_lines[this.size+j][i] = this.dash[i][j];
                
                if(i === j) check_lines[2*this.size][j] = this.dash[i][j];
                if(this.size-j-1 === i) check_lines[2*this.size+1][j] = this.dash[i][j];
            }
        }
        
        for(var i=0; i<check_lines.length; i++) {
            let winner = check_lines[i].reduce(function(a, b) {
                        return (b !== undefined && a === b) ? b : null;
                        });

            if(winner !== null) return winner;
        }

        return null;
    }

    noMoreTurns() {
        for(var i=0; i<this.size; i++) {
            for(var j=0; j<this.size; j++) {
                if(this.dash[i][j] === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    isDraw() {
        return this.noMoreTurns() && this.getWinner() === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.dash[rowIndex][colIndex] === undefined ? null : this.dash[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
