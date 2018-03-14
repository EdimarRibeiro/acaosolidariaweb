import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiarioListComponent } from './beneficiario-list.component';

describe('BeneficiarioListComponent', () => {
  let component: BeneficiarioListComponent;
  let fixture: ComponentFixture<BeneficiarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
