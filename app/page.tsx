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
  
  // Lógica de Cupón Secreto
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState(false);

  // Lógica del Pop-up de Bienvenida
  const [showPopup, setShowPopup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Mostrar el popup a los 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const summerProducts: Product[] = [
    { id: 1, name: "LYAM Verano 001", price: 35, image: "/Verano001.png", description: "Corte oversized en algodón premium de 240 GSM." },
    { id: 2, name: "LYAM Corazón", price: 28, image: "/corazon001.png", description: "Estampado en serigrafía de alta densidad." },
    { id: 3, name: "LYAM Black Edition", price: 42, image: "/black001.png", description: "Tejido con acabado lavado al ácido para un look vintage." }
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

  // FUNCIÓN ACTUALIZADA CON TU ENLACE DE FORMSPREE
  const handleRevealCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setIsSending(true);
      try {
        await fetch('https://formspree.io/f/xkokeekn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: emailInput,
            message: "Nuevo suscriptor de LYAM" 
          }),
        });
        setCodeRevealed(true);
      } catch (error) {
        console.error("Error al guardar el email", error);
        setCodeRevealed(true); // Revelamos igual para no frustrar al cliente
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
      
      {/* POP-UP DE BIENVENIDA */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
          <div className="bg-white w-full max-w-md p-10 relative z-10 shadow-2xl border-4 border-black">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black font-black uppercase text-[10px] tracking-widest">[ Cerrar ]</button>
            
            {!codeRevealed ? (
              <div className="text-center">
                <img src="/logo.png" alt="LYAM" className="h-16 mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 italic">ÚNETE AL MOVIMIENTO</h3>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 leading-relaxed">
                  Introduce tu email y desbloquea un <span className="text-black underline decoration-2">10% de descuento</span> en tu primera compra.
                </p>
                <form onSubmit={handleRevealCode} className="space-y-4">
                  <input 
                    required
                    type="email" 
                    placeholder="TU@EMAIL.COM" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full border-2 border-zinc-100 p-4 text-xs font-bold uppercase tracking-widest focus:border-black outline-none transition-all"
                  />
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50"
                  >
                    {isSending ? 'GUARDANDO...' : 'Revelar Código Secreto'}
                  </button>
                </form>
                <button onClick={() => setShowPopup(false)} className="mt-4 text-[9px] text-zinc-300 font-bold uppercase tracking-[0.2em] hover:text-zinc-500 transition-colors">
                  No me interesa, prefiero pagar el total
                </button>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">CÓDIGO DESBLOQUEADO</h3>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-6 italic">Cópialo y úsalo en el carrito</p>
                <div className="bg-zinc-100 p-6 border-2 border-dashed border-zinc-300 rounded-sm mb-8">
                  <span className="text-3xl font-black tracking-[0.3em] uppercase italic">LYAM001</span>
                </div>
                <button onClick={() => setShowPopup(false)} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                  Empezar a comprar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE PRODUCTO */}
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
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 italic">{selectedProduct.name}</h3>
                <p className="text-2xl font-bold mb-6 italic">{selectedProduct.price}.00€</p>
                <p className="text-zinc-600 mb-8 font-medium italic leading-relaxed">{selectedProduct.description}</p>
                <button onClick={() => agregarAlCarrito(selectedProduct)} className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">Añadir al Carrito</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/logo.png" alt="LYAM Logo" className="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="hidden md:block">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase bg-zinc-100 px-4 py-1 rounded-full italic">Verano 2026</span>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsCartOpen(true)} className="text-xs md:text-sm font-black bg-black text-white px-5 py-2 rounded-full hover:bg-zinc-800 transition-all shadow-lg">
            EL CARRITO COMPLETO ({cart.length})
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-32 px-4 bg-white">
        <img src="/logo.png" alt="LYAM Central" className="h-64 md:h-96 w-auto mb-6 animate-in fade-in zoom-in duration-1000 drop-shadow-2xl" />
        <h1 className="text-2xl md:text-3xl font-black italic tracking-widest uppercase mb-12">Verano 2026</h1>
        <button onClick={scrollToCatalog} className="bg-black text-white px-16 py-6 font-black tracking-[0.2em] uppercase hover:bg-zinc-800 shadow-2xl transition-all hover:-translate-y-2">
          Ver Colección
        </button>
      </section>

      {/* CATÁLOGO */}
      <section id="catalog" className="max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">Colección Verano 2026</h2>
          <div className="h-1 w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {summerProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div onClick={() => setSelectedProduct(product)} className="aspect-[3/4] overflow-hidden bg-zinc-50 relative rounded-sm cursor-pointer border border-zinc-100 hover:shadow-2xl transition-all duration-500">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 font-black text-sm shadow-xl italic tracking-tighter">{product.price}.00€</div>
              </div>
              <div className="flex justify-between items-start mt-8 px-2">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">{product.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 italic">LYAM Signature</p>
                </div>
                <button onClick={() => agregarAlCarrito(product)} className="bg-black text-white p-4 rounded-full hover:bg-zinc-800 transition-all hover:rotate-90 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-black text-white py-32 px-6 text-center">
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 italic">Let's Talk</h3>
        <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-12 italic">¿Dudas? Escríbenos y únete al movimiento.</p>
        <a href="mailto:info@lyam.com" className="inline-block bg-white text-black px-16 py-6 font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl">Enviar Email</a>
      </section>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-6 mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-center w-full italic">TU CARRITO ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 font-bold text-[10px] tracking-widest uppercase border px-2 py-1">Cerrar</button>
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

            <div className="border-t pt-6 bg-zinc-50 -mx-8 px-8 pb-6">
              <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400 italic">Código Secreto</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="INTRODUCE EL CÓDIGO"
                  className="flex-grow border border-zinc-200 p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black"
                />
                <button 
                  onClick={aplicarCupon}
                  className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
                >
                  Aplicar
                </button>
              </div>
              {promoError && <p className="text-[9px] text-red-500 font-bold uppercase mt-2 tracking-widest">Código incorrecto</p>}
              {discount > 0 && <p className="text-[9px] text-green-600 font-bold uppercase mt-2 tracking-widest italic">Descuento aplicado con éxito</p>}
            </div>

            <div className="border-t pt-6">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest italic">
                  <span>Subtotal</span>
                  <span>{subtotal}.00€</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600 text-[10px] font-bold uppercase tracking-widest">
                    <span>Descuento Aplicado</span>
                    <span>-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-xs uppercase tracking-widest italic">Total Final</span>
                  <span className="text-3xl font-black italic">{totalFinal.toFixed(2)}€</span>
                </div>
              </div>
              <button className="w-full bg-black text-white py-6 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 shadow-xl">
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-white text-black py-24 border-t border-zinc-100 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-8 opacity-90 italic">BY STUDENTS FOR STUDENTS</h2>
        <div className="w-10 h-1 bg-zinc-200 mx-auto mb-8"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300 italic">© 2026 LYAM STUDIO — ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  );
}