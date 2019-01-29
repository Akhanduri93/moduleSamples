import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePtPt from '@angular/common/locales/pt-PT';

registerLocaleData(localePtPt, 'pt-PT'/*, localePtPtExtra*/);
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './core/components/app/app.component';
import { ContractService } from './core/http/contract.service';
import { HttpClientModule } from '@angular/common/http';
import { FinancialService } from './core/http/financial.service';
import { CoreModule } from './core/core.module';
import { ContractSignatureService } from './core/http/contract-signature.service';
/* Guards */
import { AuthGuard } from './core/guards/auth.guard';
export class PortalErrorHandler implements ErrorHandler {
  handleError(error: any) {

    // handle error if it's invalid session
    if (error['status'] === 0 || error['status'] === 500 || error['status'] === 503) {
      window.location.href = '/unavailable';
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    AuthGuard,
    ContractService,
    FinancialService,
    ContractSignatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
