import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDatabaseComponent } from './database.component';

describe('MonitorDatabaseComponent', () => {
  let component: MonitorDatabaseComponent;
  let fixture: ComponentFixture<MonitorDatabaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
