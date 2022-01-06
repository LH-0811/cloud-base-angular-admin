import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemTenantsComponent } from './tenants.component';

describe('SystemTenantsComponent', () => {
  let component: SystemTenantsComponent;
  let fixture: ComponentFixture<SystemTenantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
