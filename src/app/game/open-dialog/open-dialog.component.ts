import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';


@Component({
  selector: 'app-open-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
  ],
  templateUrl: './open-dialog.component.html',
  styleUrl: './open-dialog.component.scss'
})
export class OpenDialogComponent {
  constructor() {
  
    }
  
   

  newPlayer: String = '';

  readonly dialogRef = inject(MatDialogRef<OpenDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
