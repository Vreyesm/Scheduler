import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loaderStatus = true;
  public subscription: Subscription;

  constructor(private spinner: NgxSpinnerService, private loaderService: LoaderService) {

    this.subscription = this.loaderService.loaderUpdateEvent.subscribe( item => {
      this.loaderStatus = this.loaderService.getStatus();
      if (this.loaderStatus === true) {
        this.spinner.hide();
      } else {
        this.spinner.show();
      }
    });
  }

  ngOnInit() {
  }

}
