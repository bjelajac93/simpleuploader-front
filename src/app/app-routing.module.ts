import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'file-manager',
    loadChildren: () => import('./modules/file-manager/file-manager.module').then((a) => a.FileManagerModule),
  },
  { path: '**', redirectTo: 'file-manager' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
