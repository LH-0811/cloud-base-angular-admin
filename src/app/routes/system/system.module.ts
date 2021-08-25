import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { SystemRoutingModule } from './system-routing.module';
import { SystemUsersComponent } from './users/users.component';
import { SystemRolesComponent } from './roles/roles.component';
import { SystemResourcesComponent } from './resources/resources.component';
import { SystemDeptsComponent } from './depts/depts.component';
import { SystemPositionsComponent } from './positions/positions.component';

const COMPONENTS: Type<void>[] = [
  SystemUsersComponent,
  SystemRolesComponent,
  SystemResourcesComponent,
  SystemDeptsComponent,
  SystemPositionsComponent];

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: COMPONENTS,
})
export class SystemModule { }
