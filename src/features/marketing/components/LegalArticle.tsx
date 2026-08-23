import { type ReactNode } from "react";

type LegalArticleProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function LegalArticle({
  children,
  description,
  title,
}: LegalArticleProps) {
  return (
    <main className="legal-page">
      <header className="legal-page__intro">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <article className="legal-page__article">{children}</article>
    </main>
  );
}
