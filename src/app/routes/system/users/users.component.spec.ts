import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemUsersComponent } from './users.component';

describe('SystemUsersComponent', () => {
  let component: SystemUsersComponent;
  let fixture: ComponentFixture<SystemUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
