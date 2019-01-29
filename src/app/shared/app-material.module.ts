import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatSidenavModule,
  MatExpansionModule,
  MatMenuModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatPaginatorIntl,
  MatStepperModule
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  getPtPaginatorIntl } from './models/pt-paginator-intl';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    // LayoutModule,
    FlexLayoutModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSortModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    // LayoutModule,
    FlexLayoutModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSortModule,
    MatBadgeModule,
    MatStepperModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() }
  ]
})
export class AppMaterialModule { }
