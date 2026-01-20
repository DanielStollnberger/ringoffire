import { Component, Input, numberAttribute } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
  cardInfo = [
    {
      title: "Heaven",
      description: "Alle Spieler strecken gleichzeitig eine Hand nach oben. Der letzte, der reagiert, muss trinken."
    },
    {
      title: "Hell",
      description: "Alle zeigen sofort auf den Boden. Wer zuletzt reagiert oder falsch zeigt, trinkt."
    },
    {
      title: "King",
      description: "Du bestimmst einen Spieler, der für dich trinkt. Du entscheidest auch, wie viele Schlucke."
    },
    {
      title: "Rule",
      description: "Erfinde eine neue Regel. Wer sie bis Spielende bricht, muss trinken."
    },
    {
      title: "Mirror",
      description: "Wähle einen Spieler. Alles, was du tust, muss er nachmachen. Vergisst er es, trinkt er."
    },
    {
      title: "Shotgun",
      description: "Wähle zwei Spieler. Diese müssen gleichzeitig trinken. Wer zuerst absetzt, verteilt einen Schluck."
    },
    {
      title: "Question",
      description: "Stelle einem Spieler eine Frage. Antwortet er direkt, muss er trinken. Stellt er eine Gegenfrage, trinkst du."
    },
    {
      title: "Freeze",
      description: "Du darfst jederzeit einfrieren. Der letzte, der stehen bleibt, trinkt."
    },
    {
      title: "Cheers",
      description: "Alle stoßen an. Der Spieler mit dem niedrigsten Glasstand trinkt."
    },
    {
      title: "Switch",
      description: "Tausche dein Getränk mit einem anderen Spieler. Dieser muss zusätzlich einen Schluck trinken."
    },
    {
      title: "Silent",
      description: "Ab jetzt darf niemand sprechen, bis du es aufhebst. Wer redet, trinkt."
    },
    {
      title: "Vote",
      description: "Alle zeigen auf den Spieler, der trinken soll. Der mit den meisten Stimmen trinkt."
    },
    {
      title: "Last Call",
      description: "Alle müssen einen Schluck trinken. Du bist davon ausgenommen."
    }
  ];

  @Input() card!: string | undefined;
  title: string = '';
  description = '';
  cardNmbr: number = 0;

  ngOnChanges(): void {
    this.cardNmbr = +this.card?.split('_')[1]!;
      this.title = this.cardInfo[this.cardNmbr - 1].title;
      this.description = this.cardInfo[this.cardNmbr - 1].description;
  }
}
