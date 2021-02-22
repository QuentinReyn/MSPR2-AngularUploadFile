export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  userID: number;

  constructor(file: File) {
    this.file = file;
  }
}
