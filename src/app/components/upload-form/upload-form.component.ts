import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarCustomComponent } from '../snackBar-custom/snackBar-custom.component';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  formatError = false;

  constructor(
    private uploadService: FileUploadService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = null;
    if (this.selectedFiles.item(0).type !== 'application/vnd.ms-excel') {
      this.formatError = true;
    } else {
      this.formatError = false;
    }
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    // console.log(file)
    if (file) {
      if (file.type !== 'application/vnd.ms-excel') {
        this.snackBar.openFromComponent(SnackBarCustomComponent, {
          duration: 15 * 1000,
        });
      } else {
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
  }
}