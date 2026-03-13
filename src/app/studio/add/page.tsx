import { AddProductForm } from "@/components/studio/AddProductForm";
import { getFilms } from "@/lib/store";
import styles from "@/app/studio/add/page.module.css";

export const dynamic = "force-dynamic";

export default function StudioAddPage() {
  const films = getFilms();

  return (
    <main className={styles.page}>
      <div className="page-shell">
        <div className={styles.hero}>
          <span className="eyebrow">Hidden route</span>
          <h1 className={styles.title}>Studio add</h1>
          <p className={styles.copy}>
            This is the only catalog-creation surface in the project. It stays intentionally
            lightweight and protected by a shared secret instead of a full admin area.
          </p>
        </div>
        <AddProductForm films={films} />
      </div>
    </main>
  );
}
