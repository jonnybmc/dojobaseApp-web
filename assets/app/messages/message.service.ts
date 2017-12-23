import {Message} from "./message.model";
import {Http,Response,Headers} from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class MessageService {
    private messages:Message[] = [];
    messageIsEdit = new EventEmitter<Message>();
    
    constructor(private http: Http) {
    
    }
    
    addMessage(message: Message){
        // this.messages.push(message); // just pushing to the front end, the post will actually persist the data to the dB

        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/message' + token ,body,{headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content,'Dummy',result.obj._id,null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => Observable.throw(error.json()));// request not sent as yet, only sets up an observable
    }

    getMessages(){
        // return this.messages;
        return this.http.get('http://localhost:3000/message')
        .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: Message[] = [];
            for (let message of messages) {
                transformedMessages.push(new Message(message.content, 'Dummy',message._id, null))
            }
            this.messages = transformedMessages;
            return transformedMessages;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message),1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
        .map((response: Response) => response.json())
        .catch((error:Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);    }

    updateMessage(message:Message){
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.patch('http://localhost:3000/message/' + message.messageId + token,body, {headers : headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()));
        
    }
}