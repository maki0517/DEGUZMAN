import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCustomPagePage } from './my-custom-page.page';

const routes: Routes = [
  {
    path: '',
    component: MyCustomPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCustomPagePageRoutingModule {}