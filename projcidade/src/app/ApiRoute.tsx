import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Parâmetro "query" é obrigatório' }, { status: 400 });
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
    )}&format=json&limit=10`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MeuAppDeCidades/1.0 (seuemail@exemplo.com)',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar dados do Nominatim' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}