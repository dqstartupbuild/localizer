import type { z } from "zod";
import type { projectStateSchema } from "~/server/localizer/schemas/projectState/projectStateSchema";

export type ProjectState = z.infer<typeof projectStateSchema>;
