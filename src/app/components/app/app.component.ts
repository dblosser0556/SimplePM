import { Component, OnInit } from '@angular/core';
import { ErrorMsgService, ToastrType } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit() {
    this.errorMsgService.currentMessage.subscribe(
      message => {
        this.errorMsgService.showUserMessage(ToastrType.warning, 'Oops - Something went wrong', message );
        console.log(message);
      });


  }

}
