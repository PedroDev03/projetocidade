"use client";
import { useState, useEffect } from "react";
// Apenas importe os componentes que você realmente vai usar
import { Button, Card } from "@chakra-ui/react";



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


    const LinkDrogMap = <a target="blank" href={`https://www.google.com/maps/search/${niche}+${randomCity?.nome}+${randomCity?.microrregiao.mesorregiao.UF.sigla}`} style={{ color: 'indigo', fontWeight: 'bold' }} ><u> Clique aqui</u></a>

    if (isLoading) {
        return <p style={{ color: 'white' }}>Carregando lista de cidades...</p>;
    }


    return (
        <>


            <div style={{
                backgroundColor: '#5c161e',
                minHeight: '100vh',
                display: 'flex'
            }}>
                <Card.Root
                    maxW="sm" overflow="hidden" marginTop={0} shadowColor={"black"}
                    boxShadow="xs"
                >
                    <Card.Body gap="2">
                        <Card.Title style={{ textAlign: "center", fontWeight: 'bolder' }}>Sorteador de cidades </Card.Title>

                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label htmlFor="niche-select" style={{ fontWeight: 'bold' }}>Escolha o nicho de pesquisa:</label>
                            <select
                                id="niche-select"
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: 'white', color: 'black' }}
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
                            <div>
                                <h2 style={{ marginTop: '20px', fontSize: '15px' }}><b>Cidade Sorteada:</b></h2>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '15px' }}>
                                    {randomCity.nome} - {randomCity.microrregiao.mesorregiao.UF.sigla}
                                </p>
                                <p style={{ marginTop: '10px', fontSize: '20px' }}>{niche === 'Comércio' ? 'Comércios' : niche} na cidade {randomCity.nome}<br></br> pelo Google maps: {LinkDrogMap}</p><br></br>

                                <p></p>
                            </div>
                        )}



                    </Card.Body>
                    <Card.Footer gap="1" style={{ display: 'flex', justifyContent: 'center' }} >
                        <Button variant="solid" onClick={handleGetRandomCity} style={{ fontSize: '15px', textAlign: 'center' }} >Sortear uma cidade aleatória</Button>

                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    );

}