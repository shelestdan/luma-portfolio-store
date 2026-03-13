import { AddProductForm } from "@/components/studio/AddProductForm";
import { hasLiveApi } from "@/lib/runtime";
import { enableDynamicRendering } from "@/lib/server-runtime";
import { getFilms } from "@/lib/store";
import styles from "@/app/studio/add/page.module.css";

export default async function StudioAddPage() {
  await enableDynamicRendering();
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
        <AddProductForm films={films} studioEnabled={hasLiveApi} />
      </div>
    </main>
  );
}
