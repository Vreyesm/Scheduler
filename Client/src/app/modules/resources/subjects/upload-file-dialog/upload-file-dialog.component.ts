import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SectionService } from '../../../../services';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {

  fileSelected = false;
  formData = new FormData();

  constructor(public dialogRef: MatDialogRef<UploadFileDialogComponent>,
              private sectionService: SectionService,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(file) {
    if (file.length === 0) {
      this.fileSelected = false;
      return;
    }

    this.fileSelected = true;
  }

  submit(file) {
    if (this.fileSelected) {
      this.formData.append('file', file[0]);
      this.sectionService.uploadFile(this.data, this.formData).subscribe(
        () => { },
        () => {},
        () => {
          this.dialogRef.close();
      });
    }
  }
}
