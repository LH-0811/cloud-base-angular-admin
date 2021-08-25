import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemPositionsComponent } from './positions.component';

describe('SystemPositionsComponent', () => {
  let component: SystemPositionsComponent;
  let fixture: ComponentFixture<SystemPositionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
