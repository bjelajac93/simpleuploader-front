// Modules
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
// Services
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../core/services/upload-download.service';
// Models
import { FileData } from '../../shared/models/file-data';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html'
})

export class UploadComponent {
  @Input() public disabled!: boolean;
  @Input() public itemsLength!: number;
  @Output() public loadingStatus: EventEmitter<boolean>;
  @ViewChild('inputFile')
  inputFile!: ElementRef;
  environment = environment;

  constructor(private uploadDownloadService: UploadDownloadService, private toastr: ToastrService) {
    this.loadingStatus = new EventEmitter<boolean>();
  }

  public upload(event: any) {
    if (this.itemsLength <= environment.allowedNumberOfFiles) {
      this.loadingStatus.emit(true);
      if (event.target.files?.length) {
        const file = event.target.files[0];
        if (file.size <= environment.allowedFileSize) {
          this.uploadDownloadService.uploadFile(file).subscribe(
            (fileData: FileData) => {
              if (fileData) {
                this.toastr.success('File uploaded successfully.');
                this.loadingStatus.emit(false);
              }
            },
            () => {
              this.inputFile.nativeElement.value = '';
              this.toastr.error('Error Uploading file!');
              this.loadingStatus.emit(false);
            }
          );
        } else {
          this.toastr.error(`The maximum supported file sizes are ${ environment.allowedFileSize } Bytes.`);
          this.loadingStatus.emit(false);
        }
      }
    } else {
      this.toastr.warning(`The maximum number of files is ${ environment.allowedNumberOfFiles }.`);
    }
  }
}