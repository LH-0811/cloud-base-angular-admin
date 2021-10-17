import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorSentinelComponent } from './sentinel.component';

describe('MonitorSentinelComponent', () => {
  let component: MonitorSentinelComponent;
  let fixture: ComponentFixture<MonitorSentinelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSentinelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSentinelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
