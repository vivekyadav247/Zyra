import { OAuth2Client } from "google-auth-library";

import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export interface GoogleUserPayload {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  emailVerified: boolean;
}

export class GoogleProvider {
  static async verifyIdToken(idToken: string): Promise<GoogleUserPayload> {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw ApiError.unauthorized("Invalid Google ID Token.");
    }

    if (!payload.email) {
      throw ApiError.unauthorized("Google account email is missing.");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      firstName: payload.given_name ?? "",
      lastName: payload.family_name ?? "",
      avatarUrl: payload.picture ?? "",
      emailVerified: payload.email_verified ?? false,
    };
  }
}
