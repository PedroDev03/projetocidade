"use client";
import { useState, useEffect } from "react";
// Apenas importe os componentes que você realmente vai usar
import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Providers } from "../provider";

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

interface Lugar {
    place_id: number;

    display_name: string;

}



export default function CardCidade() {

    const [Data, setData] = useState<Cidades[]>([]);
    const [randomCity, setRandomCity] = useState<Cidades | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(false);
    const [pharmacies, setPharmacies] = useState<Lugar[]>([]);


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

    const handleGetdrogaria = () => {

        if (randomCity) {
            const querry = randomCity ? randomCity.nome : '';
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(querry)}&format=json&limit=10`;

        }
    };


const handleSearchPharmacies = async ()=> {

};


    if (isLoading) {
        return <p>Carregando lista de cidades...</p>;
    }




    return (
        <>

            {/*       
        <ul>
            {Data?.slice(0, 10).map((cidade) =>
            <li key={cidade.id}>
                {cidade.nome} 
            </li>
            )}
        </ul> */}

            <h1>Gerador de cidade Aleatórias do Brasil</h1>
            {/* <button onClick={handleGetRandomCity}>
                Sortear uma Cidade
            </button> */}



            <Card.Root maxW="sm" overflow="hidden">
                <Card.Body gap="2">
                    <Card.Title>Gerador de cidades aleatórias</Card.Title>

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

                </Card.Body>
                <Card.Footer gap="2">
                    <Button variant="solid" onClick={handleGetRandomCity}>Sortear uma cidade aleatória</Button>
                    <Button variant="ghost" onClick={handleGetdrogaria}>Ver drogarias</Button>
                </Card.Footer>
            </Card.Root>

        </>
    );

}