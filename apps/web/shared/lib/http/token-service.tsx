import Cookies from "js-cookie";
import { rawAxios } from "./raw-axios";

interface RefreshResponse {
  access: string;
}

class TokenService {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  private static REFRESH_COOKIE = "refresh_token";

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }

  setRefreshToken(token: string): void {
    Cookies.set(TokenService.REFRESH_COOKIE, token, {
      expires: 7,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  getRefreshToken(): string | null {
    return Cookies.get(TokenService.REFRESH_COOKIE) ?? null;
  }

  clearRefreshToken(): void {
    Cookies.remove(TokenService.REFRESH_COOKIE, {
      path: "/",
    });
  }

  async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = this.performRefresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const { data } = await rawAxios.post<RefreshResponse>(
        "/auth/refresh-token/",
        { refresh: refreshToken },
      );
      console.log("refresh response:", data);

      if (!data.access) {
        throw new Error("Invalid refresh response");
      }

      this.setAccessToken(data.access);

      return data.access;
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response
        ?.status;

      if (status === 401 || status === 403) {
        this.clearAll();
      }

      throw error;
    }
  }

  clearAll(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
  }

  async initialize(): Promise<boolean> {
    console.log("initialize:start");

    if (this.accessToken) {
      console.log("initialize:has-access-token");
      return true;
    }

    const refreshToken = this.getRefreshToken();
    console.log("initialize:refresh-token", !!refreshToken);

    if (!refreshToken) {
      console.log("initialize:no-refresh-token");
      return false;
    }

    try {
      console.log("initialize:before-refresh");
      await this.refreshAccessToken();
      console.log("initialize:after-refresh");
      return true;
    } catch (error) {
      console.log("initialize:refresh-failed", error);
      return false;
    }
  }
}

export const tokenService = new TokenService();
