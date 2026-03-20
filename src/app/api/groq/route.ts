import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Tópico não fornecido' }, { status: 400 });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'Chave API do Groq não configurada' }, { status: 500 });
    }

    const prompt = `
      Você é um Copywriter e Especialista em SEO de altíssimo nível, trabalhando para o "Studio Amendola Noivas", focado em serviços de beleza e especializado na área: ${category}.
      
      O tópico principal do artigo a ser criado é: "${topic}".

      ### Diretrizes Obrigatórias:
      1. A estrutura deve ser Markdown perfeita (H2 persausivos, H3 explicativos, listas bullet points, emojis sutis).
      2. O artigo deve ser extremamente cativante e gerar urgência para converter leitoras em clientes.
      3. Use gatilhos mentais: Exclusividade, Prova Social, Autoridade.
      4. O conteúdo deve focar na extrema qualidade técnica sobre maquiagem e cabelo (durabilidade, produtos premium).
      5. Mencione várias vezes e com autoridade a "Priscila Amendola" e o "Studio Amendola Noivas na Zona Norte de São Paulo", ressaltando a qualidade irretocável do serviço.
      6. Crie uma seção de "Perguntas Frequentes (FAQ)" no final do texto.
      7. Nunca adicione texto extra fora do JSON. Responda ESTRITAMENTE um objeto JSON estruturado.
      
      Retorne ESTRITAMENTE o seguinte formato JSON:
      {
        "title": "Um título H1 matador com a palavra chave",
        "slug": "url-amigavel-do-post-focada-em-seo",
        "excerpt": "Um resumo (meta description) extremamente atrativo, 150 caracteres máx",
        "content": "# Seu Artigo em Markdown com H2, listas, FAQ... (não inclua delimitadores de md no início do campo)",
        "seoTitle": "Título SEO para o Google (máx 60 caracteres)",
        "seoDescription": "Meta Description persuasiva com gatilhos (máx 160 caracteres)",
        "focusKeyword": "palavra-chave principal",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
      }
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Outstanding performance model
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 3500,
        response_format: { type: 'json_object' } // Garante que a IA retorne o JSON estruturado
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq Error:', errorData);
      return NextResponse.json({ error: 'Erro ao invocar IA' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const jsonParsed = JSON.parse(content);

    return NextResponse.json(jsonParsed, { status: 200 });
  } catch (error) {
    console.error('Internal Error on /api/groq:', error);
    return NextResponse.json({ error: 'Erro interno na geração de post' }, { status: 500 });
  }
}
