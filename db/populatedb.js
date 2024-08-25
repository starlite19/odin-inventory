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

CREATE TABLE IF NOT EXISTS backpack (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  company_id INTEGER,
  type VARCHAR (255) NOT NULL,
  volume DECIMAL(3, 1),
  FOREIGN KEY (company_id) REFERENCES company(id),
  UNIQUE (name, company_id, type, volume)
);

INSERT INTO backpack (name, company_id, type, volume) 
VALUES
  ('Transit Workpack', 1, 'Travel bag', 20),
  ('Classic Backpack Compact', 1, 'Laptop bag', 16),
  ('Tokyo Work Bag', 1, 'Shoulder bag', 20),
  ('Lite Daypack', 1, 'Daypack', 20),
  ('Everyday Backpack', 2, 'Daypack', 20),
  ('Everyday Backpack Zip', 2, 'Daypack', 15),
  ('Everyday Sling', 2, 'Shoulder bag', 6),
  ('Travel Backpack', 2, 'Travel bag', 45),
  ('Hatchet', 3, 'Laptop bag', 28),
  ('Landings Pack', 3, 'Travel bag', 30),
  ('Core Crossbody', 3, 'Shoulder bag', 4),
  ('Borealis Backpack', 4, 'Daypack', 28),
  ('Recon Backpack', 4, 'Daypack', 30),
  ('Women’s Surge Backpack', 4, 'Daypack', 31),
  ('Base Camp Voyager Travel Pack', 4, 'Travel bag', 35),
  ('Borealis Tote', 4, 'Shoulder bag', 22),
  ('Travel Pack 3', 5, 'Travel bag', 35),
  ('City Pack Pro X-Pac', 5, 'Travel bag', 20),
  ('Go Pack 2', 5, 'Travel bag', 24),
  ('Sling Bag 3', 5, 'Shoulder bag', 13.5),
  ('Day Sling 3', 5, 'Shoulder bag', 3),
  ('Nebula 32', 6, 'Daypack', 32),
  ('Metron 18 Messenger', 6, 'Shoulder bag', 18),
  ('Osprey Arcane™ Flap Pack', 6, 'Laptop bag', 14),
  ('Herschel Classic™ Backpack', 7, 'Laptop bag', 30),
  ('Kaslo Daypack', 7, 'Daypack', 20),
  ('Herschel Little America™ Backpack', 7, 'Daypack', 30),
  ('City Backpack', 7, 'Laptop bag', 16),
  ('Elements Tote', 8, 'Shoulder bag', 14.5),
  ('Elements Backpack Pro', 8, 'Daypack', 26),
  ('Metro Backpack', 8, 'Laptop bag', 12);

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
    connectionString:
      "postgresql://houangiv:peace1@localhost:5432/inventory_management",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
