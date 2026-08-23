const flowSteps = [
  [
    "Your repository",
    "The CLI reads supported source strings where your app lives.",
  ],
  [
    "A reviewable catalog",
    "The local dashboard receives normalized entries, not filesystem access.",
  ],
  [
    "A careful return",
    "Reviewed translations become a generated String Catalog inside the repository.",
  ],
] as const;

export function CatalogFlow() {
  return (
    <div className="catalog-flow">
      {flowSteps.map(([title, body], index) => (
        <div className="catalog-flow__step" key={title}>
          <span aria-hidden="true">
            {index === 0 ? "↘" : index === 1 ? "↔" : "↗"}
          </span>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}
