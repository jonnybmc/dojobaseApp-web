import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';
import {Message} from './message.model';


@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
            [message]="message" *ngFor="let message of messages"></app-message>
        </div>
    `
})
export class MessageListComponent implements OnInit{
    messages:Message[];
    constructor(private messageService : MessageService){
        this.messages = [];
}

ngOnInit(){
    this.messageService.getMessages()
    .subscribe(
        (messages:Message[]) => {
            this.messages = messages;
        }
    );
}

}