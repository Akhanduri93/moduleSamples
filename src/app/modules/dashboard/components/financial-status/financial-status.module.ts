import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FinancialStatusComponent } from './financial-status.component';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { AccountService } from '../../../../core/http/account.service';

import {
  MatCardModule, MatProgressBarModule, MatTooltipModule, MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MyPipesModule,
    SharedModule,

    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  declarations: [
    FinancialStatusComponent
  ],
  exports: [
    FinancialStatusComponent
  ],
  providers: [
    AccountServiceMock,
    AccountService
  ]
})
export class FinancialStatusModule { }
