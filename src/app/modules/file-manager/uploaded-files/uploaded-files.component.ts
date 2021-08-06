// Modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Services
import { UploadDownloadService } from '../../core/services/upload-download.service';
// Models
import { FileData } from '../../shared/models/file-data';
// Pipes
import { FormatBytesPipe } from '../../core/pipes/format-bytes.pipe';
import { SortPipe } from '../../core/pipes/sort.pipe';

@Component({
  selector: 'app-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss'],
  providers: [FormatBytesPipe, SortPipe]
})
export class UploadedFilesComponent implements OnInit, OnDestroy {
  public files: FileData[] = [];
  public loading: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private uploadDownloadService: UploadDownloadService) { }

  ngOnInit() {
    this.uploadDownloadService.uploadedFile
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fileData: FileData) => {
          this.files.push(fileData);
          this.loading = false;
        }, 
        error: () => {}
      });
    this.getFiles();
  }

  private getFiles() {
    this.uploadDownloadService.getFiles().subscribe(
      (files: FileData[]) => {
        this.files = files;
      }
    );
  }

  public loadingStatus(event: boolean) {
    this.loading = event;
  }

  public identify(index:number){
    return index;
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
