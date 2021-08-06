// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
// Components
import { HeaderComponent } from './header/header.component';
// Pipes
import { FormatBytesPipe } from './pipes/format-bytes.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FormatBytesPipe,
    SortPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FormatBytesPipe,
    SortPipe,
    SearchPipe
  ]
})
export class CoreModule { }
