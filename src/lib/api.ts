export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    isAdmin: boolean;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrls?: string[];
  model3DUrls?: string[];
  size?: string;
  material?: string;
  productPolicy?: string;
  productPreservation?: string;
  deliveryTax?: string;
  stock: number;
  averageRating: number;
  reviewCount: number;
}

// Orders (e-commerce)
export interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  shippingAddress: string;
  phone: string;
  fullName?: string;
  email?: string;
  city?: string;
  postalCode?: string;
  paymentMethod: string;
  items: CreateOrderItemRequest[];
}

export interface CreateOrderResponse {
  orderId: number;
  orderInvoiceNumber: string;
  totalAmount: number;
}

/** Request body cho API tạo checkout SePay (BE trả về CheckoutUrl + Fields đã ký). */
export interface SePayCheckoutRequest {
  OrderInvoiceNumber: string;
  OrderAmount: number;
  Currency: string;
  OrderDescription: string;
  PaymentMethod?: string;
  CustomerId?: string;
}

/** Response từ BE: URL và các field để FE submit form sang SePay (JSON camelCase). */
export interface SePayCheckoutResponse {
  checkoutUrl: string;
  fields: Record<string, string>;
}

export interface OrderItemDto {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderDto {
  id: number;
  orderInvoiceNumber: string;
  totalAmount: number;
  status: string;
  shippingAddress?: string;
  phone?: string;
  createdAt: string;
  items: OrderItemDto[];
}

/** Gửi phản hồi từ trang Contact (khách, không cần đăng nhập). */
export interface FeedbackSubmitRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/** Một bản ghi phản hồi (admin xem / trả lời). */
export interface FeedbackDto {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  adminReply?: string;
  createdAt: string;
  repliedAt?: string;
}

export interface ReviewDto {
  id: number;
  productId: number;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  helpfulVotes: number;
  createdAt: string;
  isHidden?: boolean;
}

export interface ReviewCreateRequest {
  productId: number;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
}

export interface BlogPostDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  isPublished: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

function getApiBaseUrl(): string {
  const env = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env;
  // Ưu tiên biến môi trường VITE_API_URL (dùng cho FE deploy trên Vercel trỏ đến BE Fly.io)
  // Khi dev local, nếu không set gì, mặc định dùng backend local trên http://localhost:5050
  return env?.VITE_API_URL ?? "http://localhost:5050";
}

// NOTE: Dự án đã chuyển sang dùng API thật từ BE. Không còn dùng mock cache trong FE.

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Auth endpoints — gọi API backend thật
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Đăng nhập thất bại");
    }
    return res.json() as Promise<AuthResponse>;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await fetch(`${getApiBaseUrl()}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Đăng ký thất bại");
    }
    return res.json() as Promise<AuthResponse>;
  }

  // Orders — tạo đơn hàng và lấy danh sách đơn của user
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập để đặt hàng");
    const res = await fetch(`${getApiBaseUrl()}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      // Token hết hạn / không hợp lệ -> bắt user đăng nhập lại
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại trước khi đặt hàng.");
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tạo đơn hàng thất bại");
    }
    return res.json() as Promise<CreateOrderResponse>;
  }

  /** Tạo thông tin checkout SePay (BE ký, FE nhận CheckoutUrl + Fields để submit form). */
  async createSePayCheckout(data: SePayCheckoutRequest): Promise<SePayCheckoutResponse> {
    const res = await fetch(`${getApiBaseUrl()}/api/payments/sepay/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tạo checkout SePay thất bại");
    }
    return res.json() as Promise<SePayCheckoutResponse>;
  }

  /** Tạo lại checkout SePay cho đơn đang chờ thanh toán (cần đăng nhập). */
  async createSePayCheckoutForOrder(orderId: number): Promise<SePayCheckoutResponse> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const res = await fetch(`${getApiBaseUrl()}/api/payments/sepay/checkout/order/${orderId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tạo checkout SePay thất bại");
    }
    return res.json() as Promise<SePayCheckoutResponse>;
  }

  /** Sau khi payment success, cập nhật trạng thái đơn -> "Chờ xác nhận". */
  async markOrderPaid(orderInvoiceNumber: string): Promise<{ message: string; status?: string }> {
    return this.request<{ message: string; status?: string }>("/payments/sepay/mark-paid", {
      method: "POST",
      body: JSON.stringify({ orderInvoiceNumber }),
    });
  }

  async getMyOrders(): Promise<OrderDto[]> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const res = await fetch(`${getApiBaseUrl()}/api/orders/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }
    if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");
    return res.json() as Promise<OrderDto[]>;
  }

  async getOrder(id: number): Promise<OrderDto> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const res = await fetch(`${getApiBaseUrl()}/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }
    if (res.status === 404) {
      throw new Error("Không tìm thấy đơn hàng.");
    }
    if (!res.ok) {
      throw new Error("Không thể tải chi tiết đơn hàng.");
    }
    return res.json() as Promise<OrderDto>;
  }

  /** Lấy danh sách phản hồi của user đang đăng nhập. */
  async getMyFeedback(): Promise<FeedbackDto[]> {
    return this.request<FeedbackDto[]>("/contact/feedback/my");
  }

  async getReviewsByProduct(productId: number): Promise<ReviewDto[]> {
    return this.request<ReviewDto[]>(`/reviews/product/${productId}`);
  }

  async createReview(payload: ReviewCreateRequest): Promise<ReviewDto> {
    return this.request<ReviewDto>("/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getBlogPosts(): Promise<BlogPostDto[]> {
    return this.request<BlogPostDto[]>("/blog");
  }

  async getBlogPost(id: number): Promise<BlogPostDto> {
    return this.request<BlogPostDto>(`/blog/${id}`);
  }

  /** Tối ưu file .glb (Admin utility). Trả về file blob để tải về. */
  async optimateGlb(file: File): Promise<{ blob: Blob; headers: Headers }> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập (Admin) để dùng tiện ích này");

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${getApiBaseUrl()}/api/tools/optimate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn hoặc bạn không có quyền. Vui lòng đăng nhập lại.");
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? `Tối ưu thất bại (${res.status})`);
    }

    const blob = await res.blob();
    return { blob, headers: res.headers };
  }

  /** Gửi phản hồi từ trang Contact (không cần đăng nhập). */
  async submitFeedback(data: FeedbackSubmitRequest): Promise<{ message: string }> {
    // Use the shared request() helper so FE always hits the same base URL + /api prefix logic
    // (and gets consistent error handling).
    return this.request<{ message: string }>("/contact/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** Upload ảnh lên R2 (Admin). Trả về URL công khai. */
  async uploadProductImage(file: File): Promise<{ url: string }> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${getApiBaseUrl()}/api/storage/upload/image?folder=products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn.");
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tải ảnh lên thất bại");
    }
    return res.json() as Promise<{ url: string }>;
  }

  /** Upload ảnh thumbnail cho blog lên R2 (Admin). Trả về URL công khai. */
  async uploadBlogImage(file: File): Promise<{ url: string }> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${getApiBaseUrl()}/api/storage/upload/image?folder=blog`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn.");
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tải ảnh lên thất bại");
    }
    return res.json() as Promise<{ url: string }>;
  }

  /** Upload file 3D (.glb, .gltf) lên R2. Trả về URL công khai. */
  async uploadProduct3D(file: File): Promise<{ url: string }> {
    const token = this.getAuthToken();
    if (!token) throw new Error("Bạn cần đăng nhập");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${getApiBaseUrl()}/api/storage/upload/3d?folder=models`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn.");
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { message?: string }).message ?? "Tải file 3D lên thất bại");
    }
    return res.json() as Promise<{ url: string }>;
  }

  // Product endpoints
  async getProducts(search?: string): Promise<Product[]> {
    const url = new URL(`${getApiBaseUrl()}/api/products`);
    url.searchParams.set("lite", "true");
    if (search) url.searchParams.set("search", search);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
    return res.json() as Promise<Product[]>;
  }

  async getProduct(id: number): Promise<Product> {
    const res = await fetch(`${getApiBaseUrl()}/api/products/${id}`);
    if (res.status === 404) throw new Error("Không tìm thấy sản phẩm");
    if (!res.ok) throw new Error("Không thể tải thông tin sản phẩm");
    return res.json() as Promise<Product>;
  }

  // Generic request for admin endpoints or custom calls (REAL backend)
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) {
      (headers as any).Authorization = `Bearer ${token}`;
    }
    const path = endpoint.startsWith("/api") ? endpoint : `/api${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
    const res = await fetch(`${getApiBaseUrl()}${path}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Phiên đăng nhập đã hết hạn hoặc bạn không có quyền. Vui lòng đăng nhập lại.");
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = (err as { message?: string }).message;
      throw new Error(msg ?? `Yêu cầu thất bại (${res.status})`);
    }

    if (res.status === 204) {
      // NoContent
      return undefined as T;
    }

    return res.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient();
