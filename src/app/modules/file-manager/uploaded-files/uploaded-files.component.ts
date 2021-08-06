// Modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
// Services
import { UploadDownloadService } from '../../core/services/upload-download.service';
// Models
import { FileData, FileGroup } from '../../shared/models/file-data';
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
  public fileGroups: FileGroup[] = [];
  public files: FileData[] = [];
  public loading: boolean = false;
  public fileTypes = environment.allowedFileTypes.split(',');

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private uploadDownloadService: UploadDownloadService) { }

  ngOnInit() {
    this.uploadDownloadService.uploadedFile
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fileData: FileData) => {
          this.files.push(fileData);
          this.reMapData();
          this.loading = false;
        }, 
        error: () => {}
      });
    this.getFiles();
  }

  private reMapData() {
      this.fileGroups = [];
      this.files.forEach((f) => {
          let fileGroup: FileGroup = {
            fileType: f.fileType,
            fileData: this.files.filter((fc) => fc.fileType === f.fileType)
          }
          let groupIndex = this.fileGroups.findIndex((fg) => fg.fileType === fileGroup.fileType);

          if (groupIndex === -1)  {
            this.fileGroups.push(fileGroup);
          }
      });
  }

  private getFiles() {
    this.uploadDownloadService.getFiles().subscribe(
      (files: FileData[]) => {
        this.files = files;
        this.reMapData();
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
