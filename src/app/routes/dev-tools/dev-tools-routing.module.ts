import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevToolsCodeGeneratorComponent } from './code-generator/code-generator.component';

const routes: Routes = [

  { path: 'code-generator', component: DevToolsCodeGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevToolsRoutingModule { }
