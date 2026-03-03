import { useCallback } from "react";

/**
 * useCartFly — khi gọi `flyToCart(sourceEl)`,
 * tạo 1 element nhỏ bay từ vị trí sourceEl đến icon giỏ hàng (#cart-icon).
 */
export function useCartFly() {
  const flyToCart = useCallback((sourceEl: HTMLElement) => {
    const cartEl = document.getElementById("cart-icon");
    if (!cartEl) return;

    const srcRect = sourceEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    // Tạo "đạn" bay
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #D9D9D9;
      border: 2px solid white;
      pointer-events: none;
      top: ${srcRect.top + srcRect.height / 2 - 10}px;
      left: ${srcRect.left + srcRect.width / 2 - 10}px;
      transition: top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  transform 0.6s ease,
                  opacity 0.6s ease;
      transform: scale(1);
      opacity: 1;
    `;
    document.body.appendChild(dot);

    // Trigger: bay đến cart icon
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dot.style.top = `${cartRect.top + cartRect.height / 2 - 10}px`;
        dot.style.left = `${cartRect.left + cartRect.width / 2 - 10}px`;
        dot.style.transform = "scale(0.3)";
        dot.style.opacity = "0";
      });
    });

    // Xóa sau khi xong + nhảy cart icon
    setTimeout(() => {
      dot.remove();
      // Bounce cart icon
      cartEl.classList.add("cart-bounce");
      setTimeout(() => cartEl.classList.remove("cart-bounce"), 400);
    }, 650);
  }, []);

  return { flyToCart };
}
