import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, FolderLock, FileText, Camera, MoreVertical, Key, Search, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CollaborativeVault: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');

  const items = [
    { id: '1', name: 'Acte_Naissance_1922.pdf', type: 'document', date: '2 mai 1922', size: '2.4 MB' },
    { id: '2', name: 'Portrait_Famille_NoirEtBlanc.jpg', type: 'photo', date: '14 juil 1945', size: '1.2 MB' },
    { id: '3', name: 'Notes_GrandPere.txt', type: 'note', date: '10 sept 1980', size: '45 KB' },
  ];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsUnlocked(true);
    }
  };

  return (
    <div className="w-full bg-[#0F172A] text-slate-300 rounded-xl overflow-hidden min-h-[600px] flex flex-col border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
        <div className="flex items-center gap-4">
          <div className={cn("w-3 h-3 rounded-full shadow-lg transition-all duration-1000", isUnlocked ? "bg-emerald-500 shadow-emerald-500/50" : "bg-amber-500 shadow-amber-500/50")} />
          <div>
            <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white font-bold">Vault Familial Beaumont</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                Status: {isUnlocked ? 'Déchiffrement Actif (AES-256)' : 'Veille Sécurisée'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex -space-x-1.5">
              {[1,2].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0F172A] bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-400">
                  U{i}
                </div>
              ))}
            </div>
            <button className="p-2 hover:bg-white/5 rounded transition-colors">
              <Users size={16} className="text-slate-500" />
            </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-y-auto">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-sm z-20"
            >
              <form onSubmit={handleUnlock} className="w-full max-w-sm p-10 bg-slate-900 border border-white/5 rounded-xl shadow-2xl">
                <div className="flex justify-center mb-8">
                   <div className="p-5 bg-amber-500/10 rounded-full text-amber-500 ring-1 ring-amber-500/20">
                     <Lock size={32} />
                   </div>
                </div>
                <h3 className="serif text-2xl font-light text-white text-center mb-2">Accès Chiffré</h3>
                <p className="text-xs text-slate-500 text-center mb-8 leading-relaxed font-serif italic italic">L'accès nécessite votre clé privée Phantom. HeritageNexus ne stocke pas cette information.</p>

                <div className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PHANTOM-KEY-ENTRY"
                    className="w-full bg-slate-950/50 border border-white/10 rounded px-4 py-4 text-center text-xs tracking-[0.5em] focus:outline-none focus:border-amber-500/50 transition-colors uppercase font-mono"
                  />

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-amber-900/20"
                  >
                    Ouvrir le Vault
                  </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5">
                   <div className="flex items-center justify-center gap-2 text-[8px] text-slate-600 font-mono uppercase tracking-[0.2em]">
                      <ShieldCheck size={10} /> Protocole Zero-Knowledge v2.1
                   </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                  <input
                    type="text"
                    placeholder="Chercher dans les archives chiffrées..."
                    className="w-full bg-white/5 border border-white/5 rounded px-10 py-3 text-xs focus:outline-none focus:border-white/10 placeholder:text-slate-600"
                  />
                </div>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-3">
                  <FolderLock size={14} /> Nouveau Dépôt
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white/5 border border-white/5 p-6 rounded-lg hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <MoreVertical size={14} className="text-slate-500" />
                    </div>
                    
                    <div className="mb-4">
                       <div className="w-10 h-10 bg-slate-900 border border-white/5 rounded flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                          {item.type === 'document' ? <FileText size={20} /> : <Camera size={20} />}
                       </div>
                    </div>
                    
                    <h4 className="text-sm font-medium text-white mb-1.5 truncate group-hover:text-amber-100 transition-colors">{item.name}</h4>
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                      <span>{item.date}</span>
                      <span className="text-slate-700">/</span>
                      <span>{item.size}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                       <span className="text-[8px] text-slate-600 font-mono tracking-tighter uppercase italic">SHARD: IPFS-7782A</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 p-6 rounded bg-black/40 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Authenticité Garantie</p>
                       <p className="text-[10px] text-slate-500 font-serif italic italic">Toutes les pièces jointes sont vérifiées par Vector-Node Proofs.</p>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1">Dernière Sync: il y a 2m</p>
                    <div className="flex gap-1">
                       {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-3 bg-emerald-500/20 rounded-full" />)}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
