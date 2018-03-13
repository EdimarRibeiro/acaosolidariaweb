import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadeCreateComponent } from './entidade-create.component';

describe('EntidadeCreateComponent', () => {
  let component: EntidadeCreateComponent;
  let fixture: ComponentFixture<EntidadeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntidadeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
