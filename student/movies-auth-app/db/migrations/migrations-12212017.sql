\c movies_auth_development

CREATE TABLE IF NOT EXISTS movies (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT
)
