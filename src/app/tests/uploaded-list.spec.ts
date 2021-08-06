import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, getTestBed, inject, TestBed } from '@angular/core/testing';
import { UploadDownloadService } from '../modules/core/services/upload-download.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileData } from '../modules/shared/models/file-data';
import { environment } from 'src/environments/environment';
import { UploadedFilesComponent } from '../modules/file-manager/uploaded-files/uploaded-files.component';
import { UploadComponent } from '../modules/file-manager/upload/upload.component';
import { DownloadComponent } from '../modules/file-manager/download/download.component';

describe('UploadDownloadService', () => {
  let service: UploadDownloadService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UploadDownloadService]
    });

    injector = getTestBed();

    // HttpMock provided to the TestBed
    httpMock = injector.get(HttpTestingController);

    // UploadDownloadService provided to the TestBed
    service = injector.get(UploadDownloadService);
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([UploadDownloadService], (injectService: UploadDownloadService) => {
      expect(injectService).toBe(service);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve empty lists from the API with GET', () => {
    const files: FileData[] = [];
    service.getFiles().subscribe(files => {
        expect(files.length).toBe(0);
        expect(files).toEqual(files);
    });
    const request = httpMock.expectOne( `${ environment.API_ENDPOINT + 'files' }`);
    expect(request.request.method).toBe('GET');
    request.flush(files);
    httpMock.verify();
  });

});