import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorDatabaseComponent } from './database/database.component';
import { MonitorSentinelComponent } from './sentinel/sentinel.component';
import { MonitorZipkinComponent } from './zipkin/zipkin.component';

const routes: Routes = [

  { path: 'database', component: MonitorDatabaseComponent },
  { path: 'sentinel', component: MonitorSentinelComponent },
  { path: 'zipkin', component: MonitorZipkinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
