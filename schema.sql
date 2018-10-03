DROP TABLE IF EXISTS animals;

CREATE TABLE IF NOT EXISTS animals (
  name VARCHAR(255) PRIMARY KEY,
  region VARCHAR(255)
);
INSERT INTO animals (name,region) 
VALUES 
('Snow Leopard','Asia'),
('Red Panda','Asia'),
('Sarus Crane','Asia'),
('Eld''s Deer', 'Asia'),
('Javan Rhinoceros', 'Asia'),
('Abe''s Salamander', 'Asia'),
('Palawan Hornbill', 'Asia'),
('Marbled Polecat', 'Asia'),
('Orangutan', 'Asia'),
('Gharial', 'Asia'),
('Woylie', 'Australia'),
('Spotted Handfish', 'Australia'),
('Regent Honeyeater', 'Australia'),
('Southern Bent-wing Bat', 'Australia'),
('Leadbeater''s Possum', 'Australia'),
('Orange-bellied Parrot', 'Australia'),
('Tristan Albatross', 'Antartica'),
('Abbott''s Booby', 'Antartica'),
('Hooded Seal', 'Europe'),
('Przewalski''s horse', 'Europe'),
('Bavarian Pine Vole', 'Europe'),
('Iberian Lynx', 'Europe'),
('Aeolian Wall Lizard', 'Europe'),
('Karpathos Frog', 'Europe'),
('Polar Bear', 'North America'),
('Island Fox', 'North America'),
('Black-footed Ferret', 'North America'),
('Red Wolf', 'North America'),
('Eastern Indigo Snake', 'North America'),
('Giant Kangaroo Rat', 'North America'),
('Whooping Crane', 'North America'),
('Morelet''s crocodile', 'North America'),
('Short-tailed Chinchilla', 'South America'),
('Golden Lion Tamarin', 'South America'),
('Golden Poison Frog', 'South America'),
('Giant Otter', 'South America'),
('White-cheeked Spider Monkey', 'South America'),
('Chacoan Peccary', 'South America'),
('Darwin''s Fox', 'South America'),
('Orinoco Crocodile', 'South America'),
('Spix''s macaw', 'South America'),
('Gorilla', 'Africa'),
('Okapi', 'Africa'),
('Black Rhinoceros', 'Africa'),
('Bonobo', 'Africa'),
('Pickersgill''s reed frog', 'Africa'),
('Cape Vulture', 'Africa'),
('Pygmy Hippopotamus', 'Africa'),
('Addax', 'Africa'),
('River dolphin', 'South America');

CREATE TABLE IF NOT EXISTS highscore (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  score INT
);