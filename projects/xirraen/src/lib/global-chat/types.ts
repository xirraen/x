export type ContactPlatform = "x" | "telegram" | "unknown";
export type MessageRole = "guest" | "admin";

export type ChatProfile = {
  guestId: string;
  displayName: string;
  contactHandle?: string;
  contactPlatform?: ContactPlatform;
};

export type ChatMessage = {
  id: string;
  displayName: string;
  contactHandle: string | null;
  contactPlatform: ContactPlatform;
  content: string;
  role: MessageRole;
  createdAt: string;
};
