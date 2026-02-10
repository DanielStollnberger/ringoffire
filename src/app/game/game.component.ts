import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CardInfoComponent } from './card-info/card-info.component';
import { addDoc, setDoc, Firestore, collection, onSnapshot, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, FormsModule, MatButtonModule, MatIconModule, OpenDialogComponent, CardInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  game!: Game;
  currentCard: string | undefined = '';


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  unsubscribeGame: any;

  ngOnInit(): void {
    this.newGame();
  
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      this.listenToGame(gameId);
    });
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
      console.log(this.game);
    });
  }
  
  ngOnDestroy(): void {
    if (this.unsubscribeGame) {
      this.unsubscribeGame();
    }
  }
  


  // ngOnInit(): void {
  //   this.newGame();
  //   this.route.params.subscribe((game) => {
  //     console.log(game);
  //     this.listenToGame(game);
  //   })

  // }

  // listenToGame(game: any) {
  //   onSnapshot(
  //     doc(this.firestore, 'games/' + game['id']),
  //     (snapshot: any) => (
  //       this.game = snapshot.data(),
  //       console.log(this.game)
  //     )
  //   )
  // }

  async newGame() {
    this.game = new Game();
    // await addDoc(collection(this.firestore, 'games'), this.game.toJson());
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

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent);


    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
