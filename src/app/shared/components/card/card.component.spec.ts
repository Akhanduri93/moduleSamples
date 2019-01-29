import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { AppMaterialModule } from '../../app-material.module';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyPipesModule } from '../../pipes/myPipes.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        FlexLayoutModule,
        MyPipesModule
      ],
      declarations: [
        CardComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.title = 'Test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-card', () => {
    const de = fixture.debugElement.query(By.css('mat-card'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have a title in the card', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).not.toBeNull();
  });

  it('should have a divider', () => {
    const de = fixture.debugElement.query(By.css('mat-divider'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should show the mat-icons', () => {
    const de = fixture.debugElement.queryAll(By.css('mat-icons'));
    expect(de[0]).not.toBeNull();
    expect(de[1]).not.toBeNull();
  });

  it('should show the heading', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('h3'))[0].nativeElement;
    expect(de.innerText).toBe('Test');
  });
});
