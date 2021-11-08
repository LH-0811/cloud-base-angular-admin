import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { DevToolsRoutingModule } from './dev-tools-routing.module';
import { DevToolsCodeGeneratorComponent } from './code-generator/code-generator.component';

const COMPONENTS: Type<void>[] = [
  DevToolsCodeGeneratorComponent];

@NgModule({
  imports: [
    SharedModule,
    DevToolsRoutingModule
  ],
  declarations: COMPONENTS,
})
export class DevToolsModule { }
