import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './core/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'items'
  },
  {
    path: 'items',
    loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
