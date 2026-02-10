export class Game {
    players: string[] = [];
    currentPlayer: number = 0;
    deck: string[] = [];
    playedCards: (string | undefined)[] = [];

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.deck.push('ace_' + i);
            this.deck.push('clubs_' + i);
            this.deck.push('diamonds_' + i);
            this.deck.push('hearts_' + i);
        }
        this.shuffle(this.deck)
    }

    shuffle(array: string[]) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    toJson() {
        return {
            players: this.players,
            currentPlayer: this.currentPlayer,
            deck: this.deck,
            playedCards: this.playedCards
        }
    }
}