import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'car-type',
    loadChildren: () => import('./car-type/car-type.module').then( m => m.CarTypePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'complete-info',
    loadChildren: () => import('./complete-info/complete-info.module').then( m => m.CompleteInfoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'driver-info',
    loadChildren: () => import('./driver-info/driver-info.module').then( m => m.DriverInfoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-matrix',
    loadChildren: () => import('./payment-matrix/payment-matrix.module').then( m => m.PaymentMatrixPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pick-up-location',
    loadChildren: () => import('./pick-up-location/pick-up-location.module').then( m => m.PickUpLocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'drop-off-location',
    loadChildren: () => import('./drop-off-location/drop-off-location.module').then( m => m.DropOffLocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pre-book',
    loadChildren: () => import('./pre-book/pre-book.module').then( m => m.PreBookPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ride-info',
    loadChildren: () => import('./ride-info/ride-info.module').then( m => m.RideInfoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-account',
    loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
