import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Purchases, PURCHASES_ERROR_CODE , CustomerInfo} from '@revenuecat/purchases-capacitor';
import { LinksService } from './linksService/links.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private alertController: AlertController, private linksService: LinksService) { }

  async purchasePackage(packageToBuy: any) {
    try {
      const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToBuy });
      if (typeof purchaseResult.customerInfo.entitlements.active['my_entitlement_identifier'] !== "undefined") {
        this.presentAlert('Purchase Successful', 'You have unlocked the pro content!');
      }
    } catch (error: any) {
      if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        this.presentAlert('Purchase Cancelled', 'The purchase was cancelled.');
      } else {
        this.presentAlert('Purchase Error', 'An error occurred while making the purchase.');
      }
    }
  }

  async purchaseStoreProduct(productToBuy: any) {
    try {
      const purchaseResult = await Purchases.purchaseStoreProduct({ product: productToBuy });
      if (typeof purchaseResult.customerInfo.entitlements.active['my_entitlement_identifier'] !== "undefined") {
        this.presentAlert('Purchase Successful from my code ', 'You have unlocked the pro content from my code !');
      }
    } catch (error: any) {
      if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        this.presentAlert('Purchase Cancelled from test code revenuecat111', 'The purchase was cancelled from my test code ');
      } else {
        this.presentAlert('Purchase Error', 'An error occurred while making the purchase.');
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


  async checkSubscriptionStatus(): Promise<void> {
    try {
     
      const customerInfo:CustomerInfo = (await Purchases.getCustomerInfo()).customerInfo;
      const entitlements=customerInfo.activeSubscriptions.length;
      
     // const active =customerInfo.entitlements.all["revenuecat_premium_1month"].isActive;
      //const entitlementId = '<my_entitlement_identifier>';  Replace with your actual entitlement ID

    //  if (entitlementsactive === "revenuecat_premium_1month" || "revenuecat_premium_3months" || "revenuecat_premium_month") {
    //    // Grant user "pro" access
     //   this.grantProAccess();  Another way:
     // }      if ( entitlements.includes("revenuecat_premium_1month" || "revenuecat_premium_3months" || "revenuecat_premium_month")) {


     if ( entitlements) {
     
      this.linksService.unlockLessons();
      console.log( "This is customer info " + entitlements);
      
     }

     else {  }
    
    } catch (error) {
      console.error('Error checking subscription status', error);
    }
  }

 /* handleExistingPermissions(permissions: GlassfyPermission[]) {
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
