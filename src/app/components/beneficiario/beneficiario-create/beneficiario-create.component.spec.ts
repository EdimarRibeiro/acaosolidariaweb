import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiarioCreateComponent } from './beneficiario-create.component';

describe('BeneficiarioCreateComponent', () => {
  let component: BeneficiarioCreateComponent;
  let fixture: ComponentFixture<BeneficiarioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
