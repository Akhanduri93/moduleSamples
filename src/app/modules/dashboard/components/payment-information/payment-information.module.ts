import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentInformationComponent } from './payment-information.component';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FinancialServiceMock } from '../../../../core/mocks/financial-status.service.mock';
import {
  MatCardModule, MatIconModule, MatRadioModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MyPipesModule,
    SharedModule,
    RouterModule,

    MatCardModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [
    PaymentInformationComponent
  ],
  exports: [PaymentInformationComponent],
  providers: [FinancialServiceMock]
})
export class PaymentInformationModule { }
