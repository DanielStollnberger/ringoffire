import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  constructor(public router: Router) {

  }
  async startGame() {
    let game = new Game();
    await addDoc(collection(this.firestore, 'games'), game.toJson())
      .then(
        (gameInfo: any) => (
          this.router.navigateByUrl('games/'+ gameInfo.id )
        )
      );
  }
}
