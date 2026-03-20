const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://yundoshbaeyfeaicztrb.supabase.co';
const supabaseKey = 'sb_publishable_JgkJ3ObchhVexsrnHXqkuw_tM-s3Jh9'; // Essa chave não tem poderes de DDL diretos, então usaremos a string de conexão postgres se possível, mas como só temos acesso ao anon/public, vamos tentar rodar SQL cru se a API permitir. Como não permite criar tables via anon key, teremos que usar pg:

const { Client } = require('pg');

async function main() {
  const connectionString = 'postgresql://postgres:amendola-saas@db.yundoshbaeyfeaicztrb.supabase.co:5432/postgres';
  
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Conectado ao PostgreSQL.');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        service TEXT NOT NULL,
        text TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    
    await client.query(createTableQuery);
    console.log('Tabela testimonials criada com sucesso.');

    // Inserir dados de exemplo se estiver vazia
    const checkQuery = await client.query('SELECT count(*) FROM testimonials');
    if (checkQuery.rows[0].count === '0') {
        const seedQuery = `
        INSERT INTO testimonials (name, service, text, status) VALUES
        ('Amanda Silveira', 'Dia de Noiva', 'A Priscila foi incrível! Meu dia foi perfeito e a maquiagem durou até o fim da festa impecável. Amei cada detalhe e o atendimento exclusivo do Studio Amendola.', 'approved'),
        ('Carolina Mendes', 'Madrinha', 'Profissionalismo nota 1000! Entendeu exatamente o que eu queria e o penteado não desmanchou por nada. Maravilhosa, recomendo de olhos fechados!', 'approved'),
        ('Beatriz Costa', 'Debutante', 'Fiz minha festa de 15 anos e confiei o cabelo e make a ela. Ficou muito melhor do que eu sonhava, as fotos ficaram de revista.', 'approved')
        `;
        await client.query(seedQuery);
        console.log('Testemunhos iniciais populados!');
    }

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await client.end();
  }
}

main();
