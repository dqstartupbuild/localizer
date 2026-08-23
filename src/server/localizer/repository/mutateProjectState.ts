import { readProjectState } from "~/server/localizer/repository/readProjectState";
import { writeProjectState } from "~/server/localizer/repository/writeProjectState";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";

const queues = new Map<string, Promise<void>>();

export async function mutateProjectState<T>(
  projectId: string,
  mutation: (
    current: ProjectState,
  ) =>
    | Promise<{ state: ProjectState; result: T }>
    | { state: ProjectState; result: T },
): Promise<T | null> {
  const previous = queues.get(projectId) ?? Promise.resolve();
  let release!: () => void;
  const turn = new Promise<void>((resolve) => {
    release = resolve;
  });
  const queued = previous.then(() => turn);
  queues.set(projectId, queued);
  await previous;
  try {
    const current = await readProjectState(projectId);
    if (!current) return null;
    const next = await mutation(current);
    await writeProjectState(next.state);
    return next.result;
  } finally {
    release();
    if (queues.get(projectId) === queued) queues.delete(projectId);
  }
}
