'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// Lets the FAB, hero/CTA buttons and the Chatbot panel share one open/closed state.
const ChatContext = createContext<{ open: boolean; setOpen: (o: boolean) => void }>({ open: false, setOpen: () => {} });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ChatContext.Provider value={{ open, setOpen }}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);
