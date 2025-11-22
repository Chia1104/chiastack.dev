import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CAPTCHA_PROVIDER: z
      .enum(["cloudflare-turnstile", "google-recaptcha"])
      .default("cloudflare-turnstile"),
  },
  server: {
    CAPTCHA_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CAPTCHA_PROVIDER:
      process.env.NEXT_PUBLIC_CAPTCHA_PROVIDER ?? "cloudflare-turnstile",
    CAPTCHA_SECRET_KEY:
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? process.env.NEXT_PUBLIC_CAPTCHA_PROVIDER === "google-recaptcha"
          ? "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
          : "1x0000000000000000000000000000000AA"
        : process.env.CAPTCHA_SECRET_KEY,
  },

  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.SKIP_ENV_VALIDATION === "1",
  emptyStringAsUndefined: true,
  extends: [],
});
