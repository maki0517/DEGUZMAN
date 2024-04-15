import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCustomPageWithIdPage } from './my-custom-page-with-id/my-custom-page-with-id.page';

import { MyCustomPagePage } from './my-custom-page.page';

const routes: Routes = [
  {
    path: '',
    component: MyCustomPagePage
  },

  {
    path: 'my-custom-page-with-id/:id',
    component: MyCustomPageWithIdPage 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCustomPagePageRoutingModule {}
