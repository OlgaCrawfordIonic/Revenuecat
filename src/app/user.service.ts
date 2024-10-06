import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LinksService } from './linksService/links.service';
import { Purchases,CustomerInfo, } from '@revenuecat/purchases-capacitor';

//import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<{ pro: boolean }>({ pro: false });


  constructor(private linksService: LinksService) { }

  get user(){
    return this._user.asObservable();
   }

   switchOnPro() {
    const updatedUser = { ...this.user, pro: true }; // Ensure `user.pro` is set to true
    updatedUser.pro = true; // Keeping your original state update if required
    this._user.next(updatedUser); // Pass the updated user into the observable
    this.linksService.unlockLessons();
  }

  switchOffPro() {
    const updatedUser = { ...this.user, pro: true }; // Ensure `user.pro` is set to true
    updatedUser.pro = false; // Keeping your original state update if required
    this._user.next(updatedUser); // Pass the updated user into the observable
    this.linksService.resetLinks();
    console.log('after reset links')
  }

  async addCustomerInfoUpdateListener() {
    await Purchases.addCustomerInfoUpdateListener(async (customerInfo: any) => {
     await this.checkSubscriptionStatus(customerInfo);
    });
  }

  private async checkSubscriptionStatus(customerInfo: any): Promise<void> {
    try {
      const activeSubscriptions = customerInfo.activeSubscriptions;
     

      if (activeSubscriptions && (
        activeSubscriptions.includes('revenuecat_premium_1month') ||
        activeSubscriptions.includes('revenuecat_premium_3months') ||
        activeSubscriptions.includes('revenuecat_premium_6month') || 
        activeSubscriptions.includes('revenuecat_premium_3months:3monthsrevenuecat')  || 
        activeSubscriptions.includes('revenuecat_premium_6months:6monthsbase') || 
        activeSubscriptions.includes('revenuecat_premium_1month:revenuecat')
      )) {
        // Grant user "pro" access
        this.linksService.unlockLessons();
        console.log('Customer has active subscription: ', activeSubscriptions);
      } else {
        this.linksService.resetLinks();
        console.log('No active subscriptions found.');
      }
    } catch (error) {
      console.error('Error checking subscription status', error);
    }
  }

   updateUserProStatus(isPro: boolean) {
    const user = this._user.getValue();
    user.pro = isPro;
    this._user.next(user);
    console.log(this.user,this._user, user )
    if (user.pro===true)
   {console.log('user is pro from user.service');
   // this.storageService.setName();

  this.linksService.unlockLessons();
  }
    else {console.log(user.pro  + 'userPro is false, cant unlock lessons from user service')
     this.linksService.resetLinks();
    }
  }

/*  handleExistingPermissions(permissions: GlassfyPermission[]) {
    console.log(permissions);
    for (const perm of permissions) {
      if (perm.isValid) {
        if (perm.permissionId === 'glassfy_premium_monthly_1.99' || 'glassfy_premium_3months_4.99'  || 'glassfy_premium_6months_8.99') {
        {this.userService.updateUserProStatus(true)}
          
    // making the user pro now can install the logic of unlocking lessons
  }
  else{console.log('from restore function, not subscribed')}
  }
  }
  }*/

  

}
