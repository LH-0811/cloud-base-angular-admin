import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDeptsComponent } from './depts.component';

describe('SystemDeptsComponent', () => {
  let component: SystemDeptsComponent;
  let fixture: ComponentFixture<SystemDeptsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDeptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDeptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
