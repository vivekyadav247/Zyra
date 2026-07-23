import { z } from "zod";

import { BaseDto } from "../../../common/dto/base.dto.js";

export default class GoogleLoginDto extends BaseDto {
  protected static override schema = z.object({
    idToken: z.string().trim().min(1, "Google ID token is required."),
  });
}
