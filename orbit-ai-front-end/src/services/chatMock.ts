export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  attachments?: { name: string; size: string }[];
  suggestions?: string[];
}

export interface ChatThread {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const initialThreads: ChatThread[] = [
  {
    id: "thread-1",
    title: "Tối ưu kiến trúc Spring Boot & JWT",
    preview: "Cấu hình HttpOnly Cookie cho Refresh Token...",
    updatedAt: "10:24 AM",
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "Làm sao để lưu Refresh Token an toàn trên trình duyệt khi dùng React và Spring Boot?",
        timestamp: "10:22 AM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "Cách an toàn nhất là lưu **Refresh Token** trong `HttpOnly`, `Secure`, `SameSite=Strict` cookie do backend trả về, còn **Access Token** (thời hạn ngắn 15 phút) giữ trong bộ nhớ (in-memory state) của React.\n\nKhi Access Token hết hạn, Axios interceptor sẽ tự động gọi `/api/v1/auth/refresh` để nhận token mới mà JavaScript không bao giờ chạm trực tiếp vào Refresh Token.",
        timestamp: "10:24 AM",
        suggestions: [
          "Viết mẫu Axios interceptor tự động refresh",
          "Cấu hình CORS trên Spring Security",
        ],
      },
    ],
  },
  {
    id: "thread-2",
    title: "Lộ trình ôn tập JLPT N3 tháng tới",
    preview: "Phân bổ 45 phút mỗi ngày cho Kanji và Đọc hiểu...",
    updatedAt: "Hôm qua",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "Giúp mình chia lịch học N3 trong 4 tuần tới với.",
        timestamp: "Hôm qua",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "Mình đã lên khung 45 phút/ngày cho bạn:\n- **15 phút sáng:** Ôn 15 từ vựng & 5 chữ Kanji mới.\n- **30 phút tối:** Làm 2 bài đọc hiểu ngắn (短文) và tổng hợp ngữ pháp theo mẫu câu.",
        timestamp: "Hôm qua",
      },
    ],
  },
  {
    id: "thread-3",
    title: "Tổng hợp task sprint tuần này",
    preview: "Còn 3 task ưu tiên cao cần hoàn thành trước thứ 6...",
    updatedAt: "25 Th11",
    messages: [
      {
        id: "m-5",
        role: "assistant",
        content:
          "Chào Thanh! Bạn muốn mình tóm tắt tiến độ các task hiện tại hay lên kế hoạch cho buổi làm việc hôm nay?",
        timestamp: "25 Th11",
      },
    ],
  },
];

export const quickPrompts = [
  {
    title: "Tóm tắt công việc hôm nay",
    desc: "Kiểm tra lịch trình, deadline và các task ưu tiên",
    prompt: "Tóm tắt các công việc ưu tiên của tôi trong hôm nay.",
  },
  {
    title: "Review & tối ưu đoạn code",
    desc: "Phân tích hiệu năng, clean code và bảo mật",
    prompt: "Hãy giúp tôi review đoạn code sau theo chuẩn SOLID:",
  },
  {
    title: "Lên kế hoạch học tập",
    desc: "Chia nhỏ mục tiêu theo từng ngày trong tuần",
    prompt: "Tạo cho tôi lịch học tập 7 ngày tới thật khoa học.",
  },
  {
    title: "Soạn thảo tài liệu kỹ thuật",
    desc: "Viết README, API spec hoặc báo cáo hệ thống",
    prompt: "Giúp tôi viết khung tài liệu kiến trúc hệ thống cho dự án mới.",
  },
];
