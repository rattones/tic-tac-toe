const tic_tac_toe = {

    board: ['', '', '', '', '', '', '', '', ''],
    symbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change() {
            this.turn_index = ( this.turn_index === 0 ) ? 1 : 0
        }
    },
    container_element: null,
    game_over: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init(container) {
        this.container_element= container
    },

    start() {
        this.board.fill('')
        this.game_over= false
        this.draw()
    },

    make_play(position) {
        if (this.game_over) return false
        if (this.board[position] === '') {
            this.board[position] = this.symbols.options[this.symbols.turn_index]

            this.draw()

            let winning_sequences_index = this.check_winning_sequences(this.symbols.options[this.symbols.turn_index] )
            if (winning_sequences_index >= 0 ) {
                this.game_is_over()
            } else {
                this.symbols.change()
            }
            return true
        } else {
            return false
        }
    },

    check_winning_sequences(symbol) {        
        for ( i in this.winning_sequences ) {
            if ( this.board[ this.winning_sequences[i][0] ] === symbol &&
                 this.board[ this.winning_sequences[i][1] ] === symbol &&
                 this.board[ this.winning_sequences[i][2] ] === symbol 
                ) {
                    console.log(`sequencia vencedora: ${i}`)
                    return i
                }
        }

        return -1
    },

    game_is_over() {
        this.game_over = true
        console.log('GAME OVER')
    },

    draw() {
        let content= ''

        for( i in this.board ) {
            content += `<div onClick="tic_tac_toe.make_play(${i})">${this.board[i]}</div>`
        }

        this.container_element.innerHTML= content

    }

}

tic_tac_toe.init(document.querySelector("#game"))
tic_tac_toe.start()