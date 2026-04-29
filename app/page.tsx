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

  // ESTADO DE LA CUENTA ATRÁS
  const [timeLeft, setTimeLeft] = useState({ days: 35, hours: 0, minutes: 0, seconds: 0 });

  // ESTADOS DE LA PANTALLA DE CARGA
  const [isLoading, setIsLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    // Lógica de la Pantalla de Carga
    const fadeTimer = setTimeout(() => setFadeLoader(true), 2000); // Empieza a desaparecer a los 2s
    const removeTimer = setTimeout(() => setIsLoading(false), 2500); // Se borra a los 2.5s

    // Popup a los 4.5 segundos (Para que no se pise con la pantalla de carga)
    const timerPopup = setTimeout(() => {
      setShowPopup(true);
    }, 4500);

    // Lógica de la Cuenta Atrás (Fijada a 35 días)
    const targetDate = new Date().getTime() + (35 * 24 * 60 * 60 * 1000);

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
      } else {
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
      clearTimeout(timerPopup);
      clearInterval(countdownInterval);
    };
  }, []);

  const summerProducts: Product[] = [
    { 
      id: 1, 
      name: "LYAM Tee Verano 001", 
      price: 30, 
      image: "/Verano001.png",
      description: "Nuestra 'Signature Boxy Fit'. Algodón pesado de 300 GSM con una caída arquitectónica. El logo LYAM bordado en alta definición aporta ese toque minimalista que define a la nueva generación." 
    },
    { 
      id: 2, 
      name: "LYAM Tee Verano 002", 
      price: 30, 
      image: "/Verano002.png",
      description: "Inspirada en los atardeceres del Mediterráneo. Un tejido reactivo que respira contigo, ideal para esas tardes interminables. Corte relajado y costuras reforzadas para una durabilidad extrema." 
    },
    { 
      id: 3, 
      name: "LYAM Tee Verano 003", 
      price: 30, 
      image: "/Verano003.png",
      description: "Graphic Tee 'Etheral Wave'. El arte urbano se funde con el tejido mediante serigrafía premium al agua. Suavidad extrema en contacto con la piel y un diseño que no pasa desapercibido." 
    },
    { 
      id: 4, 
      name: "LYAM Pant 001", 
      price: 28, 
      image: "/pant001.png",
      description: "Baggy Denim 'Obsidian'. Un regreso a los 90 con el toque premium de LYAM. Denim rígido de 14oz con un lavado a la piedra que crea matices únicos en cada pieza. El volumen perfecto para tus sneakers." 
    },
    { 
      id: 5, 
      name: "LYAM Pant 002", 
      price: 28, 
      image: "/pant002.png",
      description: "Technical Cargo 'Urban Nomad'. Funcionalidad sin límites. Seis bolsillos de acceso rápido integrados en un diseño aerodinámico. Tejido Ripstop ligero diseñado para sobrevivir a la jungla de asfalto este verano." 
    },
    { 
      id: 6, 
      name: "LYAM Pant 003", 
      price: 28, 
      image: "/pant003.png",
      description: "Relaxed Chino 'Bone White'. La elegancia del streetwear. Un corte recto y fluido en tono hueso que eleva cualquier outfit. Cintura elástica oculta para que la comodidad sea tu mejor aliada en el campus." 
    }
  ];

  const agregarAlCarrito = (producto: Product) => {
    setCart([...cart, producto]);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = subtotal * discount;
  const totalFinal = subtotal - discountAmount;

  const aplicarCupon = () => {
    if (promoInput.toLowerCase() === 'lyam001') {
      setDiscount(0.10);
      setPromoError(false);
    } else {
      setPromoError(true);
      setDiscount(0);
    }
  };

  const handleRevealCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setIsSending(true);
      try {
        await fetch('https://formspree.io/f/xkokeekn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput, message: "Suscripción para Drop Verano 2026" }),
        });
        setCodeRevealed(true);
      } catch (error) {
        setCodeRevealed(true);
      } finally {
        setIsSending(false);
      }
    }
  };

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-zinc-700 selection:text-white relative">
      
      {/* PANTALLA DE CARGA (PRE-LOADER) */}
      {isLoading && (
        <div className={`fixed inset-0 z-[200] bg-white flex items-center justify-center transition-opacity duration-500 ${fadeLoader ? 'opacity-0' : 'opacity-100'}`}>
          <img 
            src="/logo.png" 
            alt="Cargando LYAM..." 
            className="h-20 md:h-28 w-auto"
            style={{ animation: 'spin 2s linear infinite' }} // Animación de giro suave
          />
        </div>
      )}

      {/* POP-UP DE BIENVENIDA */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
          <div className="bg-white w-full max-w-md p-10 relative z-10 shadow-2xl border-4 border-black">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black font-black uppercase text-[10px] tracking-widest">[ Cerrar ]</button>
            {!codeRevealed ? (
              <div className="text-center">
                <img src="/logo.png" alt="LYAM" className="h-16 mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">EARLY ACCESS</h3>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 leading-relaxed">
                  Apúntate a la lista para acceder al Drop 30 minutos antes y llevarte un <span className="text-black underline decoration-2">10% OFF</span>.
                </p>
                <form onSubmit={handleRevealCode} className="space-y-4">
                  <input required type="email" placeholder="TU@EMAIL.COM" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full border-2 border-zinc-100 p-4 text-xs font-bold uppercase tracking-widest focus:border-black outline-none transition-all" />
                  <button type="submit" disabled={isSending} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50">{isSending ? 'GUARDANDO...' : 'Entrar a la Lista'}</button>
                </form>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic text-green-600">ESTÁS DENTRO</h3>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-6 italic">Guarda este código para el día del Drop</p>
                <div className="bg-zinc-100 p-6 border-2 border-dashed border-zinc-300 rounded-sm mb-8"><span className="text-3xl font-black tracking-[0.3em] uppercase">LYAM001</span></div>
                <button onClick={() => setShowPopup(false)} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE PRODUCTO (Precios con interrogante y bloqueado) */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-sm flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
              <div className="md:w-1/2 bg-zinc-100 relative group">
                <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="bg-black text-white font-black px-6 py-2 tracking-[0.3em] uppercase text-xs rotate-[-10deg]">BLOQUEADO</span>
                </div>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover blur-sm transition-all duration-700" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-black font-bold uppercase text-[10px] tracking-widest">[ Cerrar ]</button>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{selectedProduct.name}</h3>
                <p className="text-4xl font-black mb-6 italic tracking-widest">??? €</p>
                <p className="text-zinc-600 mb-8 font-medium italic leading-relaxed">{selectedProduct.description}</p>
                <button disabled className="w-full bg-zinc-200 text-zinc-400 py-5 font-black uppercase tracking-widest cursor-not-allowed">Disponible en el Drop</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/logo.png" alt="LYAM Logo" className="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="hidden md:block"><span className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-4 py-1 rounded-full italic">Próximamente</span></div>
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-xs md:text-sm font-black bg-white border-2 border-black text-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition-all shadow-lg">
            CARRITO ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO SECTION CON CUENTA ATRÁS */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-32 px-4 bg-white">
        <img src="/logo.png" alt="LYAM Central" className="h-64 md:h-96 w-auto mb-6 animate-in fade-in zoom-in duration-1000 drop-shadow-2xl" />
        <h1 className="text-2xl md:text-3xl font-black italic tracking-widest uppercase mb-12">Drop Verano 2026</h1>
        
        {/* TIMER */}
        <div className="flex gap-3 md:gap-6 mb-16">
          <div className="flex flex-col items-center bg-white p-4 shadow-xl border-2 border-black min-w-[70px] md:min-w-[100px]">
            <span className="text-3xl md:text-5xl font-black italic">{timeLeft.days}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">DÍAS</span>
          </div>
          <div className="flex flex-col items-center bg-white p-4 shadow-xl border-2 border-black min-w-[70px] md:min-w-[100px]">
            <span className="text-3xl md:text-5xl font-black italic">{timeLeft.hours}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">HRS</span>
          </div>
          <div className="flex flex-col items-center bg-white p-4 shadow-xl border-2 border-black min-w-[70px] md:min-w-[100px]">
            <span className="text-3xl md:text-5xl font-black italic">{timeLeft.minutes}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">MIN</span>
          </div>
          <div className="flex flex-col items-center bg-white p-4 shadow-xl border-2 border-black min-w-[70px] md:min-w-[100px]">
            <span className="text-3xl md:text-5xl font-black italic">{timeLeft.seconds}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">SEG</span>
          </div>
        </div>

        <button onClick={scrollToCatalog} className="bg-black text-white px-16 py-6 font-black tracking-[0.2em] uppercase hover:bg-zinc-800 shadow-2xl transition-all hover:-translate-y-2">
          Ver Avance
        </button>
      </section>

      {/* CATÁLOGO (Precios Ocultos) */}
      <section id="catalog" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">Colección Sellada</h2>
          <div className="h-1 w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {summerProducts.map((product) => (
            <div key={product.id} className="group flex flex-col relative">
              <div onClick={() => setSelectedProduct(product)} className="aspect-[3/4] overflow-hidden bg-zinc-50 relative rounded-sm cursor-pointer border-2 border-zinc-100 hover:border-black hover:shadow-2xl transition-all duration-500">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* PRECIO OCULTO */}
                <div className="absolute bottom-6 left-6 bg-black text-white px-5 py-2 font-black text-lg shadow-xl italic tracking-widest">
                  ??? €
                </div>
              </div>
              <div className="flex justify-between items-start mt-8 px-2">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 italic">LYAM Signature</p>
                </div>
                <button className="bg-zinc-100 text-zinc-300 p-4 rounded-full cursor-not-allowed transition-all shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-black text-white py-32 px-6 text-center mt-20">
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">Let's Talk</h3>
        <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-12 italic">¿Dudas? Escríbenos y únete al movimiento.</p>
        <a href="mailto:info@lyam.com" className="inline-block bg-white text-black px-16 py-6 font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl">Enviar Email</a>
      </section>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-center w-full">TU CARRITO ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-black font-bold text-[10px] tracking-widest uppercase border px-2 py-1">Cerrar</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
                <p className="font-black uppercase tracking-widest text-sm mb-2">El carrito está vacío</p>
                <p className="text-[10px] uppercase tracking-widest">Espera al Drop para comprar</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center mb-6">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border" />
                    <div className="flex-grow">
                      <h4 className="font-black uppercase text-xs tracking-tighter italic leading-none">{item.name}</h4>
                      <p className="text-zinc-500 font-bold text-sm">??? €</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="border-t pt-6 bg-zinc-50 -mx-8 px-8 pb-6">
              <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400 italic">Código Secreto</label>
              <div className="flex gap-2">
                <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="INTRODUCE EL CÓDIGO" className="flex-grow border border-zinc-200 p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black" />
                <button onClick={aplicarCupon} className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">Aplicar</button>
              </div>
            </div>
            <div className="border-t pt-6">
              <button disabled className="w-full bg-zinc-300 text-zinc-500 py-6 font-black uppercase tracking-[0.2em] cursor-not-allowed">
                CERRADO HASTA EL DROP
              </button>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-white text-black py-24 border-t border-zinc-100 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-8 opacity-90">BY STUDENTS FOR STUDENTS</h2>
        <div className="w-10 h-1 bg-zinc-200 mx-auto mb-8"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300 italic">© 2026 LYAM STUDIO — ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  );
}