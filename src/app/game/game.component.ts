import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CardInfoComponent } from './card-info/card-info.component';
import { addDoc, setDoc, Firestore, collection, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StartScreenComponent } from '../start-screen/start-screen.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, FormsModule, MatButtonModule, MatIconModule, OpenDialogComponent, CardInfoComponent, StartScreenComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  game!: Game;
  gameId: any;
  currentCard: string | undefined = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  unsubscribeGame: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      
      this.listenToGame(gameId);
    });

  }

  async updateGame(data: any) {
    if (this.gameId) {
      await updateDoc(doc(this.firestore, 'games', this.gameId), data);
    }
  }

  listenToGame(gameId: string) {

    // Alten Listener stoppen falls vorhanden
    if (this.unsubscribeGame) {
      this.unsubscribeGame();
    }

    const gameRef = doc(this.firestore, 'games', gameId);

    this.unsubscribeGame = onSnapshot(gameRef, (snapshot: any) => {
      const data = snapshot.data();
      if (!data) return;

      this.game = data;
      this.gameId = gameId;
      console.log(this.game);
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribeGame) {
      this.unsubscribeGame();
    }
  }

  async newGame() {
    this.game = new Game();
  };

  pickCardAnimation = false;
  cardInfo = false;

  pickCard() {
    this.currentCard = this.game.deck.pop();
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = true;
    this.cardInfo = true;

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.updateGame({ 
      playedCards: this.game.playedCards,
      deck: this.game.deck, 
      currentPlayer: this.game.currentPlayer
    });

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame({players: this.game.players});
      }
    });
  }
}
