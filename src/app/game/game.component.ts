import { Component } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CardInfoComponent } from './card-info/card-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, FormsModule, MatButtonModule, MatIconModule, OpenDialogComponent, CardInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  currentCard: string | undefined = '';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
  };

  newGame() {
    this.game = new Game();
    console.log(this.game);
  };

  pickCardAnimation = false;

  pickCard() {
    this.currentCard = this.game.deck.pop();
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpenDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed');
      this.game.players.push(name);
    });
  }
}
