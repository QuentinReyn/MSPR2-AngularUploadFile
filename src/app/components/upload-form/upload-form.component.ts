import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
   
    this.currentFileUpload = new FileUpload(file);
    if (this.currentFileUpload.file.name.includes('.csv')) {
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        (percentage) => {
          if(percentage){
          this.percentage = Math.round(percentage);
          }
          else{
            this.percentage = 100;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{

    }
  }
}
