// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { UploadedFilesComponent } from './uploaded-files/uploaded-files.component';

const routes: Routes = [
  {
    path: '',
    component: UploadedFilesComponent,
    children: [],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagerRoutingModule {}
