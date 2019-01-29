import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardComponent } from './info-card.component';
import { AppMaterialModule } from '../../app-material.module';
import { CardComponent } from '../card/card.component';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyPipesModule } from '../../pipes/myPipes.module';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        FlexLayoutModule,
        MyPipesModule
      ],
      declarations: [
        InfoCardComponent,
        CardComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-list', () => {
    const de = fixture.debugElement.query(By.css('mat-list'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have a mat-list with 2 mat-list-items', () => {
    component.infoPoints = ['Item 1', 'Item 2'];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mat-body-2'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toBe('Item 1');
  });
});
