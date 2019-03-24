import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Client';
  text: any = '';

  constructor(private readonly testService: TestService) {
  }

  ngOnInit(): void {
    this.testService.pingTest().subscribe((data) => {
      this.text = data.message;
    });
  }

}
