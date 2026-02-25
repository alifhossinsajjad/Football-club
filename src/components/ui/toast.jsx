"use client";

import { CheckCircle } from "lucide-react";

let toastContainer = null;

export function showSuccessToast(
  title = "Success!",
  message = "Operation completed successfully"
) {
  // Create container if it doesn't exist
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.style.cssText = `
    background: linear-gradient(135deg, #04B5A3 0%, #9C27B0 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 229, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
    font-family: 'Poppins', sans-serif;
  `;

  toast.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <div>
      <p style="font-weight: 600; margin: 0; font-size: 14px;">${title}</p>
      <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 12px;">${message}</p>
    </div>
  `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  if (!document.getElementById("toast-styles")) {
    style.id = "toast-styles";
    document.head.appendChild(style);
  }

  toastContainer.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-in forwards";
    setTimeout(() => {
      toastContainer.removeChild(toast);
      // Remove container if empty
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
        toastContainer = null;
      }
    }, 300);
  }, 3000);
}
