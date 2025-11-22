import { ChatStatus } from "../../../enums/chat-status.enum";

export interface ChatState {
  threadId: string;
  locale?: string;
  status: ChatStatus;
  isPending: boolean;
  input: string;
  enabled: boolean;
  abortController?: AbortController;
}

export const initialChatState: ChatState = {
  status: ChatStatus.Idle,
  input: "",
  threadId: "",
  enabled: true,
  isPending: false,
};
