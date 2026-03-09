# 🗄️ Schema do Banco de Dados - Supabase

## 📋 Estrutura de Tabelas

### **1. Obras (artworks)**

```sql
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  artist_id UUID REFERENCES artists(id),
  description TEXT,
  materials TEXT,
  dimensions TEXT,
  is_anamorphic BOOLEAN DEFAULT false,
  is_rentable BOOLEAN DEFAULT false,
  is_for_sale BOOLEAN DEFAULT false,
  price DECIMAL(10,2),
  category TEXT, -- 'escultura', 'pintura', 'instalacao', 'mixed-media'
  status TEXT DEFAULT 'active', -- 'active', 'rented', 'sold', 'archived'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_artworks_category ON artworks(category);
CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_featured ON artworks(featured);
CREATE INDEX idx_artworks_slug ON artworks(slug);
```

### **2. Artistas (artists)**

```sql
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  photo_url TEXT,
  website TEXT,
  instagram TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **3. Mídia das Obras (artwork_media)**

```sql
CREATE TABLE artwork_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL, -- 'image', 'video', 'thumbnail'
  url TEXT NOT NULL, -- URL do Supabase Storage
  storage_path TEXT NOT NULL, -- Caminho no storage
  order_index INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  metadata JSONB, -- { duration, size, dimensions, etc }
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_artwork_media_artwork ON artwork_media(artwork_id);
CREATE INDEX idx_artwork_media_primary ON artwork_media(artwork_id, is_primary) WHERE is_primary = true;
```

### **4. Móveis (furniture)**

```sql
CREATE TABLE furniture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  artist_id UUID REFERENCES artists(id),
  description TEXT,
  furniture_type TEXT, -- 'assento', 'mesa', 'iluminacao', 'armazenamento'
  is_rentable BOOLEAN DEFAULT false,
  is_for_sale BOOLEAN DEFAULT false,
  price DECIMAL(10,2),
  dimensions TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **5. Produtos da Loja (products)**

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT, -- 'prints', 'adesivos', 'plaquinhas', 'lambes', 'acessorios'
  image_url TEXT,
  instagram_link TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **6. Solicitações de Aluguel (rental_requests)**

```sql
CREATE TABLE rental_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID REFERENCES artworks(id),
  furniture_id UUID REFERENCES furniture(id),
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  requester_phone TEXT,
  company_name TEXT,
  event_type TEXT,
  event_date_start DATE,
  event_date_end DATE,
  event_location TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **7. Localizações no Mapa (map_locations)**

```sql
CREATE TABLE map_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location_type TEXT NOT NULL, -- 'artwork', 'installation', 'leisure', 'fruit_tree', 'facility'
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  artwork_id UUID REFERENCES artworks(id),
  description TEXT,
  icon TEXT, -- Nome do ícone a usar
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_map_locations_type ON map_locations(location_type);
CREATE INDEX idx_map_locations_coords ON map_locations(latitude, longitude);
```

### **8. Tags/Categorias (tags)**

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT, -- Cor para exibição
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de relacionamento muitos-para-muitos
CREATE TABLE artwork_tags (
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (artwork_id, tag_id)
);
```

### **9. Newsletter (newsletter_subscribers)**

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);
```

---

## 🔐 Políticas de Segurança (RLS - Row Level Security)

### **Obras - Público pode ler, Admin pode editar**

```sql
-- Permitir leitura pública
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active artworks"
  ON artworks FOR SELECT
  USING (status = 'active');

-- Admin pode fazer tudo
CREATE POLICY "Admins can manage artworks"
  ON artworks FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

### **Mídia - Público pode ler**

```sql
ALTER TABLE artwork_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view artwork media"
  ON artwork_media FOR SELECT
  USING (true);
```

### **Solicitações de Aluguel - Apenas criação pública**

```sql
ALTER TABLE rental_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create rental requests"
  ON rental_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all requests"
  ON rental_requests FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');
```

---

## 📁 Estrutura do Storage (Supabase Storage)

```
storage/
├── artworks/
│   └── {artwork_id}/
│       ├── images/
│       │   ├── primary.jpg
│       │   ├── 01.jpg
│       │   └── 02.jpg
│       ├── videos/
│       │   ├── anamorphic.mp4
│       │   └── process.mp4
│       └── thumbnails/
│           └── video-thumb.jpg
├── furniture/
│   └── {furniture_id}/
│       └── images/
├── products/
│   └── {product_id}/
│       └── image.jpg
└── organic-content/
    └── {year}/
        └── {month}/
            └── {filename}
```

---

## 🔄 Funções Úteis

### **Atualizar timestamp automaticamente**

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON artworks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### **Busca full-text**

```sql
-- Adicionar coluna de busca
ALTER TABLE artworks ADD COLUMN search_vector tsvector;

-- Criar índice GIN para busca rápida
CREATE INDEX idx_artworks_search ON artworks USING GIN(search_vector);

-- Função para atualizar search_vector
CREATE OR REPLACE FUNCTION update_artwork_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('portuguese', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('portuguese', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artwork_search
  BEFORE INSERT OR UPDATE ON artworks
  FOR EACH ROW
  EXECUTE FUNCTION update_artwork_search_vector();
```

---

## 📊 Views Úteis

### **View de Obras com Mídia**

```sql
CREATE VIEW artworks_with_media AS
SELECT 
  a.*,
  json_agg(
    json_build_object(
      'id', m.id,
      'url', m.url,
      'type', m.media_type,
      'is_primary', m.is_primary,
      'order', m.order_index
    ) ORDER BY m.order_index
  ) FILTER (WHERE m.id IS NOT NULL) as media
FROM artworks a
LEFT JOIN artwork_media m ON a.id = m.artwork_id
GROUP BY a.id;
```

---

## 🚀 Próximos Passos

1. Executar esses scripts no Supabase SQL Editor
2. Configurar Storage buckets
3. Criar usuário admin
4. Testar inserções de dados
5. Configurar políticas de acesso
