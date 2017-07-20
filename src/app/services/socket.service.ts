import { Injectable, OnInit } from '@angular/core';

import { StompService } from 'ng2-stomp-service';
import { CircleService } from './circle.service';

import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SocketService {

  private chatMessageSource = new Subject<string>();
  socketUrl = 'http://172.23.239.182:8022/gs-guide-websocket';

  userSubscription: any;
  circleSubscription: any;

  chatMessages$ = this.chatMessageSource.asObservable();

  constructor(
    private stomp: StompService,
    private circleService: CircleService) {
    this.stomp.configure({
      host: this.socketUrl,
      debug: true,
      queue: {'init': false}
    });
    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      this.userSubscription = this.stomp.subscribe('/topic/chat/'+localStorage.getItem('username'),(message) => {
        this.chatMessageSource.next(message);
      });
    });
  }

  subscribeCircle(circleId:string) {
    if(this.circleSubscription != null)
      this.circleSubscription.unsubscribe();

    this.circleSubscription = this.stomp.subscribe('/topic/message/'+circleId,(message) => {
      this.circleService.setMessage(message);
    });
  }

  sendMessage(userName:string, message: string) {
    this.stomp.send('/app/chat/'+ userName,{"message":message});
  }

  logoutNotify(){
    this.stomp.send('/app/logout/'+localStorage.getItem('username'),{"message":"logout notification"});
    this.stomp.disconnect().then(() => {
      console.log( 'Connection closed' )
    });
  }

}
