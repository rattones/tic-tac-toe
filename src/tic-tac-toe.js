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
    game_over: true,
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
        this.init(document.querySelector("#game"))
        this.board.fill('')
        this.game_over= false
        this.draw()
        game_database.new( document.getElementById('player-name').value, this.board )
        console.log("starting game")
    },

    restart() {
        if ( this.game_over ) {
            document.getElementById('game-area').style.display = 'block'
            this.start()
            console.log('starting new game')
        } else {
            console.log('no here')
        }
    },

    make_play(position) {
        if (this.game_over || this.board[position] !== '') return false

        const current_symbol = this.symbols.options[this.symbols.turn_index]
        this.board[position] = current_symbol

        this.draw()

        let winning_sequences_index = this.check_winning_sequences(current_symbol)
        if (winning_sequences_index >= 0 || this.board.indexOf('') < 0) {
            this.game_is_over()
            this.stylizing_winning_sequence(this.winning_sequences[winning_sequences_index])
        } else {
            this.symbols.change()
        }

        return true
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

    stylizing_winning_sequence(winning_sequences) {
        if (winning_sequences === undefined) return false

        winning_sequences.forEach((position) => {
            this
                .container_element
                .querySelector(`div:nth-child(${position+1})`)
                .classList.add('winner')
        })
    },

    game_is_over() {
        this.game_over = true
        console.log('GAME OVER')
    },

    draw() {
        this.container_element.innerHTML = this.board
                .map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"><span>${element}</span></div>`)
                .reduce((content, current) => content + current);

        game_database.update(this.board, this.game_over)
    },

}

// tic_tac_toe.start()