import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemRolesComponent } from './roles.component';

describe('SystemRolesComponent', () => {
  let component: SystemRolesComponent;
  let fixture: ComponentFixture<SystemRolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
