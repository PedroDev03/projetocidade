"use client";
import Card from './Componentes/CardCidade';
import Image from "next/image";
import BG from "@/app/assets/background-login2.png"

export default function Home() {
  return (
    <div>
    <link rel="icon" href="/icon_infopharma.png" />
      <Image src={BG} alt="Fundo" fill style={{ objectFit: "cover" }} />
      <title>Sortear Cidade</title>

      <main>

       <Card/>

      </main>
      {/* <footer className="">

        {C}
      </footer> */}
    </div>
  );
}
