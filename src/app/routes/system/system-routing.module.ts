import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemUsersComponent } from './users/users.component';
import { SystemRolesComponent } from './roles/roles.component';
import { SystemResourcesComponent } from './resources/resources.component';

const routes: Routes = [

  { path: 'users', component: SystemUsersComponent },
  { path: 'roles', component: SystemRolesComponent },
  { path: 'resources', component: SystemResourcesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
