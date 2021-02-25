import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,private httpClient : HttpClient) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number> { 
  
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    if(filePath.includes(".csv")){
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.userID = 1;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
    }
  }


  upload(file: File): void {
    const formData: FormData = new FormData();

    formData.append('file', file);

    this.httpClient.post('http://127.0.0.1:8080/api/csv/upload',formData).subscribe();
  }

  download(): void{
    //this.httpClient.get('http://127.0.0.1:8080/api/csv/download').subscribe();
    window.open('http://127.0.0.1:8080/api/csv/download','_blank')
  }

  getAll(){
    window.open('http://127.0.0.1:8080/api/csv/tutorials','_blank')
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
