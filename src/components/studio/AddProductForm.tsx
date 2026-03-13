"use client";

import { startTransition, useState, useTransition } from "react";

import type { Film } from "@/lib/types";
import styles from "@/components/studio/AddProductForm.module.css";

interface AddProductFormProps {
  films: Film[];
}

export function AddProductForm({ films }: AddProductFormProps) {
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, startFormTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    setIsError(false);

    const payload = {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      filmId: String(formData.get("filmId") ?? ""),
      category: String(formData.get("category") ?? ""),
      price: String(formData.get("price") ?? ""),
      statusLabel: String(formData.get("statusLabel") ?? ""),
      primaryImage: String(formData.get("primaryImage") ?? ""),
      secondaryImage: String(formData.get("secondaryImage") ?? ""),
      description: String(formData.get("description") ?? ""),
      featured: formData.get("featured") === "on",
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-studio-secret": secret,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setIsError(true);
      setMessage(result.error?.message ?? "Unable to create product.");
      return;
    }

    setMessage(`Created ${result.title}. Open /product/${result.slug} to review it.`);
  }

  return (
    <div className={styles.stack}>
      <div className={styles.secretGate}>
        <label htmlFor="secret" className={styles.secretLabel}>
          Studio access key
        </label>
        <input
          id="secret"
          name="secret"
          type="text"
          autoComplete="off"
          placeholder="Enter STUDIO_SECRET"
          value={secret}
          className={styles.secretInput}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            startTransition(() => {
              setSecret(nextValue);
            });
          }}
        />
      </div>

      <form
        className={styles.panel}
        action={(formData) => {
          startFormTransition(() => {
            handleSubmit(formData);
          });
        }}
      >
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" placeholder="THE SECRET AGENT Archive Tee" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="slug">Slug</label>
            <input id="slug" name="slug" placeholder="the-secret-agent-archive-tee" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="filmId">Film</label>
            <select id="filmId" name="filmId" defaultValue={films[0]?.id}>
              {films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" defaultValue="Apparel">
              <option value="Apparel">Apparel</option>
              <option value="Posters">Posters</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Books">Books</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number" min="1" step="1" defaultValue="30" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="statusLabel">Status label</label>
            <input id="statusLabel" name="statusLabel" defaultValue="Available" required />
          </div>
          <div className={`${styles.field} ${styles.fieldWide}`}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Write a concise editorial-style merch description."
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="primaryImage">Primary image URL</label>
            <input id="primaryImage" name="primaryImage" placeholder="Optional — leave blank for generated placeholder" />
          </div>
          <div className={styles.field}>
            <label htmlFor="secondaryImage">Secondary image URL</label>
            <input id="secondaryImage" name="secondaryImage" placeholder="Optional — leave blank for generated placeholder" />
          </div>
          <div className={`${styles.field} ${styles.fieldWide}`}>
            <label className={styles.checkboxRow}>
              <input id="featured" name="featured" type="checkbox" />
              Featured product
            </label>
          </div>
        </div>
        {message ? (
          <div className={`${styles.feedback} ${isError ? styles.feedbackError : ""}`}>
            {message}
          </div>
        ) : null}

        <div className={styles.actions}>
          <button type="submit" className="button-primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create product"}
          </button>
          <span className="eyebrow">Hidden studio route, no public admin area.</span>
        </div>
      </form>
    </div>
  );
}
