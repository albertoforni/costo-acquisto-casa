/**
 * Minimal analytics utility - tracks only page visits and basic button actions
 * Keeps user data completely anonymous
 */

class Analytics {
  private isGA4Available = false;

  constructor() {
    // Check if Google Analytics 4 is available
    if (typeof window !== "undefined" && window.gtag) {
      this.isGA4Available = true;
    }
  }

  /**
   * Track a basic event with Google Analytics 4
   */
  private track(action: string, category: string = "user_action") {
    // Google Analytics 4 (FREE)
    if (this.isGA4Available && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
      });
    }

    // Console log in development for debugging
    if (import.meta.env.DEV) {
      console.log("📊 GA4 Event:", action, { category });
    }
  }

  /**
   * Track Save button click
   */
  trackSave() {
    this.track("save_clicked", "button");
  }

  /**
   * Track Load button click
   */
  trackLoad() {
    this.track("load_clicked", "button");
  }

  /**
   * Track Share button click
   */
  trackShare() {
    this.track("share_clicked", "button");
  }
}

// Global analytics instance
export const analytics = new Analytics();

// Type declarations for Google Analytics 4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
