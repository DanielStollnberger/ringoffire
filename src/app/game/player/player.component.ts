import { Component, Input } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [NgClass],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
@Input() name!:string;
@Input() activePlayer: boolean = false;
}
