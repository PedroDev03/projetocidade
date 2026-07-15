"use client";
// Certifique-se de que o caminho abaixo bate exatamente com a sua pasta (maiúscula/minúscula)
import Card from './componentes/cardcidade';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#5C161E', minHeight: '100vh' }}>
      <main>
        <Card />
      </main>
    </div>
  );
}   
