if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL =
    "postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder";
}

if (!process.env.DIRECT_URL?.trim()) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}
