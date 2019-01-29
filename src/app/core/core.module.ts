import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Shared Component Imports */
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FinancialStatusModule } from '../modules/dashboard/components/financial-status/financial-status.module';
/* Feature Module Imports */
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { InvoicesAndPaymentsModule } from '../modules/invoices-and-payments/invoices-and-payments.module';
import { SupportModule } from '../modules/portal/support/support.module';
import { SharedModule } from '../shared/shared.module';
import { PasswordManageMockService } from './mocks/password-management.service.mock';
import { ContactServiceMock } from './mocks/contact.service.mock';
import { AuthenticationServiceMock } from './mocks/authentication.service.mock';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceServiceMock } from './mocks/invoice.service.mock';
import { CompanyProfileModule } from '../modules/settings/company-profile/company-profile.module';
import { CanDeactivateGuard } from './http/can-deactivate-guard.service';
import { ContactService } from './http/contact.service';
import { PortalComponent } from './components/portal/portal.component';
import { CookieService } from 'ngx-cookie-service';
import { DetectBrowserService } from './services/detect-browser.service';

import {
  MatToolbarModule, MatProgressBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatIconModule, MatListModule, MatTabsModule,
  MatButtonModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  declarations: [
    PortalComponent,
    TopNavComponent,
  ],
  providers: [
    CanDeactivateGuard,
    CookieService,
    DetectBrowserService
  ]
})
export class CoreModule { }
