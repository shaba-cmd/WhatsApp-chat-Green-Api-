export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface Message {
  id: string;    
  chatId: string;   
  text: string;
  direction: 'outgoing' | 'incoming';
  timestamp: number;  
}

export interface Chat {
  chatId: string;        
  phone: string;        
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface NotificationBody {
  typeWebhook: string;
  idMessage?: string;
  timestamp: number;
  senderData?: {
    chatId: string;
    sender: string;
    senderName?: string;
  };
  messageData?: {
    typeMessage: string;
    textMessageData?: { textMessage: string };
    extendedTextMessageData?: { text: string };
  };
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: NotificationBody;
}
