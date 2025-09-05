import { useState, useEffect } from "react";

 interface Cidades{
     id: number;
    nome: string;
     UF: {
     id: number;
    sigla: string;
    nome: string;
    regiao: {
    id: number;
    nome: string;
          };
        };
    }

 


export default function Card (){

const [Data, setData] = useState(null);

useEffect(() => {


const fetchData = async () => {

    try {
        const response = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
        );
    
    if(response.ok){
        const jsonData = await response.json();
        setData(jsonData)
        console.log(Data)

    }
    } catch (error) {
   console.error("Erro ao buscar dados:", error);
}

}
}, [1000]);



return(
    <h1> dados {Data.id}</h1>
);

}