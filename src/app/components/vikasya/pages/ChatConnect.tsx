import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Video, MoreHorizontal, Search, CheckCheck, Smile } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

interface Message {
  id: number;
  text: string;
  from: "me" | "them";
  time: string;
  status?: "sent" | "delivered" | "read";
}

const conversations = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Volunteer — Digital Skills",
    avatar: "A",
    color: "bg-sky-100 text-sky-700",
    lastMsg: "Great progress today! You remembered all the steps 😊",
    time: "4:12 PM",
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: "Namaste Kamala ji! Ready for today's lesson?", from: "them", time: "3:55 PM" },
      { id: 2, text: "Namaste! Yes, I've been practicing yesterday's steps", from: "me", time: "3:57 PM" },
      { id: 3, text: "Wonderful! Let's continue with WhatsApp groups today", from: "them", time: "3:58 PM" },
      { id: 4, text: "OK, I am ready. I also showed my neighbor how to call her son yesterday 😊", from: "me", time: "4:02 PM" },
      { id: 5, text: "That is amazing! You are already helping others. That's the spirit!", from: "them", time: "4:05 PM" },
      { id: 6, text: "Great progress today! You remembered all the steps 😊", from: "them", time: "4:12 PM", status: "read" },
    ] as Message[],
  },
  {
    id: 2,
    name: "Grace Foundation",
    role: "Your Organization",
    avatar: "G",
    color: "bg-violet-100 text-violet-700",
    lastMsg: "Your next health checkup is scheduled for June 18.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Good morning! Your next health checkup is scheduled for June 18.", from: "them", time: "Yesterday, 10:00 AM" },
      { id: 2, text: "Please make sure to fast from 8 PM the night before. Dr. Lakshmi will be visiting.", from: "them", time: "Yesterday, 10:01 AM" },
      { id: 3, text: "Thank you for letting me know. I will be ready.", from: "me", time: "Yesterday, 11:30 AM" },
    ] as Message[],
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Volunteer — Art & Digital",
    avatar: "P",
    color: "bg-pink-100 text-pink-700",
    lastMsg: "Can we move Saturday's session to 11 AM?",
    time: "Mon",
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: "Hi! I wanted to check if you enjoy the drawing sessions?", from: "them", time: "Monday, 2:00 PM" },
      { id: 2, text: "Oh yes very much! My hands are a little slow but I enjoy it", from: "me", time: "Monday, 2:15 PM" },
      { id: 3, text: "Can we move Saturday's session to 11 AM?", from: "them", time: "Monday, 3:00 PM" },
    ] as Message[],
  },
];

export function ChatConnect({ nav }: { nav: NavCtx }) {
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const [searchConv, setSearchConv] = useState("");
  const [allConvs, setAllConvs] = useState(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const active = allConvs.find(c => c.id === activeId)!;

  const filteredConvs = allConvs.filter(c =>
    searchConv === "" ||
    c.name.toLowerCase().includes(searchConv.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(searchConv.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msgText = input.trim();
    const newMsg: Message = {
      id: Date.now(),
      text: msgText,
      from: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setAllConvs(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], lastMsg: msgText, unread: 0 }
        : c
    ));
    setInput("");

    // Simulate a reply after 1.5 seconds
    const activeConv = allConvs.find(c => c.id === activeId);
    if (activeConv) {
      const replies = [
        "That's great to hear! 😊",
        "Of course, I'll be happy to help with that.",
        "Thank you for sharing! Let's continue tomorrow.",
        "Very good progress! Keep it up!",
        "I'll get back to you on that shortly.",
        "That makes sense. See you at the next session!",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setTimeout(() => {
        const replyMsg: Message = {
          id: Date.now() + 1,
          text: reply,
          from: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
        };
        setAllConvs(prev => prev.map(c =>
          c.id === activeId
            ? { ...c, messages: [...c.messages, replyMsg], lastMsg: reply }
            : c
        ));
      }, 1500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl border border-border overflow-hidden flex" style={{ height: "calc(100vh - 180px)", minHeight: 500 }}>
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-3">Messages</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search conversations..."
                value={searchConv}
                onChange={e => setSearchConv(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-muted/40 transition-colors border-b border-border/50 ${
                  activeId === c.id ? "bg-sky-50 border-l-2 border-l-primary" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center font-semibold text-sm`}>
                    {c.avatar}
                  </div>
                  {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-1">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {c.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full ${active.color} flex items-center justify-center font-semibold text-sm`}>
                {active.avatar}
              </div>
              {active.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{active.name}</p>
              <p className="text-xs text-muted-foreground">{active.role} {active.online && "· Online now"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50">
            {active.messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs lg:max-w-sm ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white border border-border text-foreground rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground px-1">
                    <span>{msg.time}</span>
                    {msg.from === "me" && msg.status === "read" && (
                      <CheckCheck className="w-3 h-3 text-primary" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-border bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
