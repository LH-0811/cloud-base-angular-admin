import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { DevToolsRoutingModule } from './dev-tools-routing.module';
import { DevToolsCodeGeneratorComponent } from './code-generator/code-generator.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import { DevToolsYoujiTaskComponent } from './youji-task/youji-task.component';

const COMPONENTS: Type<void>[] = [
  DevToolsCodeGeneratorComponent,
  DevToolsYoujiTaskComponent];

@NgModule({
  imports: [
    SharedModule,
    DevToolsRoutingModule,
    NzDescriptionsModule,
    NzBadgeModule
  ],
  declarations: COMPONENTS,
})
export class DevToolsModule { }
