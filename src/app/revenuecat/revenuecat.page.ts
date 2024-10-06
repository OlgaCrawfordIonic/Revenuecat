import { Component, OnInit } from '@angular/core';
import { AsyncPipe,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton, IonButtons, IonButton, IonList, IonItemDivider,IonLabel, IonItem} from '@ionic/angular/standalone';
import { ProductService } from '../product.service'; // Adjust the path according to your project structure
import { Purchases,PurchasesOfferings, PurchasesPackage, CustomerInfo, PurchasesEntitlementInfos } from '@revenuecat/purchases-capacitor';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';
import { LinksService } from '../linksService/links.service'



@Component({
  selector: 'revenuecat-home',
  templateUrl: 'revenuecat.page.html',
  styleUrls: ['revenuecat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton, IonButtons, AsyncPipe, IonButton, IonList, IonItemDivider,IonLabel, IonItem]
})
export class RevenuecatPage implements OnInit {
  packages: any[] = [];
  products: any[] = [];
  subscriptionStatus='';
  private _offerings = new BehaviorSubject<PurchasesPackage []>([]);
  //private _offerings = new BehaviorSubject<any[]>([]);

  constructor(private purchaseService: ProductService, private userService:UserService, public linksService:LinksService) {}

  ngOnInit() {
    this.getPackages();
    this.checkSubscriptionStatus();
  }


  get offerings() {
    return this._offerings.asObservable();
  }
  async getPackages() {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        this._offerings.next(offerings.current.availablePackages);
      }
    } catch (e) {
      const errorMessage = (e as Error).message;
      this.purchaseService.presentAlert('Error getting offers', errorMessage);
    }
    
  }

  async buyPackage(packageToBuy: any) {
    await this.purchaseService.purchasePackage(packageToBuy);
    await this.checkSubscriptionStatus();
  }

  async buyProduct(productToBuy: any) {
    await this.purchaseService.purchaseStoreProduct(productToBuy);
  }

  async checkSubscriptionStatusOld(): Promise<void> {
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
      this.subscriptionStatus='Subscribed';
      this.userService.updateUserProStatus(true)
      console.log( "This is customer info " + entitlements);
      
     }

     else {   this.subscriptionStatus='Unssubscribed';}
     console.log( "This is customer info" + entitlements,  )
    } catch (error) {
      console.error('Error checking subscription status', error);
    }
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
      this.subscriptionStatus='Subscribed';
      this.linksService.unlockLessons();
      console.log( "This is customer info " + entitlements);
      
     }

     else {   this.subscriptionStatus='Unssubscribed';}
     console.log( "This is customer info" + entitlements,  )
    } catch (error) {
      console.error('Error checking subscription status', error);
    }
  }

  grantProAccess(): void {
    // Implement the logic to grant "pro" access to the user
  }
}