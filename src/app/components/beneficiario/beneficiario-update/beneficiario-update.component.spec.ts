import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioUpdateComponent } from './beneficiario-update.component';

describe('BeneficiarioUpdateComponent', () => {
  let component: BeneficiarioUpdateComponent;
  let fixture: ComponentFixture<BeneficiarioUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarioUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
