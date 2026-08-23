import Link from "next/link";

import { getPublicAction } from "~/features/marketing/site/getPublicAction";

export function PublicAction() {
  const action = getPublicAction();

  return (
    <Link className="public-action" href={action.href}>
      {action.label} <span aria-hidden="true">↗</span>
    </Link>
  );
}
