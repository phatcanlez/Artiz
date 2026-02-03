import productsMock from "@/mock/products.json";
import dashboardSummaryMock from "@/mock/admin-dashboard-summary.json";
import adminUsersMock from "@/mock/admin-users.json";
import adminOrdersMock from "@/mock/admin-orders.json";
import adminBlogMock from "@/mock/admin-blog.json";
import authMock from "@/mock/auth.json";

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
  size?: string;
  material?: string;
  productPolicy?: string;
  productPreservation?: string;
  deliveryTax?: string;
  stock: number;
  averageRating: number;
  reviewCount: number;
}

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Mock login: luôn trả về user mock, bỏ qua mật khẩu (chỉ dùng để demo giao diện)
    console.info("[MockAPI] login called with", credentials);
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(() => resolve(authMock as AuthResponse), 400);
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Mock register: giả lập đăng ký thành công và trả về user mock
    console.info("[MockAPI] register called with", data);
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(() => resolve(authMock as AuthResponse), 400);
    });
  }

  // Product endpoints
  async getProducts(search?: string): Promise<Product[]> {
    let products = productsMock as Product[];

    if (search) {
      const lower = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower)
      );
    }

    return new Promise<Product[]>((resolve) => {
      setTimeout(() => resolve(products), 300);
    });
  }

  async getProduct(id: number): Promise<Product> {
    const products = productsMock as Product[];
    const found = products.find((p) => p.id === id);
    if (!found) {
      throw new Error("Product not found in mock data");
    }

    return new Promise<Product>((resolve) => {
      setTimeout(() => resolve(found), 300);
    });
  }

  // Generic request for admin endpoints or custom calls
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const method = (options.method || "GET").toUpperCase();

    // Dashboard summary
    if (endpoint === "/admin/dashboard/summary" && method === "GET") {
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(dashboardSummaryMock as T), 300);
      });
    }

    // Admin users
    if (endpoint === "/admin/users" && method === "GET") {
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(adminUsersMock as T), 300);
      });
    }

    // Admin orders
    if (endpoint === "/admin/orders" && method === "GET") {
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(adminOrdersMock as T), 300);
      });
    }

    if (endpoint.startsWith("/admin/orders/") && method === "PUT") {
      // Giả lập cập nhật trạng thái đơn hàng, không lưu lại (UI chỉ cần thành công)
      console.info("[MockAPI] update order status", endpoint, options.body);
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(undefined as T), 200);
      });
    }

    // Admin products
    if (endpoint === "/admin/products" && method === "GET") {
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(productsMock as T), 300);
      });
    }

    if (endpoint === "/admin/products" && method === "POST") {
      console.info("[MockAPI] create product", options.body);
      const body = options.body
        ? (JSON.parse(options.body as string) as Partial<Product>)
        : {};
      const mockProduct: Product = {
        id:
          (productsMock as Product[]).reduce(
            (max, p) => Math.max(max, p.id),
            0
          ) + 1,
        name: body.name ?? "New Mock Product",
        description: body.description ?? "",
        price: body.price ?? 0,
        imageUrl:
          body.imageUrl ??
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        size: body.size,
        material: body.material,
        productPolicy: body.productPolicy,
        productPreservation: body.productPreservation,
        deliveryTax: body.deliveryTax,
        stock: body.stock ?? 0,
        averageRating: 5,
        reviewCount: 0,
      };

      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(mockProduct as T), 300);
      });
    }

    if (endpoint.startsWith("/admin/products/") && method === "PUT") {
      console.info("[MockAPI] update product", endpoint, options.body);
      const body = options.body
        ? (JSON.parse(options.body as string) as Partial<Product>)
        : {};

      const mockProduct: Product = {
        id: Number(endpoint.split("/").pop()),
        name: body.name ?? "Updated Mock Product",
        description: body.description ?? "",
        price: body.price ?? 0,
        imageUrl:
          body.imageUrl ??
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        size: body.size,
        material: body.material,
        productPolicy: body.productPolicy,
        productPreservation: body.productPreservation,
        deliveryTax: body.deliveryTax,
        stock: body.stock ?? 0,
        averageRating: 5,
        reviewCount: 0,
      };

      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(mockProduct as T), 300);
      });
    }

    if (endpoint.startsWith("/admin/products/") && method === "DELETE") {
      console.info("[MockAPI] delete product", endpoint);
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(undefined as T), 200);
      });
    }

    // Admin blog
    if (endpoint === "/admin/blog" && method === "GET") {
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(adminBlogMock as T), 300);
      });
    }

    if (endpoint === "/admin/blog" && method === "POST") {
      console.info("[MockAPI] create blog", options.body);
      const body = options.body ? JSON.parse(options.body as string) : {};
      const mockPost = {
        id:
          (adminBlogMock as { id: number }[]).reduce(
            (max, p) => Math.max(max, p.id),
            0
          ) + 1,
        createdAt: new Date().toISOString(),
        isPublished: true,
        ...body,
      };
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(mockPost as T), 300);
      });
    }

    if (endpoint.startsWith("/admin/blog/") && method === "PUT") {
      console.info("[MockAPI] update blog", endpoint, options.body);
      const body = options.body ? JSON.parse(options.body as string) : {};
      const id = Number(endpoint.split("/").pop());
      const mockPost = {
        id,
        createdAt: new Date().toISOString(),
        isPublished: true,
        ...body,
      };
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(mockPost as T), 300);
      });
    }

    if (endpoint.startsWith("/admin/blog/") && method === "DELETE") {
      console.info("[MockAPI] delete blog", endpoint);
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(undefined as T), 200);
      });
    }

    console.warn("[MockAPI] Unhandled mock endpoint", endpoint, options);
    return new Promise<T>((_resolve, reject) => {
      reject(new Error(`No mock implemented for endpoint: ${endpoint}`));
    });
  }
}

export const apiClient = new ApiClient();
