import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton ,IonBackButton, IonButtons,} from '@ionic/angular/standalone';
import { Network, ConnectionStatus } from '@capacitor/network';
import { compileClassDebugInfo } from '@angular/compiler';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton ,IonBackButton, IonButtons]
})
export class NetworkPage implements OnInit, OnDestroy {
pro:boolean=false;
userSub!:Subscription

  private networkListener: any; // Define a variable to hold the listener


  constructor(private userService:UserService) { }

  async getStatus(){
    const status = await Network.getStatus();

  console.log('Network status:', status);
  }

  switchOnPro() {
    this.userService.switchOnPro();
  }

  switchOffPro() {
   this.userService.switchOffPro();
  }
  
  

  ngOnInit() {
    this.userSub=this.userService.user.subscribe(user => {
      this.pro = user.pro;
     
       // if (this.pro==true )  {this.linksService.unlockLessons() }
      console.log('Pro status updated1: from lessons page', this.pro);
    })
   
   // this.registerNetworkListener();
  }

  ngOnDestroy() {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  //  this.unregisterNetworkListener();
  }

  /*registerNetworkListener() {
    this.networkListener = Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      console.log('Network status changed', status);
      // You can add more logic here to respond to network status changes
    });
  }

  unregisterNetworkListener() {
    if (this.networkListener) {
      this.networkListener.removeAllListeners(); // Remove the listener when the component is destroyed
    }
  }*/  
 //something wroimg with these functions while compiling

}
