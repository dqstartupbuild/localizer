const flowSteps = [
  [
    "Find app text",
    "Run the CLI in your iOS project. It finds the SwiftUI text Localizer supports.",
  ],
  [
    "Check translations",
    "Open the dashboard to read and edit each translation.",
  ],
  [
    "Sync to Xcode",
    "Run sync. Localizer writes Localizer.xcstrings into your project.",
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
