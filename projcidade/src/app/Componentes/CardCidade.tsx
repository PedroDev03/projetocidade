"use client";
import { useState, useEffect } from "react";
// Apenas importe os componentes que você realmente vai usar
import { Box, Button, Card, CardBody, CardFooter, Center, Heading, Stack, Text } from "@chakra-ui/react";
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


const LinkDrogMap = <a target="blank" href={`https://www.google.com/maps/search/Farmácias+${randomCity?.nome}+${randomCity?.microrregiao.mesorregiao.UF.sigla}`} 
 
style={{fontWeight:'bold'}}
>
    <u> Clique aqui</u>
    </a>


// const handleSearchPharmacies = async ()=> {
//     if (!randomCity) return;


//     setIsLoadingPharmacies(true);
//     setPharmacies([]);
//     setSearchAttempted(true);

//     const query = `farmácia ${randomCity.nome}`;
//     const url = `/api?query=${encodeURIComponent(query)}`;

//     console.log("1. [FRONT-END] Chamando a API em:", url);


//     try {
//         const response = await fetch(url);

//          console.log("3. [FRONT-END] Resposta recebida do backend com status:", response.status);
         
//         if (response.ok) {
//             const jsonBusca: Lugar [] = await response. json();
//              console.log("4. [FRONT-END] Sucesso! Dados recebidos:", jsonBusca);
//             setPharmacies(jsonBusca);
//         }else{
//             const errorText = await response.text();
//             console.error("Erro na API interna:", await response.json());
//             console.error("4. [FRONT-END] Erro na API interna:", errorText);
//         }
//     }catch (error) {
//         console.error("4. [FRONT-END] Falha de rede ao chamar a API interna:", error);
//     }finally {
//         console.log("5. [FRONT-END] Finalizando a busca.");
//         setIsLoadingPharmacies(false); 
//     }
// };


//    function cortarAtePalavra(
//   arr: Lugar[],
//   palavra: string
// ): Lugar[] {
//   // procura o índice do primeiro objeto que contém a palavra
//   const index = arr.findIndex((item) =>
//     item.display_name.toLowerCase().includes(palavra.toLowerCase())
//   );

//   // se achou, retorna do começo até esse índice (excluindo o encontrado)
//   return index !== -1 ? arr.slice(0, index) : arr;
// }

    if (isLoading) {
        return <p>Carregando lista de cidades...</p>;
    }



// const pharmaciesCortadas = cortarAtePalavra(pharmacies, "Região");
    return (
        <>

                  
        {/* <ul>
            {Data?.slice(0, 10).map((cidade) =>
            <li key={cidade.id}>
                {cidade.nome} 
            </li>
            )}
        </ul> */}


 


            <Box display="flex" justifyContent="Center" alignContent="Center"
           bgSize="cover"
            bgRepeat="no-repeat"
             minH="100vh"
            alignItems="center"

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
                            <p style={{ marginTop:'10px', fontSize:'20px' }}>Drogarias na cidade {randomCity.nome}<br></br> pelo Google maps: {LinkDrogMap}</p><br></br>
                          
                            <p></p>
                        </div>
                    )}
                        
                        {searchAttempted && !isLoadingPharmacies && pharmacies.length === 0 && (
                             <Text mt={4} color="orange.600">
                                Nenhuma farmácia encontrada para esta cidade.
                             </Text>
                        )}


                        
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

}0