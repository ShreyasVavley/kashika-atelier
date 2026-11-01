import React, { useState } from "react";
import Header from "./components/Header";
import SareeCanvas from "./components/SareeCanvas";
import ColorwaySelector from "./components/ColorwaySelector";
import MasterDesignTabs from "./components/MasterDesignTabs";
import TrousseauBox from "./components/TrousseauBox";
import KarigarLedger from "./components/KarigarLedger";
import DrapePhysics from "./components/DrapePhysics";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { MASTER_DESIGNS, LIGHTING_PRESETS } from "./data/sarees";

export default function App() {
  const [masterDesigns] = useState(MASTER_DESIGNS);
  const [currentDesign, setCurrentDesign] = useState(MASTER_DESIGNS[0]);
  const [selectedColorway, setSelectedColorway] = useState(MASTER_DESIGNS[0].colorways[0]);
  const [lightingPreset, setLightingPreset] = useState(LIGHTING_PRESETS[1]); // Default to Candlelight/Diya glow
  const [currency, setCurrency] = useState("INR");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [trousseauItems, setTrousseauItems] = useState([]);
  const [loupeActive, setLoupeActive] = useState(false);

  // Switch Master Design
  const handleSelectDesign = (design) => {
    setCurrentDesign(design);
    setSelectedColorway(design.colorways[0]);
  };

  // Add single saree to silk cart
  const handleAddToCart = (masterDesign, colorway) => {
    setCartItems((prev) => [...prev, { masterDesign, colorway }]);
    setCartOpen(true);
  };

  // Remove single saree from silk cart
  const handleRemoveCartItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add to 3-slot Bridal Trousseau Box
  const handleAddToTrousseau = (masterDesign, colorway) => {
    if (trousseauItems.length >= 3) {
      alert("Your Royal Trousseau Box already has 3 sarees. Remove a piece from the box below to substitute this colorway.");
      return;
    }
    setTrousseauItems((prev) => [...prev, { masterDesign, colorway }]);
    // Smoothly scroll down to trousseau box
    const el = document.getElementById("trousseau-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Remove from Trousseau Box
  const handleRemoveTrousseauItem = (slotIndex) => {
    setTrousseauItems((prev) => prev.filter((_, i) => i !== slotIndex));
  };

  // Checkout complete Trousseau box
  const handleCheckoutTrousseau = (items, finalPrice) => {
    let msg = `*Namaste Kashika Atelier!* 🥻🎁\n\nI would like to reserve the *Curated Royal Bridal Trousseau Box* (3 Ceremonial Pieces):\n\n`;
    items.forEach((item, idx) => {
      msg += `*Event ${idx + 1}: ${item.masterDesign.name}*\n`;
      msg += `• Colorway: ${item.colorway.name} (${item.colorway.sanskrit})\n`;
      msg += `• Zari: ${item.colorway.zariName}\n\n`;
    });
    msg += `*Bundled Privilege Price:* ₹${finalPrice.toLocaleString("en-IN")}\n`;
    msg += `• Includes: Handcrafted Brass & Velvet Keepsake Trunk\n\n`;
    msg += `Please confirm loom dispatch timelines and arrange a 1-on-1 video call showing with the master weaver.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919886620362?text=${encoded}`, "_blank");
  };

  // Direct WhatsApp Video Call Request
  const handleOpenWhatsAppVideo = (masterDesign, colorway) => {
    const msg = `*Namaste Kashika Atelier!* 🥻📹\n\nI am interested in *${masterDesign.name}* in the *${colorway.name} (${colorway.sanskrit})* colorway (₹${masterDesign.basePriceINR.toLocaleString("en-IN")}).\n\nI would like to schedule a 1-on-1 VIP Video Call on WhatsApp to inspect the pallu drape, zari sheen, and matching unstitched blouse piece.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919886620362?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Royal Header */}
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* Master Collection Navigation Tabs */}
        <MasterDesignTabs
          masterDesigns={masterDesigns}
          currentDesign={currentDesign}
          onSelectDesign={handleSelectDesign}
        />

        {/* Hero Atelier Stage (Split View: Canvas + Selector) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 6-7 Cols: Interactive Saree Canvas with Zari Light Shifter */}
            <div className="lg:col-span-7 w-full sticky top-24">
              <SareeCanvas
                selectedColorway={selectedColorway}
                lightingPreset={lightingPreset}
                setLightingPreset={setLightingPreset}
                lightingPresets={LIGHTING_PRESETS}
                loupeActive={loupeActive}
                setLoupeActive={setLoupeActive}
              />
            </div>

            {/* Right 5-6 Cols: Colorway Matrix & Provenance Selector */}
            <div className="lg:col-span-5 w-full">
              <ColorwaySelector
                masterDesign={currentDesign}
                selectedColorway={selectedColorway}
                setSelectedColorway={setSelectedColorway}
                currency={currency}
                onAddToCart={handleAddToCart}
                onAddToTrousseau={handleAddToTrousseau}
                onOpenWhatsAppVideo={handleOpenWhatsAppVideo}
              />
            </div>
          </div>
        </section>

        {/* Tactile Drape & Pleat Physics Section */}
        <DrapePhysics
          selectedColorway={selectedColorway}
          masterDesign={currentDesign}
        />

        {/* The Master Karigar Provenance Ledger */}
        <KarigarLedger
          masterDesign={currentDesign}
          selectedColorway={selectedColorway}
        />

        {/* Interactive Bridal Trousseau Box Builder */}
        <div id="trousseau-section">
          <TrousseauBox
            trousseauItems={trousseauItems}
            onRemoveItem={handleRemoveTrousseauItem}
            onCheckoutTrousseau={handleCheckoutTrousseau}
            currency={currency}
            masterDesign={currentDesign}
          />
        </div>
      </main>

      {/* Cart & Concierge Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Royal Footer */}
      <Footer />
    </div>
  );
}
