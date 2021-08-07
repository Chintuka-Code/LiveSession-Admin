import * as moment from 'moment';

export const Calculate_time = (data: any[]) => {
  return data.map((chat) => {
    if (chat.last_message) {
      var duration = moment.duration(
        moment(new Date()).diff(chat.last_message)
      );
      var seconds = duration.asSeconds();
      chat['notification'] = seconds;
    }

    return chat;
  });
};
