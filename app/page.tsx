'use client';

import { useState } from 'react';

// Definimos qué información tiene un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]); // Nuestra lista de productos en el carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  const summerProducts: Product[] = [
    { id: 1, name: "Camiseta Verano", price: 35, image: "/Verano001.png" },
    { id: 2, name: "Diseño Corazón", price: 28, image: "/corazon001.png" },
    { id: 3, name: "Edición Black", price: 42, image: "/black001.png" }
  ];

  // Función para añadir el producto específico
  const agregarAlCarrito = (producto: Product) => {
    setCart([...cart, producto]); // Mantenemos lo que había y añadimos el nuevo
    setIsCartOpen(true);
  };

  // Calculamos el precio total sumando todos los productos del carrito
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-zinc-700 selection:text-white relative">
      
      {/* PANEL DEL CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-all" onClick={() => setIsCartOpen(false)} />
          
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Tu Movimiento ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-black font-bold uppercase text-xs tracking-widest">Cerrar [X]</button>
            </div>

            {/* LISTA DE PRODUCTOS EN EL CARRITO */}
            <div className="flex-grow overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-400 italic text-center px-10">
                  <p>Tu carrito está vacío. El movimiento empieza con una prenda.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center animate-in fade-in slide-in-from-bottom-2">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm bg-zinc-100" />
                      <div className="flex-grow">
                        <h4 className="font-black uppercase text-sm tracking-tight">{item.name}</h4>
                        <p className="text-zinc-500 font-bold">{item.price}.00€</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOTAL Y BOTÓN DE PAGO */}
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="font-bold uppercase tracking-widest text-zinc-500">Total Est.</span>
                <span className="text-2xl font-black italic">{total}.00€</span>
              </div>
              <button 
                className="w-full bg-zinc-900 text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
              >
                Checkout
              </button>
              <button 
                onClick={() => setCart([])}
                className="w-full text-[10px] text-zinc-400 mt-4 uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="flex items-center cursor-pointer">
          <img src="/logo.png" alt="Logo" className="h-18 w-auto transition-transform hover:scale-105 duration-300" />
        </div>

        <div className="flex gap-8 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-sm font-bold tracking-wide bg-zinc-800 text-white px-6 py-3 rounded-full transition-all hover:bg-black hover:scale-105 shadow-lg">
            Carrito ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-24 px-4 bg-zinc-50">
        <span className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-xs mb-6">Temporada 2026</span>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 uppercase italic leading-[0.85] transform -skew-x-6" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #27272a' }}>BY STUDENTS</span><br/>
          <span className="text-zinc-800">FOR STUDENTS</span>
        </h2>
        <p className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-zinc-400 mt-6 mb-12 italic">No es solo ropa, es un movimiento.</p>
      </section>

      {/* CATÁLOGO */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="flex justify-between items-end mb-12 border-b-2 border-zinc-800 pb-4">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic">Colección Verano 2026</h3>
          <span className="bg-zinc-800 text-white text-[10px] font-black px-3 py-1 mb-2 tracking-[0.2em] uppercase">New Drop</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {summerProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100 relative rounded-sm border border-zinc-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 font-bold text-sm shadow-sm">{product.price}.00€</div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tighter italic">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Edición Limitada</p>
                </div>
                <button 
                  onClick={() => agregarAlCarrito(product)}
                  className="bg-zinc-800 text-white p-4 rounded-full hover:bg-black transition-all hover:rotate-90 shadow-lg"
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

      {/* CONTACTO */}
      <section className="bg-zinc-900 py-24 px-4 text-center text-white">
          <h3 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tighter italic">¿Hablamos?</h3>
          <p className="text-zinc-400 mb-12 max-w-md mx-auto font-medium">By Students For Students significa que estamos cerca de ti. Escríbenos.</p>
          <a href="mailto:tu-email@marca.com" className="bg-white text-zinc-900 px-16 py-6 font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl">Enviar Email</a>
      </section>

      <footer className="bg-black text-white py-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 italic">
        © 2026 BY STUDENTS FOR STUDENTS - MOVEMENT ESTABLISHED
      </footer>
    </main>
  );
}