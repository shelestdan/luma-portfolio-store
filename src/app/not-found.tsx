import Link from "next/link";

import { brand } from "@/lib/brand";

export default function NotFound() {
  return (
    <main className="page-shell" style={{ paddingTop: "140px", paddingBottom: "90px" }}>
      <div className="surface-card" style={{ display: "grid", gap: "18px" }}>
        <span className="eyebrow">404</span>
        <h1 className="display-title" style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}>
          Missing frame
        </h1>
        <p>
          The requested film or product could not be found in this portfolio catalog.
        </p>
        <Link href="/" className="button-primary">
          Return to {brand.shortName}
        </Link>
      </div>
    </main>
  );
}
