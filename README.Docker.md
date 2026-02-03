# Docker Setup Guide

## Build và chạy với Docker

### Cách 1: Sử dụng Docker Compose (Khuyến nghị)

```bash
# Build và chạy
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down
```

Ứng dụng sẽ chạy tại: http://localhost:8080

### Cách 2: Sử dụng Docker commands

```bash
# Build image
docker build -t pixel-perfect-frontend .

# Chạy container
docker run -d -p 8080:80 --name pixel-perfect-frontend pixel-perfect-frontend

# Xem logs
docker logs -f pixel-perfect-frontend

# Dừng và xóa container
docker stop pixel-perfect-frontend
docker rm pixel-perfect-frontend
```

## Cấu trúc

- `Dockerfile`: Multi-stage build (build với Node.js, serve với Nginx)
- `nginx.conf`: Cấu hình Nginx để serve static files và hỗ trợ React Router
- `docker-compose.yml`: File để dễ dàng quản lý container
- `.dockerignore`: Loại bỏ các file không cần thiết khi build

## Production Deployment

Để deploy lên production, bạn có thể:

1. Build image và push lên Docker Registry (Docker Hub, AWS ECR, etc.)
2. Pull và chạy trên server
3. Hoặc sử dụng các dịch vụ như AWS ECS, Google Cloud Run, Azure Container Instances

### Ví dụ với Docker Hub:

```bash
# Tag image
docker tag pixel-perfect-frontend yourusername/pixel-perfect-frontend:latest

# Push lên Docker Hub
docker push yourusername/pixel-perfect-frontend:latest

# Trên server production
docker pull yourusername/pixel-perfect-frontend:latest
docker run -d -p 80:80 --name frontend yourusername/pixel-perfect-frontend:latest
```

