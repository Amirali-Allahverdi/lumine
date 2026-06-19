export interface PortfolioPayload {
  full_body_url: File;
  full_shot_url: File;
}

export interface PortfolioResponse {
  success: boolean;
  message: string;
  data: {
    full_body_url: string;
    full_shot_url: string;
  };
}
