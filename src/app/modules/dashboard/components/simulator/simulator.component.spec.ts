import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorComponent } from './simulator.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';

describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        MyPipesModule
      ],
      declarations: [
        SimulatorComponent,
        CardComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
