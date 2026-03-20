const { Client } = require('pg');

async function setup() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao Supabase PostgreSQL');

    const sql = `
      -- 1. Criação da tabela de Posts
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        cover_image TEXT,
        category TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        seo_title TEXT,
        seo_description TEXT,
        focus_keyword TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        author TEXT,
        views INTEGER DEFAULT 0,
        published_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 2. Criação da tabela de Leads
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        service TEXT,
        event_date DATE,
        message TEXT,
        source TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 3. Criação da tabela de Page Views (Analytics)
      CREATE TABLE IF NOT EXISTS page_views (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page TEXT NOT NULL,
        referrer TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        device TEXT,
        browser TEXT,
        country TEXT,
        city TEXT,
        session_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 4. Criação da tabela de Comentários
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
        author_name TEXT NOT NULL,
        author_email TEXT,
        content TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, spam
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Funções e Triggers de Updated_at
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_modtime') THEN
          CREATE TRIGGER update_blog_posts_modtime BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_modtime') THEN
          CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_modified_column();
        END IF;
      END
      $$;

      -- 5. Criação do Bucket de Storage para imagens do BD
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('blog-images', 'blog-images', true) 
      ON CONFLICT (id) DO NOTHING;

      -- Políticas liberando acesso ao bucket (simplificado para admin/public)
      -- Allow public read
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT 
      USING ( bucket_id = 'blog-images' );
      
      -- Allow authenticated inserts (for the admin)
      CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT 
      WITH CHECK ( bucket_id = 'blog-images' );
    `;

    console.log('⏳ Executando criação de tabelas e storage...');
    await client.query(sql);
    console.log('🎉 Tudo criado com sucesso no Supabase!');

  } catch (err) {
    console.error('❌ Erro gravíssimo:', err);
  } finally {
    await client.end();
  }
}

setup();
