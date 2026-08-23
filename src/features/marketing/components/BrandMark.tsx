import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="public-brand" href="/" aria-label="Localizer home">
      <span className="public-brand__glyph" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>Localizer</span>
    </Link>
  );
}
