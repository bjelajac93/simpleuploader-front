// Modules
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Services
import { UploadDownloadService } from '../../core/services/upload-download.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @Input() public disabled!: boolean;
  @Input() public fileName!: string;
  @Output() public loadingStatus: EventEmitter<boolean>;

  constructor(private uploadDownloadService: UploadDownloadService, private toastr: ToastrService) {
    this.loadingStatus = new EventEmitter<boolean>();
  }
  
  ngOnInit(): void {}

  public download() {
    this.loadingStatus.emit(true);
    this.uploadDownloadService.downloadFile(this.fileName).subscribe(
      (blob: Blob) => {
        if (blob) {
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = this.fileName;
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.toastr.success('File download successfully.');
          this.loadingStatus.emit(false);
        }
      },
      () => {
        this.toastr.error('Error Downloading file');
        this.loadingStatus.emit(false);
      }
    );
  }

}
