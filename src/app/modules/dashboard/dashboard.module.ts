import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ContractsComponent} from './pages/contracts/contracts.component';
import {ContractsTableComponent} from './components/contracts-table/contracts-table.component';
import {SimulatorComponent} from './components/simulator/simulator.component';
import {MyPipesModule} from '../../shared/pipes/myPipes.module';
import {SharedModule} from '../../shared/shared.module';
import {StarRatingComponent} from './components/star-rating/star-rating.component';
import {PaymentInformationModule} from './components/payment-information/payment-information.module';
import {FinancialStatusModule} from './components/financial-status/financial-status.module';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FinancialStatusModule,
    PaymentInformationModule,
    MyPipesModule,
    SharedModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [
    ContractsComponent,
    ContractsTableComponent,
    SimulatorComponent,
    StarRatingComponent
  ],
})
export class DashboardModule { }
