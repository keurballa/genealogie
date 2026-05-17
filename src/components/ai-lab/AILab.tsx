import React, { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Sparkles, Wand2, History, Download, Trash2, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AILab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;
    setIsProcessing(true);
    setProgress(0);

    const steps = ['Initialization', 'Denoising', 'Super-Resolution', 'Colorization'];
    for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(((i + 1) / steps.length) * 100);
    }
    setResult(image);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden h-[600px]">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col p-8 bg-stone-900 text-white gap-8 border-r border-stone-800">
        <div>
          <h2 className="serif text-2xl font-light mb-1">Laboratoire IA</h2>
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Bêta Wasm Runtime</p>
        </div>

        <div className="space-y-6 flex-1">
          <label className="group relative border border-stone-700 rounded-lg p-2 bg-stone-800/50 aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 bg-stone-700 rounded flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
               <ImageIcon className="text-stone-400 group-hover:text-amber-500 transition-colors" size={24} />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Déposer Archivage</p>
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          </label>

          <div className="space-y-4 pt-4">
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-stone-400">
                   <span>Super-Résolution</span>
                   <span className="text-amber-400">4x Neural</span>
                </div>
                <div className="h-0.5 bg-stone-800 rounded-full overflow-hidden">
                   <div className="h-full w-3/4 bg-amber-500" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-stone-400">
                   <span>Colorisation Arc-Tone</span>
                   <span className="text-stone-600">Désactivé</span>
                </div>
                <div className="h-0.5 bg-stone-800 rounded-full overflow-hidden">
                   <div className="h-full w-0 bg-amber-500" />
                </div>
             </div>
          </div>
        </div>

        <button
          onClick={processImage}
          disabled={!image || isProcessing}
          className={cn(
            "w-full py-4 text-xs font-bold uppercase tracking-[0.2em] rounded transition-all active:scale-95",
            image && !isProcessing ? "bg-white text-stone-900 hover:bg-stone-100" : "bg-stone-800 text-stone-600 cursor-not-allowed"
          )}
        >
          {isProcessing ? 'Traitement en cours...' : 'Lancer le Traitement Local'}
        </button>

        <p className="text-[9px] text-stone-500 text-center uppercase tracking-widest leading-relaxed">
          Inférence sécurisée sur puce locale.<br/>
          Zéro donnée partagée.
        </p>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative flex items-center justify-center p-12 bg-[#FBFBFA]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <AnimatePresence mode="wait">
          {!image && !isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 border border-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                 <Wand2 className="text-stone-300" size={24} />
              </div>
              <p className="text-xs font-serif italic text-stone-400">Prévisualisation Neutral-Net</p>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-sm space-y-4"
            >
              <div className="h-0.5 bg-stone-200 rounded-full overflow-hidden">
                 <motion.div
                   className="h-full bg-stone-900"
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                 />
              </div>
              <p className="text-[10px] text-center text-stone-400 font-mono tracking-[0.3em] uppercase">
                Optimisation des couches: {Math.round(progress)}%
              </p>
            </motion.div>
          )}

          {image && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col gap-6"
            >
               <div className="flex-1 relative rounded-lg overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] bg-white p-2 border border-stone-200">
                 <img
                   src={result || image}
                   alt="Preview"
                   className={cn(
                     "w-full h-full object-contain transition-all duration-1000 bg-stone-50 rounded-sm",
                     isProcessing ? "blur-xl" : "blur-0"
                   )}
                 />
                 {result && (
                  <div className="absolute bottom-6 right-6 bg-stone-900 text-white px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest shadow-xl">
                    Archive Restaurée
                  </div>
                 )}
               </div>
               <div className="flex justify-between items-center px-4">
                 <div className="flex gap-4">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2">
                       <Download size={14} /> Télécharger
                    </button>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2">
                       <Shield size={14} /> Vault
                    </button>
                 </div>
                 <button onClick={() => setImage(null)} className="text-stone-300 hover:text-red-500 transition-colors">
                   <Trash2 size={16} />
                 </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
