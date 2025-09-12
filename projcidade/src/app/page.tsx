"use client";
import Card from './Componentes/CardCidade';



export default function Home() {
  return (
    <div>
    <link rel="icon" href="/icon_infopharma.png" />
      <img
  src="/background-login2.png"
  alt="Fundo"
  style={{
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover'
  }}
/>
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
