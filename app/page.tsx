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
      description: "Nuestra pieza insignia. Corte oversized en algodón premium de 240 GSM. Diseñada para resistir el ritmo de la ciudad sin perder la frescura del verano."
    },
    { 
      id: 2, 
      name: "LYAM Corazón", 
      price: 28, 
      image: "/corazon001.png",
      description: "El arte y la calle se unen. Estampado en serigrafía de alta densidad con nuestro icónico diseño 'Heartbeat'. Un recordatorio de la pasión de los estudiantes."
    },
    { 
      id: 3, 
      name: "LYAM Black Edition", 
      price: 42, 
      image: "/black001.png",
      description: "Minimalismo absoluto. Tejido con acabado lavado al ácido para un look vintage. Detalles bordados en el cuello y etiqueta de autenticidad LYAM."
    }
  ];

  const agregarAlCarrito = (producto: Product) => {
    setCart([...cart, producto]);
    setIsCartOpen(true);
    setSelectedProduct(null); // Cerramos el modal si estaba abierto al añadir
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-zinc-700 selection:text-white relative">
      
      {/* 1. MODAL DE PRODUCTO (VISTA DETALLADA) */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-sm flex flex-col md:flex-row animate-in zoom-in-95 duration-300 shadow-2xl">
              
              {/* Imagen Grande */}
              <div className="md:w-1/2 bg-zinc-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              {/* Info del Producto */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-black font-bold uppercase text-xs tracking-widest">
                  [ Cerrar ]
                </button>
                
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] mb-4 italic">LYAM Signature Series</span>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 leading-none">{selectedProduct.name}</h3>
                <p className="text-2xl font-bold mb-6 italic text-zinc-900">{selectedProduct.price}.00€</p>
                
                <div className="border-t border-zinc-100 pt-6 mb-8">
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => agregarAlCarrito(selectedProduct)}
                      className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
                    >
                      Añadir al Carrito
                    </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2. PANEL DEL CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">LYAM Cart ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-black font-bold text-[10px] tracking-widest uppercase border px-2 py-1">Cerrar</button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-400 italic text-center px-10">
                  <p>Tu carrito está vacío. El movimiento LYAM te espera.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-sm border border-zinc-100" />
                      <div className="flex-grow">
                        <h4 className="font-black uppercase text-xs tracking-tight">{item.name}</h4>
                        <p className="text-zinc-500 font-bold text-sm">{item.price}.00€</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold uppercase tracking-widest text-zinc-400 text-xs">Total</span>
                <span className="text-2xl font-black italic">{total}.00€</span>
              </div>
              <button className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all" disabled={cart.length === 0}>
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}

      {/* 3. NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-6 border-b border-zinc-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-3xl font-black tracking-tighter uppercase italic group-hover:scale-105 transition-transform duration-300">
            LYAM
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full transition-all hover:bg-zinc-800 shadow-lg active:scale-95">
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* 4. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-24 px-4 bg-white overflow-hidden">
        <span className="text-zinc-400 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 animate-pulse italic">Drop 01 / Verano 2026</span>
        <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-4 uppercase italic leading-[0.8] transform -skew-x-6 select-none" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #000' }}>LYAM</span><br/>
          <span className="text-black">STUDIO</span>
        </h2>
        <p className="text-lg md:text-xl font-bold tracking-[0.1em] uppercase text-zinc-400 mt-8 mb-12 italic max-w-lg">
          No es solo moda.<br/> 
          <span className="text-black font-black underline decoration-zinc-200 underline-offset-8 uppercase">Es un movimiento.</span>
        </p>
      </section>

      {/* 5. PRODUCTOS (CATÁLOGO) */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b-2 border-black pb-4">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Essential Pieces</h3>
          <span className="bg-black text-white text-[10px] font-black px-4 py-1.5 tracking-[0.3em] uppercase rounded-full mb-2">Shop All</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {summerProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Clic en la foto abre el modal */}
              <div 
                onClick={() => setSelectedProduct(product)}
                className="aspect-[3/4] overflow-hidden bg-zinc-50 relative rounded-sm cursor-pointer border border-zinc-100 hover:shadow-2xl transition-all duration-500"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-2 py-1 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Click para detalles
                </div>
                <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 font-black text-sm shadow-xl italic tracking-tighter">
                  {product.price}.00€
                </div>
              </div>
              
              <div className="flex justify-between items-start mt-8 px-2">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 italic">By Students For Students</p>
                </div>
                <button 
                  onClick={() => agregarAlCarrito(product)}
                  className="bg-black text-white p-4 rounded-full hover:bg-zinc-800 transition-all hover:rotate-90 shadow-lg active:scale-90"
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

      {/* FOOTER */}
      <footer className="bg-black text-white py-24 text-center px-6">
        <div className="text-4xl font-black tracking-tighter uppercase italic mb-6">LYAM</div>
        <p className="text-zinc-500 max-w-sm mx-auto text-xs font-bold uppercase tracking-[0.2em] leading-loose mb-12">
          Fundada por estudiantes, inspirada por las calles. Únete a la nueva era del streetwear.
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-700">
          © 2026 LYAM STUDIO — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}