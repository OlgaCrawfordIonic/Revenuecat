import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from "@ionic/angular";
// TS typings for the plugin
import { Purchases, LOG_LEVEL, CustomerInfo } from '@revenuecat/purchases-capacitor';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(platform: Platform) {
    platform.ready().then(async () => {
     
      try{
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG }); // Enable to get debug logs
        if (platform.is('ios') ){
          await  Purchases.configure({
           apiKey: "appl_lRkoqfMXBNPhUhtYcBaYKmFqmIn"});
         } else if (platform.is ('android')) {
          await   Purchases.configure({ apiKey: 'goog_RZOendIybwEbFMzqYKvOMHnycrw'});
         }
        const offerings = await Purchases.getOfferings();
        console.log(offerings)
        const customerInfo = await Purchases.getCustomerInfo();
        const entitlements=customerInfo.customerInfo.activeSubscriptions.length;
      if ( entitlements) 
      // Grant user "pro" access
     //   this.grantProAccess();
     // }
     console.log( "This is customer info " + entitlements)

      }
      catch (e) {
        // initialization error
        console.log('Error from REvenueCat in app.ts: ', e);
    
    }
        
    });

    
}
}
