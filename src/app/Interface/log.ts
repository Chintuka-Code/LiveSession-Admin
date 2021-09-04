export interface LOG {
  html_content: String;
  user_id: String;
  log_code: String;
  chat_id?: String | null;
  batch_id?: String | null;
  created_at?: Date;
}
