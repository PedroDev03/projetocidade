"use client";
import { useState, useEffect } from "react";
// Sem dependências do Chakra UI



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



export default function CardCidade() {

    const [Data, setData] = useState<Cidades[]>([]);
    const [randomCity, setRandomCity] = useState<Cidades | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [niche, setNiche] = useState<string>("Comércio");

    useEffect(() => {


        const fetchData = async () => {

            try {
                const response = await fetch(
                    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
                );

                if (response.ok) {
                    const jsonData: Cidades[] = await response.json();
                    setData(jsonData);
                }
                else {
                    setData([]);
                    console.log("nenhum dado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setIsLoading(false);
            }

        }
        fetchData();
    }, []);

    const handleGetRandomCity = () => {

        if (Data.length > 0) {
            const randomIndex = Math.floor(Math.random() * Data.length);
            setRandomCity(Data[randomIndex]);
        }
    };


    const LinkDrogMap = <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/${niche}+${randomCity?.nome}+${randomCity?.microrregiao.mesorregiao.UF.sigla}`} className="premium-link" >Clique aqui</a>

    if (isLoading) {
        return <p style={{ color: 'white' }}>Carregando lista de cidades...</p>;
    }


    return (
        <>


            <div className="bg-full">
                <div className="premium-card">
                    <div>
                        <h2 className="premium-title">Sorteador de Cidades</h2>

                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor="niche-select" className="premium-label">Escolha o nicho de pesquisa:</label>
                            <select
                                id="niche-select"
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                                className="premium-select"
                            >
                                <option value="Comércio">Comércio Geral</option>
                                <option value="Restaurantes">Restaurantes</option>
                                <option value="Confeitaria">Confeitaria</option>
                                <option value="Restaurante">Restaurante</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Fotógrafos">Fotógrafos</option>
                                <option value="Harmonização Facial">Harmonização Facial</option>
                                <option value="Corretores">Corretores</option>
                            </select>
                        </div>

                        {randomCity && (
                            <div style={{ textAlign: 'center', marginTop: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                                <p className="premium-label" style={{ marginBottom: 0, color: '#111827', fontWeight: 'bold' }}>CIDADE SORTEADA</p>
                                <p className="premium-city-name">
                                    {randomCity.nome} - {randomCity.microrregiao.mesorregiao.UF.sigla}
                                </p>
                                <p className="premium-text" style={{ marginTop: '16px' }}>
                                    Buscar <b>{niche === 'Comércio' ? 'Comércios' : niche}</b> no Google Maps: <br /><br />
                                    {LinkDrogMap}
                                </p>
                            </div>
                        )}

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={handleGetRandomCity}
                            className="premium-button"
                        >
                            Sortear uma cidade aleatória
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}