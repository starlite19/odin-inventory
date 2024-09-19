const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS company (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  country CHAR (3),
  UNIQUE (name, country)
);

INSERT INTO company (name, country) 
VALUES
  ('Bellroy', 'AUS'),
  ('Peak Design', 'USA'),
  ('Jansport', 'USA'),
  ('The North Face', 'USA'),
  ('Aer', 'USA'),
  ('Osprey', 'USA'),
  ('Herschel Supply Co', 'CAN'),
  ('Alpaka', 'AUS');

CREATE TABLE IF NOT EXISTS type (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  UNIQUE (name)
);

INSERT INTO type (name) 
VALUES
  ('Daypack'),
  ('Shoulder bag'),
  ('Laptop bag'),
  ('Travel bag');

CREATE TABLE IF NOT EXISTS backpack (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  company_id INTEGER,
  type_id INTEGER NOT NULL,
  volume DECIMAL(3, 1),
  FOREIGN KEY (company_id) REFERENCES company(id),
  FOREIGN KEY (type_id) REFERENCES type(id),
  UNIQUE (name, company_id, type_id, volume)
);

INSERT INTO backpack (name, company_id, type_id, volume) 
VALUES
  ('Transit Workpack', 1, 4, 20),
  ('Classic Backpack Compact', 1, 3, 16),
  ('Tokyo Work Bag', 1, 2, 20),
  ('Lite Daypack', 1, 1, 20),
  ('Everyday Backpack', 2, 1, 20),
  ('Everyday Backpack Zip', 2, 1, 15),
  ('Everyday Sling', 2, 2, 6),
  ('Travel Backpack', 2, 4, 45),
  ('Hatchet', 3, 3, 28),
  ('Landings Pack', 3, 4, 30),
  ('Core Crossbody', 3, 2, 4),
  ('Borealis Backpack', 4, 1, 28),
  ('Recon Backpack', 4, 1, 30),
  ('Women’s Surge Backpack', 4, 1, 31),
  ('Base Camp Voyager Travel Pack', 4, 4, 35),
  ('Borealis Tote', 4, 2, 22),
  ('Travel Pack 3', 5, 4, 35),
  ('City Pack Pro X-Pac', 5, 4, 20),
  ('Go Pack 2', 5, 4, 24),
  ('Sling Bag 3', 5, 2, 13.5),
  ('Day Sling 3', 5, 2, 3),
  ('Nebula 32', 6, 1, 32),
  ('Metron 18 Messenger', 6, 2, 18),
  ('Osprey Arcane™ Flap Pack', 6, 3, 14),
  ('Herschel Classic™ Backpack', 7, 3, 30),
  ('Kaslo Daypack', 7, 1, 20),
  ('Herschel Little America™ Backpack', 7, 1, 30),
  ('City Backpack', 7, 3, 16),
  ('Elements Tote', 8, 2, 14.5),
  ('Elements Backpack Pro', 8, 1, 26),
  ('Metro Backpack', 8, 3, 12);

CREATE TABLE IF NOT EXISTS volume (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR (255) NOT NULL,
  min_vol INTEGER NOT NULL,
  max_vol INTEGER NOT NULL
);

INSERT INTO volume (category, min_vol, max_vol)
VALUES
  ('Small', 0, 15),
  ('Medium', 16, 30),
  ('Large', 31, 70);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    ssl: true,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
