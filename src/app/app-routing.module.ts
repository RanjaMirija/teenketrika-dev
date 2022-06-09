import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';

import { CreateJobComponent } from './job/create-job/create-job.component';
import { ListJobComponent } from './job/list-job/list-job.component';
import { EditJobComponent } from './job/edit-job/edit-job.component';

const routes: Routes = [
  {path: '',redirectTo:'/listJobs',pathMatch:'full'},
  {path: 'addJob', component: CreateJobComponent},
  {path: 'listJobs', component: ListJobComponent },
  {path: 'editJob/:id', component: EditJobComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
