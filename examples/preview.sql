-- Palette entries with their contrast against the editor background
CREATE TABLE palette (
  id        INTEGER PRIMARY KEY,
  name      TEXT    NOT NULL,
  hex       CHAR(7) NOT NULL UNIQUE,
  contrast  REAL    DEFAULT 0.0
);

INSERT INTO palette (name, hex, contrast)
VALUES ('Forest green', '#2d6a3b', 6.08),
       ('Slate blue',   '#3d5f7a', 6.31);

SELECT name, hex
FROM palette
WHERE contrast >= 4.5 AND hex LIKE '#%'
ORDER BY contrast DESC;
