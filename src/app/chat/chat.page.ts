import { Component, OnInit } from '@angular/core';
import { Database, ref, set, onValue, push, child, getDatabase } from '@angular/fire/database';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { Observable } from 'rxjs';

interface Message {
  text: string;
  sent: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private db: Database) {
    const dbRef = ref(this.db, 'messages');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.messages = Object.values(data);
      }
    });
  }

  ngOnInit() {}

  sendMessage() {
    if (this.newMessage.trim().length === 0) {
      return;
    }

    const message: Message = { text: this.newMessage, sent: true };
    const newMessageRef = push(child(ref(this.db), 'messages'));
    set(newMessageRef, message);
    this.newMessage = '';
  }
}
