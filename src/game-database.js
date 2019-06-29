const game_database = {

    game_id: false,
    
    new(player1, board) {
        const game_data = {
            player1, board, 
            game_over: false,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: null
        }

        if (!this.game_id) {
            this.game_id = firebase.database().ref().child('games').push().key
        }
        
        let game_ref = firebase.database().ref(`/games/${this.game_id}`)
        game_ref.update(game_data)
            .then(() => {
                return { success:true , message: 'Game created'}
            })
            .catch((err) => {
                return { success:false , message: `Creation failed: ${err.message}`}
            })
    },

    remove() {
        if (!this.game_id) return { success:false , message: 'Invalid game'}

        let game_ref = firebase.database().ref(`/games/${this.game_id}`)
        game_ref.remove()
            .then(() => {
                return { success:true , message: 'Game removed'}
            })
            .catch((err) => {
                return { success:false , message: `Remove failed: ${err.message}`}
            })
    },

    update(board) {
        if (!this.game_id) return { success:false , message: 'Invalid game'}

        let updates = {}
        updates['/board']= board
        updates['/uptadedAt']= firebase.database.ServerValue.TIMESTAMP

        let game_ref = firebase.database().ref(`/games/${this.game_id}`)
        game_ref.update(updates)
        .then(() => {
            return { success:true , message: 'Game updated'}
        })
        .catch((err) => {
            return { success:false , message: `Update failed: ${err.message}`}
        })
    },

    reset() {
        if (!this.game_id) return { success:false , message: 'Invalid game'}

        this.game_id = false
        return { success:true , message: 'Game reseted'}
    },

    listen() {
        if (!this.game_id) return { success:false , message: 'Invalid game'}

        let game_ref = firebase.database().ref(`/games/${this.game_id}`)
        game_ref.once('child_changed')
        .then((snapshot) => {
            console.log(`Game changed: ${snapshot.val()}`)
            return { success:true , message: `Game changed: ${snapshot.val()}`}
        })
        .catch((err) => {
            return { success:false , message: `Update failed: ${err.message}`}
        })
    },

}

