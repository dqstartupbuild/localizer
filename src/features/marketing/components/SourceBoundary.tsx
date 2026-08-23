export function SourceBoundary() {
  return (
    <section
      className="source-boundary"
      aria-labelledby="source-boundary-title"
    >
      <p className="source-boundary__index">Your code stays your code.</p>
      <div>
        <h2 id="source-boundary-title">Your files stay where you work.</h2>
        <p>
          Today, the CLI controls source files in your repository. The dashboard
          works with a normalized catalog and returns a reviewed sync bundle.
          There is no account required for the local development workflow.
        </p>
      </div>
      <div
        className="source-boundary__diagram"
        aria-label="Localizer data boundary"
      >
        <span>iOS repository</span>
        <b>CLI</b>
        <span>local dashboard</span>
      </div>
    </section>
  );
}
