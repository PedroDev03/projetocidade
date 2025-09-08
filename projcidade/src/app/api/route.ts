import { NextResponse } from 'next/server';

export async function GET(request: Request) {

     console.log("2. [BACK-END] Rota da API foi acionada!");

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Parâmetro "query" é obrigatório' }, { status: 400 });
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
    )}&format=json&limit=10`;
console.log("2.1. [BACK-END] Buscando na API externa:", url);
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MeuAppDeCidades/1.0 (pedroaugustor03@gmail.com)',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar dados do Nominatim' },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log("2.2. [BACK-END] Resposta da API externa recebida. Retornando para o front-end.");
        return NextResponse.json(data);

    } catch (error) {
        console.error("2.2. [BACK-END] Erro ao buscar na API externa:", error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}