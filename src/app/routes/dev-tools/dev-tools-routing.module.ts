import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevToolsCodeGeneratorComponent } from './code-generator/code-generator.component';
import { DevToolsYoujiTaskComponent } from './youji-task/youji-task.component';

const routes: Routes = [

  { path: 'code-generator', component: DevToolsCodeGeneratorComponent },
  { path: 'youji-task', component: DevToolsYoujiTaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevToolsRoutingModule { }
