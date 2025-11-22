import type { MessageItem } from "../../../types/message";

export interface MessageState<TMessageItem extends MessageItem> {
  items: TMessageItem[];
  currentStream: string | null;
}

export const initialMessageState: MessageState<MessageItem> = {
  items: [],
  currentStream: null,
};
