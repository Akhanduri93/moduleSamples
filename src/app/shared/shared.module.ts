import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AlertBarComponent} from './components/alert-bar/alert-bar.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {MyPipesModule} from '../shared/pipes/myPipes.module';
import {InfoCardComponent} from './components/info-card/info-card.component';
import {CardComponent} from './components/card/card.component';
import {
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import {LatePaymentsComponent} from './components/late-payments/late-payments.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MyPipesModule,
        RouterModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    declarations: [
        AlertBarComponent,
        BreadcrumbsComponent,
        InfoCardComponent,
        CardComponent,
        LatePaymentsComponent
    ],
    exports: [
        FlexLayoutModule,
        BreadcrumbsComponent,
        InfoCardComponent,
        CardComponent,
        LatePaymentsComponent
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7000, horizontalPosition: 'right' } }
    ],
    entryComponents: [AlertBarComponent],
})
export class SharedModule { }
