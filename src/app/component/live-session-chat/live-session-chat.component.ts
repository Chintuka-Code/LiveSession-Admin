import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-session-chat',
  templateUrl: './live-session-chat.component.html',
  styleUrls: ['./live-session-chat.component.scss'],
})
export class LiveSessionChatComponent implements OnInit {
  groupedCities: any[];
  spinner: boolean = false;

  constructor() {
    this.groupedCities = [
      {
        label: '1820',
        value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' },
        ],
      },
      {
        label: '1821',
        value: 'us',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' },
        ],
      },
    ];
  }

  textarea_auto_increment(event) {
    const tx = event.target;
    tx.style.height = 'auto';
    tx.style.height = tx.scrollHeight + 'px';
  }

  scroll_chat_container() {
    const div = document.getElementById('chat-body');
    if (div != null) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    } else {
      setTimeout(() => {
        this.scroll_chat_container();
      }, 200);
    }
  }

  ngOnInit(): void {
    this.scroll_chat_container();
  }
}
