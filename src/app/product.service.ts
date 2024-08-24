import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Purchases, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private alertController: AlertController) { }

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
}
