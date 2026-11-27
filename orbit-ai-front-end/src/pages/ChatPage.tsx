import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bot,
  Check,
  Copy,
  Menu,
  MessageSquarePlus,
  Paperclip,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SendHorizontal,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  type ChatMessage,
  type ChatThread,
  initialThreads,
  quickPrompts,
} from "../services/chatMock";

interface ChatPageProps {
  onOpenMobileMenu?: () => void;
}

let messageSeq = 0;

function createClientId(prefix: string) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  messageSeq += 1;
  return `${prefix}-${messageSeq}`;
}

export function ChatPage({ onOpenMobileMenu }: ChatPageProps) {
  const { threadId } = useParams<{ threadId?: string }>();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showThreadList, setShowThreadList] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const activeThread = threadId
    ? (threads.find((t) => t.id === threadId) ?? null)
    : (threads[0] ?? null);

  const filteredThreads = threads.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages.length, isTyping]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  const handleCreateNewChat = () => {
    const newId = createClientId("thread");
    const newThread: ChatThread = {
      id: newId,
      title: "Cuộc trò chuyện mới",
      preview: "Bắt đầu đặt câu hỏi cho Orbit AI...",
      updatedAt: "Vừa xong",
      messages: [],
    };
    setThreads((prev) => [newThread, ...prev]);
    navigate(`/chat/${newId}`);
    setInput("");
    textareaRef.current?.focus();
  };

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) => {
      const remaining = prev.filter((t) => t.id !== id);
      if (activeThread?.id === id) {
        navigate(remaining[0] ? `/chat/${remaining[0].id}` : "/chat", {
          replace: true,
        });
      }
      return remaining;
    });
  };

  const handleSendMessage = (customPrompt?: string) => {
    const text = (customPrompt ?? input).trim();
    if (!text || isTyping) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: ChatMessage = {
      id: createClientId("msg"),
      role: "user",
      content: text,
      timestamp: now,
    };

    let targetThreadId = activeThread?.id;

    if (!targetThreadId) {
      const createdId = createClientId("thread");
      const newThread: ChatThread = {
        id: createdId,
        title: text.slice(0, 36) + (text.length > 36 ? "..." : ""),
        preview: text,
        updatedAt: now,
        messages: [userMessage],
      };
      setThreads([newThread]);
      navigate(`/chat/${createdId}`);
      targetThreadId = createdId;
    } else {
      setThreads((prev) =>
        prev.map((thread) => {
          if (thread.id !== targetThreadId) return thread;
          const isFirstMessage = thread.messages.length === 0;
          return {
            ...thread,
            title: isFirstMessage
              ? text.slice(0, 36) + (text.length > 36 ? "..." : "")
              : thread.title,
            preview: text,
            updatedAt: now,
            messages: [...thread.messages, userMessage],
          };
        }),
      );
    }

    if (!customPrompt) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const assistantReply: ChatMessage = {
        id: createClientId("msg"),
        role: "assistant",
        content: `Mình đã nhận được yêu cầu: **"${text}"**.\n\nDưới đây là gợi ý triển khai nhanh dành cho bạn:\n1. Xác định rõ đầu vào/đầu ra và các ràng buộc chính.\n2. Chia nhỏ thành từng module độc lập để dễ kiểm thử.\n3. Kiểm tra lại hiệu năng và edge-case trước khi hoàn tất.\n\nBạn muốn mình đi sâu vào phần nào trước?`,
        timestamp: replyTime,
        suggestions: ["Triển khai chi tiết bước 1", "Tạo checklist kiểm thử"],
      };

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === targetThreadId
            ? {
                ...thread,
                preview: assistantReply.content.slice(0, 52) + "...",
                updatedAt: replyTime,
                messages: [...thread.messages, assistantReply],
              }
            : thread,
        ),
      );
      setIsTyping(false);
    }, 700);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-44px)] min-h-[580px] flex-col gap-[16px] min-[761px]:h-[calc(100vh-64px)]">
      {/* Main Split Container */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-[18px] border border-border bg-surface">
        {/* Left Thread Sidebar */}
        {showThreadList && (
          <aside className="flex w-[290px] shrink-0 flex-col border-r border-border bg-surface max-[960px]:w-[240px] max-[640px]:w-full">
            {/* History Header with Icon Actions */}
            <div className="flex items-center justify-between border-b border-border px-[14px] py-[12px]">
              <div className="flex items-center gap-[8px]">
                {onOpenMobileMenu && (
                  <button
                    type="button"
                    onClick={onOpenMobileMenu}
                    className="hidden cursor-pointer rounded-[8px] border border-border bg-bg p-[6px] text-text hover:bg-surface-muted max-[760px]:inline-flex"
                    aria-label="Mở menu điều hướng"
                  >
                    <Menu size={16} />
                  </button>
                )}
                <span className="text-[13px] font-semibold text-text">
                  Lịch sử chat
                </span>
              </div>

              <div className="flex items-center gap-[6px]">
                <button
                  type="button"
                  onClick={handleCreateNewChat}
                  className="grid h-[32px] w-[32px] cursor-pointer place-items-center rounded-[9px] border-0 bg-primary text-white transition-opacity hover:opacity-90"
                  title="Đoạn chat mới"
                  aria-label="Đoạn chat mới"
                >
                  <MessageSquarePlus size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowThreadList(false)}
                  className="grid h-[32px] w-[32px] cursor-pointer place-items-center rounded-[9px] border border-border bg-bg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
                  title="Ẩn lịch sử chat"
                  aria-label="Ẩn lịch sử chat"
                >
                  <PanelLeftClose size={16} />
                </button>
              </div>
            </div>

            <div className="p-[14px]">
              <div className="relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute top-1/2 left-[12px] -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm cuộc trò chuyện..."
                  className="w-full rounded-[10px] border border-border bg-bg py-[8px] pr-[12px] pl-[34px] text-[13px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 space-y-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-[18px] overflow-y-auto px-[10px] pb-[14px]">
              {filteredThreads.length === 0 ? (
                <div className="px-[12px] py-[28px] text-center text-[13px] text-text-muted">
                  Không tìm thấy cuộc trò chuyện phù hợp.
                </div>
              ) : (
                filteredThreads.map((thread) => {
                  const isSelected = thread.id === activeThread?.id;
                  return (
                    <div
                      key={thread.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/chat/${thread.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`/chat/${thread.id}`);
                        }
                      }}
                      className={`group flex cursor-pointer items-start justify-between gap-[8px] rounded-[12px] p-[11px] transition-colors ${
                        isSelected
                          ? "bg-primary-soft text-primary"
                          : "text-text hover:bg-surface-muted"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[13px] font-semibold ${
                            isSelected ? "text-primary" : "text-text"
                          }`}
                        >
                          {thread.title}
                        </span>
                        <p className="mt-[3px] truncate text-[12px] text-text-secondary">
                          {thread.preview}
                        </p>
                        <div className="mt-[6px] flex items-center gap-[8px]">
                          <span className="text-[11px] text-text-muted">
                            {thread.updatedAt}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteThread(thread.id, e)}
                        className="cursor-pointer rounded-[7px] border-0 bg-transparent p-[5px] text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:bg-bg hover:text-red-500"
                        title="Xóa cuộc trò chuyện"
                        aria-label="Xóa cuộc trò chuyện"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        )}

        {/* Right Active Conversation Panel */}
        <section
          className={`flex min-w-0 flex-1 flex-col bg-bg/40 ${
            showThreadList ? "max-[640px]:hidden" : "flex"
          }`}
        >
          {/* Conversation Top Bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface px-[20px] py-[13px]">
            <div className="flex min-w-0 items-center gap-[10px]">
              {!showThreadList && (
                <button
                  type="button"
                  onClick={() => setShowThreadList(true)}
                  className="grid h-[34px] w-[34px] shrink-0 cursor-pointer place-items-center rounded-[10px] border border-border bg-bg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
                  title="Hiện lịch sử chat"
                  aria-label="Hiện lịch sử chat"
                >
                  <PanelLeftOpen size={17} />
                </button>
              )}

              <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] bg-primary-soft text-primary">
                <Bot size={18} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-[14px] font-semibold text-text">
                  {activeThread?.title ?? "Orbit AI Workspace"}
                </h2>
                <div className="flex items-center gap-[6px] text-[11px] text-text-secondary">
                  <span className="inline-block h-[7px] w-[7px] rounded-full bg-emerald-500" />
                  <span>Sẵn sàng hỗ trợ • Context-aware</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-[18px] py-[22px] min-[761px]:px-[28px]">
            {!activeThread || activeThread.messages.length === 0 ? (
              <div className="mx-auto flex h-full max-w-[680px] flex-col items-center justify-center text-center">
                <div className="grid h-[56px] w-[56px] place-items-center rounded-[16px] bg-primary-soft text-primary">
                  <Sparkles size={28} />
                </div>
                <h3 className="mt-[16px] text-[19px] font-bold text-text">
                  Hôm nay Orbit AI có thể giúp gì cho bạn?
                </h3>
                <p className="mt-[6px] max-w-[460px] text-[13px] leading-[1.5] text-text-secondary">
                  Chọn một gợi ý nhanh bên dưới hoặc nhập câu hỏi của bạn để bắt
                  đầu phiên làm việc mới.
                </p>

                <div className="mt-[24px] grid w-full grid-cols-1 gap-[10px] text-left sm:grid-cols-2">
                  {quickPrompts.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSendMessage(item.prompt)}
                      className="cursor-pointer rounded-[14px] border border-border bg-surface p-[14px] text-left transition-all hover:border-primary/50 hover:bg-surface-muted"
                    >
                      <div className="text-[13px] font-semibold text-text">
                        {item.title}
                      </div>
                      <div className="mt-[4px] text-[12px] text-text-secondary">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex max-w-[820px] flex-col gap-[18px]">
                {activeThread.messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-[12px] ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                          isUser
                            ? "bg-primary text-white"
                            : "bg-primary-soft text-primary"
                        }`}
                      >
                        {isUser ? "TP" : <Bot size={17} />}
                      </div>

                      <div
                        className={`flex max-w-[80%] flex-col ${
                          isUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-[16px] px-[16px] py-[12px] text-[14px] leading-[1.6] whitespace-pre-wrap ${
                            isUser
                              ? "rounded-tr-[4px] bg-primary text-white"
                              : "rounded-tl-[4px] border border-border bg-surface text-text"
                          }`}
                        >
                          {msg.content}
                        </div>

                        <div className="mt-[5px] flex items-center gap-[10px] px-[4px] text-[11px] text-text-muted">
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="inline-flex cursor-pointer items-center gap-[4px] border-0 bg-transparent p-0 text-text-muted hover:text-text"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check
                                    size={12}
                                    className="text-emerald-500"
                                  />
                                  <span className="text-emerald-500">
                                    Đã chép
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Sao chép</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {!isUser &&
                          msg.suggestions &&
                          msg.suggestions.length > 0 && (
                            <div className="mt-[8px] flex flex-wrap gap-[6px]">
                              {msg.suggestions.map((suggestion) => (
                                <button
                                  key={suggestion}
                                  type="button"
                                  onClick={() => handleSendMessage(suggestion)}
                                  className="cursor-pointer rounded-full border border-border bg-surface px-[11px] py-[5px] text-[12px] font-medium text-text-secondary transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-[12px]">
                    <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <Bot size={17} />
                    </div>
                    <div className="flex items-center gap-[5px] rounded-[16px] rounded-tl-[4px] border border-border bg-surface px-[16px] py-[13px]">
                      <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                      <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                      <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-primary" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Composer */}
          <div className="border-t border-border bg-surface px-[18px] py-[14px] min-[761px]:px-[28px]">
            <div className="mx-auto max-w-[820px]">
              <div className="flex items-end gap-[10px] rounded-[14px] border border-border bg-bg p-[8px] transition-colors focus-within:border-primary">
                <button
                  type="button"
                  className="grid h-[36px] w-[36px] shrink-0 cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
                  title="Đính kèm tệp"
                  aria-label="Đính kèm tệp"
                >
                  <Paperclip size={18} />
                </button>

                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn cho Orbit AI... (Enter để gửi, Shift + Enter để xuống dòng)"
                  className="max-h-[160px] min-h-[36px] flex-1 resize-none border-0 bg-transparent py-[7px] text-[14px] leading-[1.45] text-text placeholder:text-text-muted focus:outline-none"
                />

                <button
                  type="button"
                  disabled={!input.trim() || isTyping}
                  onClick={() => handleSendMessage()}
                  className="grid h-[36px] w-[36px] shrink-0 cursor-pointer place-items-center rounded-[10px] border-0 bg-primary text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Gửi tin nhắn"
                >
                  <SendHorizontal size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
