// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerRoutingModule } from './file-manager-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
// Components
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { UploadedFilesComponent } from './uploaded-files/uploaded-files.component';

@NgModule({
  declarations: [
    UploadComponent,
    DownloadComponent,
    UploadedFilesComponent,
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class FileManagerModule { }
