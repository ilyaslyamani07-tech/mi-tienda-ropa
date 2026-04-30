'use client';

import { useState, useEffect } from 'react';

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
  
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // --- NUEVA LÓGICA DE CONTRASEÑA ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // ESTADO DE LA CUENTA ATRÁS
  const [timeLeft, setTimeLeft] = useState({ days: 35, hours: 0, minutes: 0, seconds: 0 });

  // ESTADOS DE LA PANTALLA DE CARGA
  const [isLoading, setIsLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    // Lógica de la Pantalla de Carga inicial
    const fadeTimer = setTimeout(() => setFadeLoader(true), 2000);
    const removeTimer = setTimeout(() => setIsLoading(false), 2500);

    // El popup solo sale después de autenticarse
    if (isAuthenticated) {
      const timerPopup = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timerPopup);
    }

    // Cuenta atrás
    const targetDate = new Date().getTime() + (35 * 24 * 60 * 60 * 1000);
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance >= 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearInterval(countdownInterval);
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'lyam001') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const summerProducts: Product[] = [
    { id: 1, name: "LYAM Tee Verano 001", price: 30, image: "/Verano001.jpg", description: "Nuestra 'Signature Boxy Fit'. Algodón pesado de 300 GSM con una caída arquitectónica." },
    { id: 2, name: "LYAM Tee Verano 002", price: 30, image: "/Verano002.jpg", description: "Inspirada en los atardeceres del Mediterráneo. Tejido reactivo transpirable." },
    { id: 3, name: "LYAM Tee Verano 003", price: 30, image: "/Verano003.png", description: "Graphic Tee 'Etheral Wave'. Serigrafía premium al agua sobre algodón orgánico." },
    { id: 4, name: "LYAM Pant 001", price: 28, image: "/pant001.jpg", description: "Baggy Denim 'Obsidian'. Denim rígido de 14oz con lavado a la piedra." },
    { id: 5, name: "LYAM Pant 002", price: 28, image: "/pant002.jpg", description: "Technical Cargo 'Urban Nomad'. Seis bolsillos y tejido Ripstop ligero." },
    { id: 6, name: "LYAM Pant 003", price: 28, image: "/pant003.jpg", description: "Relaxed Chino 'Bone White'. Corte recto fluido en tono hueso premium." }
  ];

  const agregarAlCarrito = (producto: Product) => {
    setCart([...cart, producto]);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const totalFinal = subtotal - (subtotal * discount);

  const aplicarCupon = () => {
    if (promoInput.toLowerCase() === 'lyam001') {
      setDiscount(0.10);
      setPromoError(false);
    } else {
      setPromoError(true);
      setDiscount(0);
    }
  };

  // --- SI NO ESTÁ AUTENTICADO, MOSTRAR PANTALLA DE CONTRASEÑA ---
  if (!isAuthenticated) {
    return (
      <main className="h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-black">
        <img src="/logo.png" alt="LYAM" className="h-24 md:h-32 mb-12 animate-pulse" />
        <div className="max-w-sm w-full text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 italic">Acceso Restringido</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              required
              type="password" 
              placeholder="CONTRASEÑA" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border-b-2 border-black p-4 text-center text-xs font-black tracking-[0.5em] focus:outline-none placeholder:opacity-20"
            />
            <button type="submit" className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
              Desbloquear Archivos
            </button>
          </form>
          {authError && <p className="text-[9px] text-red-500 font-black uppercase mt-4 tracking-widest">Código Inválido</p>}
        </div>
      </main>
    );
  }

  // --- SI ESTÁ AUTENTICADO, MOSTRAR LA WEB REVELADA ---
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-zinc-700 selection:text-white relative">
      
      {/* PANTALLA DE CARGA */}
      {isLoading && (
        <div className={`fixed inset-0 z-[200] bg-white flex items-center justify-center transition-opacity duration-500 ${fadeLoader ? 'opacity-0' : 'opacity-100'}`}>
          <img src="/logo.png" alt="LYAM" className="h-20 w-auto animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      )}

      {/* POP-UP (Solo después de entrar) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
          <div className="bg-white w-full max-w-md p-10 relative z-10 shadow-2xl border-4 border-black">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">[ Cerrar ]</button>
            <div className="text-center">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">REVELACIÓN COMPLETA</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Usa <span className="text-black underline">LYAM001</span> en el checkout para un 10% adicional.</p>
              <button onClick={() => setShowPopup(false)} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest">Entendido</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PRODUCTO (Ya sin blur) */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-sm flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95">
              <div className="md:w-1/2 bg-zinc-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-black font-bold uppercase text-[10px] tracking-widest">[ Cerrar ]</button>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{selectedProduct.name}</h3>
                <p className="text-2xl font-black mb-6 italic">{selectedProduct.price}.00€</p>
                <p className="text-zinc-600 mb-8 font-medium italic leading-relaxed">{selectedProduct.description}</p>
                <button onClick={() => agregarAlCarrito(selectedProduct)} className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">Añadir al Carrito</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/logo.png" alt="LYAM" className="h-10 md:h-14 w-auto transition-transform group-hover:scale-110" />
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-xs md:text-sm font-black bg-black text-white px-5 py-2 rounded-full shadow-lg">
            MI CESTA ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO / TIMER */}
      <section className="text-center pt-20 pb-20 px-4 bg-white">
        <h1 className="text-[10px] font-black tracking-[0.5em] uppercase mb-12 opacity-30 italic">Lanzamiento Oficial</h1>
        <div className="flex justify-center gap-4 mb-16 scale-75 md:scale-100">
          {[
            { v: timeLeft.days, l: 'DÍAS' },
            { v: timeLeft.hours, l: 'HRS' },
            { v: timeLeft.minutes, l: 'MIN' },
            { v: timeLeft.seconds, l: 'SEG' }
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center bg-black text-white p-4 min-w-[80px]">
              <span className="text-4xl font-black italic">{t.v}</span>
              <span className="text-[8px] font-bold mt-1 tracking-widest">{t.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN LEAK (Filtración) */}
      <section className="bg-zinc-50 py-20 px-6 text-center border-y border-zinc-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-6">EL VERANO ES NUESTRO.</h2>
          <p className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-widest leading-loose">
            Has desbloqueado el catálogo secreto. Aquí puedes encontrar la pieza que definirá tu verano. 
            No es solo ropa, es la filtración de algo mucho más grande.
          </p>
        </div>
      </section>

      {/* CATÁLOGO REVELADO */}
      <section id="catalog" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">Drop Season 01</h2>
          <div className="h-1 w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {summerProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div onClick={() => setSelectedProduct(product)} className="aspect-[3/4] overflow-hidden bg-zinc-50 relative rounded-sm cursor-pointer border border-zinc-100 hover:shadow-2xl transition-all duration-500">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 font-black text-sm shadow-xl italic">
                  {product.price}.00€
                </div>
              </div>
              <div className="flex justify-between items-start mt-8 px-2">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">LYAM ORIGINAL</p>
                </div>
                <button onClick={() => agregarAlCarrito(product)} className="bg-black text-white p-4 rounded-full hover:rotate-90 transition-all shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-24 text-center px-6 mt-32">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8 italic">BY STUDENTS FOR STUDENTS</h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 italic">© 2026 LYAM STUDIO — ALL RIGHTS RESERVED</p>
      </footer>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic w-full italic">TU CARRITO ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 font-bold text-[10px] uppercase border px-2 py-1">Cerrar</button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 items-center mb-6">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border" />
                  <div className="flex-grow">
                    <h4 className="font-black uppercase text-xs tracking-tighter italic leading-none">{item.name}</h4>
                    <p className="text-zinc-500 font-bold text-sm">{item.price}.00€</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-6">
              <div className="flex justify-between items-center pt-2 mb-8 italic">
                <span className="font-bold text-xs uppercase tracking-widest">Total Final</span>
                <span className="text-3xl font-black">{totalFinal.toFixed(2)}€</span>
              </div>
              <button className="w-full bg-black text-white py-6 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 shadow-xl">
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}