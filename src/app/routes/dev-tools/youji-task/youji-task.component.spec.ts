import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DevToolsYoujiTaskComponent } from './youji-task.component';

describe('DevToolsYoujiTaskComponent', () => {
  let component: DevToolsYoujiTaskComponent;
  let fixture: ComponentFixture<DevToolsYoujiTaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToolsYoujiTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToolsYoujiTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
