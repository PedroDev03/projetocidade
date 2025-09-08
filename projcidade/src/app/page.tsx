"use client";
import Card from './Componentes/CardCidade';
import Image from "next/image";
import BG from "@/app/assets/background-login2.png"
export default function Home() {
  return (
    <div>
      {/* <Image src={BG} alt="Fundo" fill style={{ objectFit: "cover" }} /> */}
      <main>
       {Card()}
      </main>
      {/* <footer className="">

        {C}
      </footer> */}
    </div>
  );
}
