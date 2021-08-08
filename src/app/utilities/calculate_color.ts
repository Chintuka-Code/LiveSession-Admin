import * as moment from 'moment';

export const Calculate_time = (data: any[]) => {
  return data.map((chat) => {
    if (chat.last_message) {
      const duration = moment.duration(
        moment(new Date()).diff(chat.last_message)
      );
      const seconds = duration.asSeconds();
      chat['notification'] = seconds;
      const today = new Date().toISOString().split('T')[0];

      if (today === chat.is_todays_first.split('T')[0]) {
        chat.today_first = false;
      } else {
        chat.today_first = true;
      }
    }

    return chat;
  });
};
