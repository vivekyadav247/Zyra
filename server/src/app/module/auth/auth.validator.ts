import { z } from "zod";

export const GoogleLoginSchema = z.object({
  idToken: z.string().trim().min(1, "Google ID token is required."),
});

export const RefreshTokenSchema = z.object({});

export const LogoutSchema = z.object({});
