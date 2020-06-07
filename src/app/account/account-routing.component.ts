import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'notifications',
        loadChildren: () =>
          import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/view/view.module').then(m => m.ViewPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
