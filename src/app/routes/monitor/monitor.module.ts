import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorDatabaseComponent } from './database/database.component';
import { MonitorSentinelComponent } from './sentinel/sentinel.component';
import { MonitorZipkinComponent } from './zipkin/zipkin.component';

const COMPONENTS: Type<void>[] = [
  MonitorDatabaseComponent,
  MonitorSentinelComponent,
  MonitorZipkinComponent];

@NgModule({
  imports: [
    SharedModule,
    MonitorRoutingModule
  ],
  declarations: COMPONENTS,
})
export class MonitorModule { }
