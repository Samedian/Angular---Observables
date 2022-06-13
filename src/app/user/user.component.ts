import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Observable, observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/Operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;
  paramSubscribe: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });

    // in built observables which shows count 
    // this.paramSubscribe = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customInterval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 3) {
          observer.complete();// it will not return anything
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    // to subscribe data, pipe is used to filter and map data and reduce(it is used to find max value i.e it will return one output) data.
    this.paramSubscribe = customInterval.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'round' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => { console.log(error) },
      () => { console.log('completed') }
    )
  }
  ngOnDestroy() {
    this.paramSubscribe.unsubscribe();
  }

  onActivate(){
    console.log("abc");
    // this.userService.activatedEmitter.emit(true); 
    this.userService.activatedEmitter.next(true); 
  }
}
