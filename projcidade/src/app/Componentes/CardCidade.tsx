"use client";
import { useState, useEffect } from "react";
// Apenas importe os componentes que você realmente vai usar
import { Box, Button, Card } from "@chakra-ui/react";



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
    name: string;
    display_name: string;

}


export default function CardCidade() {

    const [Data, setData] = useState<Cidades[]>([]);
    const [randomCity, setRandomCity] = useState<Cidades | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(false);
    const [pharmacies, setPharmacies] = useState<Lugar[]>([]);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState("restaurantes");

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
            setPharmacies([]);
             setSearchAttempted(false);
        }
    };

    const LinkMap = (
        <a 
            target="_blank" 
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/search/${selectedNiche}+${randomCity?.nome}+${randomCity?.microrregiao.mesorregiao.UF.sigla}`} 
            style={{ fontWeight: 'bold' }}
        >
            <u> Clique aqui</u>
        </a>
    );

    if (isLoading) {
        return <p>Carregando lista de cidades...</p>;
    }



// const pharmaciesCortadas = cortarAtePalavra(pharmacies, "Região");
    return (
        <>

            <Box display="flex" justifyContent="center" alignContent="center"
             minH="100vh"
             alignItems="center"
             bg="#5C161E"
            >
            <Card.Root
             maxW="sm" overflow="hidden" marginTop={0} shadowColor={"black"}
              boxShadow="xs"               
             >
                <Card.Body gap="2">
                    <Card.Title style={{ textAlign: "center", fontWeight:'bolder' }}>Sorteador de cidades </Card.Title>

                    {randomCity && (
                        <div>
                            <h2 style={{ marginTop: '20px', fontSize:'15px'}}><b>Cidade Sorteda:</b></h2>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '15px'  }}>
                                {randomCity.nome} - {randomCity.microrregiao.mesorregiao.UF.sigla}
                            </p>
                            <div style={{marginBottom: '30px', marginTop: '25px'}} >
                            <label style={{ marginLeft: '5px', fontSize:'20px', fontWeight:'bold'}}>Nicho:</label>
                            <select 
                                style={{marginLeft:'10px', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 5px', color: 'black', backgroundColor: 'white'}} 
                                id="Nicho" 
                                name="Nicho[]" 
                                size={1}
                                value={selectedNiche}
                                onChange={(e) => setSelectedNiche(e.target.value)}
                            >
                                <option value="restaurantes">Restaurantes</option>
                                <option value="fotógrafos">Fotógrafos</option>
                                <option value="gráficas">Gráficas</option>
                                <option value="buffet">Buffet</option>
                                <option value="padarias">Padarias</option>
                                <option value="hoteis">Hotéis</option>
                                <option value="corretores">Corretores</option>
                                <option value="academias">Academias</option>
                                <option value="clínicas Odontológicas">Clínicas Odontológicas</option>
                            </select>
                            </div>
                            <p style={{ marginTop:'10px', fontSize:'20px' }}>
                                Pesquisar {selectedNiche} na cidade {randomCity.nome}<br></br> pelo Google Maps: {LinkMap}
                            </p><br></br>
                          
                            <p></p>
                        </div>
                    )}
                        
                        {/* {searchAttempted && !isLoadingPharmacies && pharmacies.length === 0 && (
                             <Text mt={4} color="orange.600">
                                Nenhuma farmácia encontrada para esta cidade.
                             </Text>
                        )} */}


                        
                        {/* {pharmacies && (
                              
                    pharmaciesCortadas.length > 0 && (
                         <div style={{ marginTop: '20px'}}>
                                <Heading size="sm">Farmácias encontradas:  </Heading> <br></br>
                               <ul >
                                    {pharmacies.map((lugar) => (
                                     
                                        <li key={lugar.place_id} gap="2">
                                           <b>Nome Drogaria:  </b>{lugar.name}<br></br>
                                         
                                           <b>Endereço: </b> {lugar.display_name} <br></br>
                                           <br></br>
                                        </li>
                                     
                                    ))}
                                 </ul>
                            </div>
                    ))} */}

                </Card.Body>
                <Card.Footer gap="1" style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button variant="solid" onClick={handleGetRandomCity} style={{fontSize:'15px', textAlign:'center'}} >Sortear uma cidade aleatória</Button>
                    {/* <Button variant="ghost" colorScheme="teal" onClick={handleSearchPharmacies} >Ver drogarias</Button> */}
                    {/* {(randomCity) &&
                    <Button variant="ghost" colorScheme="teal" onClick={handleSearchPharmacies} style={{fontSize:'15px'}}>Ver drogarias</Button>
                    }    */}
                </Card.Footer>
            </Card.Root>
</Box>
        </>
    );

}