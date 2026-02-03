import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Firestore, collection, collectionData, onSnapshot } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  title = 'ringoffire';

  games: any[] = [];
  unsubGames;
  constructor() {
    this.unsubGames = this.setGames();

  }

  setGames() {
    let q = collection(this.firestore, 'games');
    return onSnapshot(q, (doc) => {
      this.games = [];
      doc.forEach(obj => {
        this.games.push(obj);
        console.log(obj.data());
      });
    });
  }
}

