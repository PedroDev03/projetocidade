"use client";
import { useState, useEffect } from "react";

interface Cidades {
    id: number;
    nome: string;
    microrregiao: {
        mesorregiao: {
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    nome: string;
                };
            };
        };
    };

}




export default function Card() {

    const [Data, setData] = useState<Cidades[]>([]);
    const [randomCity, setRandomCity] = useState<Cidades | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {


        const fetchData = async () => {

            try {
                const response = await fetch(
                    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
                );

                if(response.ok) {
                    const jsonData: Cidades[] = await response.json();
                    setData(jsonData);
                }
                else{
                    setData([]);
                    console.log("nenhum dado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }finally{
                setIsLoading(false);
            }

        }
        fetchData();
    }, []);

    const handleGetRandomCity = () => {
        // A lógica aqui já estava correta!
        if (Data.length > 0) {
            const randomIndex = Math.floor(Math.random() * Data.length);
            setRandomCity(Data[randomIndex]);
        }
    };


    

    const querry = randomCity ? randomCity.nome : '';
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(querry)}&format=json&limit=10`;


    if (isLoading) {
        return <p>Carregando lista de cidades...</p>;
    }

    return (
        <>
        <h1> cidades do brasil</h1>
      
        <ul>
            {Data?.slice(0, 10).map((cidade) =>
            <li key={cidade.id}>
                {cidade.nome} 
            </li>
            )}
        </ul>

        <h1>Gerador de Cidade Aleatória</h1>
            <button onClick={handleGetRandomCity}>
                Sortear uma Cidade
            </button>
            {randomCity && (
        <div>
                    <h2>Cidade Sorteda:</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {randomCity.nome} - {randomCity.microrregiao.mesorregiao.UF.sigla}
                    </p>
                    <p>drogarias na cidade {randomCity.nome}</p><br></br>
                    <p></p>
                </div>
            )}

                
        </>
    );

}