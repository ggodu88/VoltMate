import { useState, useEffect } from "react";

const USER_API_KEY_STORAGE = "voltmate_user_gemini_api_key";

export function getUserApiKey(): string {
  try {
    return localStorage.getItem(USER_API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export function setUserApiKey(key: string): void {
  try {
    if (!key || !key.trim()) {
      localStorage.removeItem(USER_API_KEY_STORAGE);
    } else {
      localStorage.setItem(USER_API_KEY_STORAGE, key.trim());
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("voltmate-apikey-updated"));
    }
  } catch (e) {
    console.error("Failed to save user API key", e);
  }
}

export function clearUserApiKey(): void {
  try {
    localStorage.removeItem(USER_API_KEY_STORAGE);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("voltmate-apikey-updated"));
    }
  } catch (e) {
    console.error("Failed to clear user API key", e);
  }
}

/**
 * Returns standard authorization or custom header object to send with fetch requests
 */
export function getApiAuthHeaders(): Record<string, string> {
  const userKey = getUserApiKey();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (userKey) {
    headers["x-gemini-api-key"] = userKey;
  }
  return headers;
}
