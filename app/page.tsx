'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const summerProducts: Product[] = [
    { 
      id: 1, 
      name: "LYAM Verano 001", 
      price: 35, 
      image: "/Verano001.png",
      description: "Corte oversized en algodón premium de 240 GSM. Diseñada para resistir el ritmo de la ciudad."
    },
    { 
      id: 2, 
      name: "LYAM Corazón", 
      price: 28, 
      image: "/corazon001.png",
      description: "Estampado en serigrafía de alta densidad con nuestro icónico diseño 'Heartbeat'."
    },
    { 
      id: 3, 
      name: "LYAM Black Edition", 
      price: 42, 
      image: "/black001.png",
      description: "Tejido con acabado lavado al ácido para un look vintage. Detalles bordados LYAM."
    }
  ];

  const agregarAlCarrito = (producto: Product) => {
    setCart([...cart, producto]);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Función para bajar al catálogo suavemente
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-zinc-700 selection:text-white relative">
      
      {/* MODAL DE PRODUCTO */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-sm flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-1/2 bg-zinc-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-black font-bold uppercase text-[10px]"> [ Cerrar ] </button>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{selectedProduct.name}</h3>
                <p className="text-2xl font-bold mb-6 italic">{selectedProduct.price}.00€</p>
                <p className="text-zinc-600 mb-8 font-medium">{selectedProduct.description}</p>
                <button onClick={() => agregarAlCarrito(selectedProduct)} className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"> Añadir al Carrito </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img 
            src="/logo.png" 
            alt="LYAM Logo" 
            className="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Etiqueta de Temporada en la Nav */}
        <div className="hidden md:block">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase bg-zinc-100 px-4 py-1 rounded-full">Verano 2026</span>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-xs md:text-sm font-black bg-black text-white px-5 py-2 rounded-full hover:bg-zinc-800 transition-all shadow-lg">
            EL CARRITO COMPLETO ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO SECTION - LOGO MÁS GRANDE */}
      <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-32 px-4 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-50 rounded-full blur-[120px] opacity-50 -z-10"></div>
        
        <span className="text-zinc-400 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 italic">New Drop / Season 01</span>

        {/* LOGO CENTRAL - AUMENTADO h-56 a h-96 en desktop */}
        <img 
          src="/logo.png" 
          alt="LYAM Central" 
          className="h-56 md:h-96 w-auto mb-6 animate-in fade-in zoom-in duration-1000 drop-shadow-2xl"
        />
        
        <h1 className="text-2xl md:text-3xl font-black italic tracking-widest uppercase mb-12">Verano 2026</h1>
        
        <button 
          onClick={scrollToCatalog}
          className="bg-black text-white px-16 py-6 font-black tracking-[0.2em] uppercase hover:bg-zinc-800 shadow-2xl transition-all hover:-translate-y-2 active:scale-95"
        >
          Ver Colección
        </button>
      </section>

      {/* CATÁLOGO DE PRODUCTOS (ID catalog para el scroll) */}
      <section id="catalog" className="max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4 text-center">Colección Verano 2026</h2>
          <div className="h-1 w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {summerProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div 
                onClick={() => setSelectedProduct(product)}
                className="aspect-[3/4] overflow-hidden bg-zinc-50 relative rounded-sm cursor-pointer border border-zinc-100 hover:shadow-2xl transition-all duration-500"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 font-black text-sm shadow-xl italic">
                  {product.price}.00€
                </div>
              </div>
              <div className="flex justify-between items-start mt-8 px-2">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter italic">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 italic">LYAM Signature</p>
                </div>
                <button 
                  onClick={() => agregarAlCarrito(product)}
                  className="bg-black text-white p-4 rounded-full hover:bg-zinc-800 transition-all hover:rotate-90 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO */}
      <section className="bg-black text-white py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">Let's Talk</h3>
          <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-12 leading-loose italic px-10">
            ¿Dudas? ¿Colaboraciones? <br/>
            Escríbenos y únete al movimiento.
          </p>
          <a 
            href="mailto:tu-email@lyam.com" 
            className="inline-block bg-white text-black px-16 py-6 font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl"
          >
            Enviar Email
          </a>
        </div>
      </section>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-black text-center w-full">EL CARRITO COMPLETO ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 font-bold text-[10px] tracking-widest uppercase border px-2 py-1 hover:text-black transition-colors">Cerrar</button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 items-center mb-6 animate-in fade-in slide-in-from-bottom-2">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border" />
                  <div className="flex-grow">
                    <h4 className="font-black uppercase text-xs tracking-tighter italic">{item.name}</h4>
                    <p className="text-zinc-500 font-bold text-sm">{item.price}.00€</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xs uppercase tracking-widest text-zinc-400 italic">Total Estimado</span>
                <span className="text-3xl font-black italic">{total}.00€</span>
              </div>
              <button className="w-full bg-black text-white py-6 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95">
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </>
      )}

      {/* FOOTER - LEMA PRINCIPAL ABAJO DEL TODO */}
      <footer className="bg-white text-black py-24 border-t border-zinc-100 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-8 select-none opacity-90">
          BY STUDENTS FOR STUDENTS
        </h2>
        <div className="w-10 h-1 bg-zinc-200 mx-auto mb-8"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">
          © 2026 LYAM STUDIO — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}