import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

import { filmSeeds, productSeeds } from "@/lib/seed";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "portfolio-store.db");

let database: Database.Database | null = null;

function seedIfEmpty(db: Database.Database) {
  const filmCount = db.prepare("SELECT COUNT(*) as count FROM films").get() as {
    count: number;
  };
  const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as {
    count: number;
  };

  if (filmCount.count === 0) {
    const insertFilm = db.prepare(`
      INSERT INTO films (
        id,
        slug,
        title,
        year,
        statusLabel,
        accentColor,
        heroImage,
        posterImage,
        synopsis,
        trailerUrl,
        sectionGroup,
        sortOrder
      ) VALUES (
        @id,
        @slug,
        @title,
        @year,
        @statusLabel,
        @accentColor,
        @heroImage,
        @posterImage,
        @synopsis,
        @trailerUrl,
        @sectionGroup,
        @sortOrder
      )
    `);

    const insertFilms = db.transaction(() => {
      for (const film of filmSeeds) {
        insertFilm.run(film);
      }
    });

    insertFilms();
  }

  if (productCount.count === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (
        id,
        filmId,
        slug,
        title,
        category,
        price,
        statusLabel,
        primaryImage,
        secondaryImage,
        description,
        featured,
        createdAt
      ) VALUES (
        @id,
        @filmId,
        @slug,
        @title,
        @category,
        @price,
        @statusLabel,
        @primaryImage,
        @secondaryImage,
        @description,
        @featured,
        @createdAt
      )
    `);

    const insertProducts = db.transaction(() => {
      for (const product of productSeeds) {
        insertProduct.run({
          ...product,
          featured: product.featured ? 1 : 0,
        });
      }
    });

    insertProducts();
  }
}

function initializeDatabase() {
  fs.mkdirSync(dataDirectory, { recursive: true });

  const db = new Database(databasePath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS films (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      year TEXT NOT NULL,
      statusLabel TEXT NOT NULL,
      accentColor TEXT NOT NULL,
      heroImage TEXT NOT NULL,
      posterImage TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      trailerUrl TEXT NOT NULL,
      sectionGroup TEXT NOT NULL,
      sortOrder INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      filmId TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      statusLabel TEXT NOT NULL,
      primaryImage TEXT NOT NULL,
      secondaryImage TEXT NOT NULL,
      description TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (filmId) REFERENCES films(id)
    );
  `);

  seedIfEmpty(db);

  return db;
}

export function getDb() {
  if (!database) {
    database = initializeDatabase();
  }

  return database;
}
