import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './core/components/portal/portal.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/portal/dashboard/contracts',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Contract Detail'
    }
  },
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'contract-signature',
    loadChildren: './modules/contract-signature/contract-signature.module#ContractSignatureModule'
  },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'invoices-payments', loadChildren: './modules/invoices-and-payments/invoices-and-payments.module#InvoicesAndPaymentsModule' },
      { path: 'settings', redirectTo: 'settings/personal-profile/personal-data' },
      {
        path: 'settings/personal-profile',
        loadChildren: './modules/settings/personal-profile/personal-profile.module#PersonalProfileModule'
      },
      {
        path: 'settings/company-profile',
        loadChildren: './modules/settings/company-profile/company-profile.module#CompanyProfileModule'
      },
      { path: 'dashboard/contracts', loadChildren: './modules/contract-details/contract-details.module#ContractDetailsModule' },
      { path: 'support/cases', loadChildren: './modules/support/cases/cases.module#CasesModule' }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
