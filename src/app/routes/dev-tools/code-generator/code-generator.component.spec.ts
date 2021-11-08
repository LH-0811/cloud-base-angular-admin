import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DevToolsCodeGeneratorComponent } from './code-generator.component';

describe('DevToolsCodeGeneratorComponent', () => {
  let component: DevToolsCodeGeneratorComponent;
  let fixture: ComponentFixture<DevToolsCodeGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToolsCodeGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToolsCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
