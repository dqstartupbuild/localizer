import { ZodError } from "zod";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";

export function localizerError(error: unknown) {
  if (error instanceof ZodError)
    return localizerJson(
      {
        error: {
          code: "invalid_request",
          message: "The request body is invalid.",
        },
      },
      { status: 400 },
    );
  const message =
    error instanceof Error ? error.message : "Unexpected server error.";
  const status = message.includes("not found")
    ? 404
    : message.includes("changed")
      ? 409
      : message.includes("unavailable")
        ? 503
        : 400;
  return localizerJson(
    {
      error: {
        code:
          status === 409
            ? "conflict"
            : status === 503
              ? "service_unavailable"
              : "request_failed",
        message,
      },
    },
    { status },
  );
}
