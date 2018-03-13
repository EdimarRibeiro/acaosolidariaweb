import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeUpdateComponent } from './entidade-update.component';

describe('EntidadeUpdateComponent', () => {
  let component: EntidadeUpdateComponent;
  let fixture: ComponentFixture<EntidadeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntidadeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
