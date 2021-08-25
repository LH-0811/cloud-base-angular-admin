import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemResourcesComponent } from './resources.component';

describe('SystemResourcesComponent', () => {
  let component: SystemResourcesComponent;
  let fixture: ComponentFixture<SystemResourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
