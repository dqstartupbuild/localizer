export function SourceBoundary() {
  return (
    <section
      className="source-boundary"
      aria-labelledby="source-boundary-title"
    >
      <p className="source-boundary__index">
        Your source code stays on your computer.
      </p>
      <div>
        <h2 id="source-boundary-title">
          The dashboard never reads your project files.
        </h2>
        <p>
          The CLI runs inside your iOS project. It sends the app text, its key,
          and where it appears in your project. It does not send your full
          project files. When you are done, the CLI writes the saved
          translations back to your project. You do not need an account.
        </p>
      </div>
      <div
        className="source-boundary__diagram"
        aria-label="Localizer data boundary"
      >
        <span>iOS project</span>
        <b>CLI</b>
        <span>dashboard</span>
      </div>
    </section>
  );
}
