// Google OAuth Configuration for AlgoArena

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface GoogleAuthResponse {
  access_token: string;
  id_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}

class GoogleAuthService {
  private clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "demo-client-id";
  private isInitialized = false;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Load Google Identity Services
      if (typeof window !== "undefined" && !window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          this.isInitialized = true;
          resolve();
        };
        script.onerror = () =>
          reject(new Error("Failed to load Google Identity Services"));
        document.head.appendChild(script);
      } else {
        this.isInitialized = true;
        resolve();
      }
    });
  }

  async signInWithPopup(): Promise<GoogleUser> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      // For demo purposes, we'll simulate a successful Google login
      // In production, you would use the actual Google Identity Services

      if (this.clientId === "demo-client-id") {
        // Demo mode - return mock Google user data
        setTimeout(() => {
          const mockGoogleUser: GoogleUser = {
            id: "google_demo_123",
            name: "Demo Google User",
            email: "demo@gmail.com",
            picture: "https://via.placeholder.com/96x96/4285f4/ffffff?text=G",
            given_name: "Demo",
            family_name: "User",
          };
          resolve(mockGoogleUser);
        }, 1000);
        return;
      }

      // Production Google OAuth implementation
      try {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: this.clientId,
            callback: (response: any) => {
              // Decode the JWT token to get user info
              const payload = this.parseJwt(response.credential);
              const googleUser: GoogleUser = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                given_name: payload.given_name,
                family_name: payload.family_name,
              };
              resolve(googleUser);
            },
            error_callback: (error: any) => {
              reject(new Error(`Google Sign-In failed: ${error.error}`));
            },
          });

          // Trigger the sign-in flow
          window.google.accounts.id.prompt((notification: any) => {
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment()
            ) {
              // Fallback to popup
              window.google.accounts.oauth2
                .initTokenClient({
                  client_id: this.clientId,
                  scope: "email profile",
                  callback: (response: GoogleAuthResponse) => {
                    // Get user info with the access token
                    this.getUserInfo(response.access_token)
                      .then(resolve)
                      .catch(reject);
                  },
                })
                .requestAccessToken();
            }
          });
        } else {
          reject(new Error("Google Identity Services not loaded"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const userInfo = await response.json();
    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      given_name: userInfo.given_name,
      family_name: userInfo.family_name,
    };
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error("Invalid JWT token");
    }
  }

  async signOut(): Promise<void> {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}

export const googleAuth = new GoogleAuthService();
