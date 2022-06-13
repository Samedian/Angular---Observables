import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService:UserService) {}
  userActivated = false;
  paramSubscription: Subscription;

  ngOnInit() {
    this.paramSubscription = this.userService.activatedEmitter.subscribe((data:boolean) => {
      this.userActivated = data;
    })
  }
  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
