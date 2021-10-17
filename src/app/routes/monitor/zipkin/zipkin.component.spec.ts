import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorZipkinComponent } from './zipkin.component';

describe('MonitorZipkinComponent', () => {
  let component: MonitorZipkinComponent;
  let fixture: ComponentFixture<MonitorZipkinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorZipkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorZipkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
