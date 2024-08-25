import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButton,IonButtons,IonTitle,IonIcon, IonBackButton,IonToolbar,NavController  } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tonguetwisters',
  templateUrl: './tonguetwisters.page.html',
  styleUrls: ['./tonguetwisters.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
    IonToolbar,IonButton,IonButtons,
    IonBackButton,IonIcon, CommonModule,
    IonIcon]
})
export class TonguetwistersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
