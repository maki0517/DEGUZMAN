import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {assignmentPage} from './assignment.page';


const routes: Routes = [
  {
    path: '',
    component: assignmentPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class assignmentPageRoutingModule { }