/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TreeView } from './components/tree/TreeView';
import { AILab } from './components/ai-lab/AILab';
import { CollaborativeVault } from './components/vault/CollaborativeVault';
import { Person } from './types';
import { Network, Sparkles, Shield, User, Bell, Search, Menu } from 'lucide-react';
import { cn } from './lib/utils';

const INITIAL_DATA: Person[] = [
  { id: '1', firstName: 'Jean', lastName: 'Dupont', gender: 'male', parents: [], spouses: [] },
  { id: '2', firstName: 'Marie', lastName: 'Lefebvre', gender: 'female', parents: ['1'], spouses: [] },
  { id: '3', firstName: 'Pierre', lastName: 'Dupont', gender: 'male', parents: ['1'], spouses: [] },
  { id: '4', firstName: 'Lucie', lastName: 'Martin', gender: 'female', parents: ['2'], spouses: [] },
  { id: '5', firstName: 'Antoine', lastName: 'Dupont', gender: 'male', parents: ['3'], spouses: [] },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'tree' | 'ai' | 'vault'>('tree');
  const [familyData, setFamilyData] = useState<Person[]>(INITIAL_DATA);

  const tabs = [
    { id: 'tree', label: 'Arbre Généalogique', icon: '🌳' },
    { id: 'ai', label: 'Laboratoire IA', icon: '🖼️' },
    { id: 'vault', label: 'Coffre-fort', icon: '🔒' },
  ] as const;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-vault text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_#F59E0B]"></span>
            HeritageNexus
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Archivage Chiffré</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 pb-2">Exploration</div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-left",
                activeTab === tab.id 
                  ? "text-white bg-slate-800 shadow-sm" 
                  : "hover:text-white hover:bg-slate-800/50"
              )}
            >
              <span className="mr-3 text-lg opacity-80">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 pt-6 pb-2">Famille Active</div>
          <button className="w-full text-left px-3 py-2 hover:text-white text-sm transition-colors">Branche Beaumont</button>
          <button className="w-full text-left px-3 py-2 hover:text-white text-sm text-slate-500 transition-colors">Cercle Lefebvre</button>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-mono text-xs font-bold">W</div>
            <div>
              <p className="text-xs font-semibold text-white">Wasm Core</p>
              <p className="text-[10px] text-emerald-400 font-mono">Inference Locale Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#F5F2ED]">
        {/* Top Header */}
        <header className="h-16 border-b border-stone-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span className="font-serif italic capitalize">{activeTab === 'tree' ? 'Généalogie' : activeTab === 'ai' ? 'Restauration' : 'Archives'}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-medium">Session Beaumont #882</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-[11px] font-medium uppercase text-stone-600">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Zero-Knowledge E2EE
            </div>
            <div className="flex items-center gap-4">
               <button className="p-2 text-stone-400 hover:text-stone-600 transition-colors">
                 <Bell size={18} />
               </button>
               <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-800 transition-colors">
                  Exporter GEDCOM
               </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-7xl mx-auto h-full"
            >
              {activeTab === 'tree' && (
                <div className="grid grid-cols-12 gap-6 h-full content-start">
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                      <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                        <h3 className="text-sm font-semibold text-stone-800">Visualisation du Graphe (Modèle Beaumont)</h3>
                        <div className="flex gap-2">
                           <span className="px-2 py-1 bg-white border border-stone-200 text-[10px] rounded font-mono">Zoom 100%</span>
                           <span className="px-2 py-1 bg-white border border-stone-200 text-[10px] rounded font-mono">Focus Racine</span>
                        </div>
                      </div>
                      <TreeView data={familyData} onSelectPerson={(p) => console.log(p)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-4 font-mono">Activité du Coffre Collaboratif</h4>
                        <div className="space-y-4">
                           <div className="flex items-center gap-3 text-xs">
                             <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center font-bold text-stone-500">JB</div>
                             <div>
                               <p><span className="font-semibold">Jean Beaumont</span> a ajouté 3 photos.</p>
                               <p className="text-stone-400 text-[10px] font-mono mt-0.5">Il y a 10 min</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-3 text-xs">
                             <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center font-bold text-amber-600">ML</div>
                             <div>
                               <p><span className="font-semibold">Marc L.</span> a modifié la date d'Albert.</p>
                               <p className="text-stone-400 text-[10px] font-mono mt-0.5">Hier, 18:42</p>
                             </div>
                           </div>
                        </div>
                      </div>
                      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm border-l-4 border-amber-600">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 font-mono">Intégrité des données</h4>
                        <p className="text-[11px] leading-relaxed text-stone-600 mb-6 italic font-serif">
                          Toutes les métadonnées sont chiffrées avec la clé maître de la famille Beaumont. Aucun accès serveur possible.
                        </p>
                        <div className="flex justify-between items-end border-t border-stone-50 pt-4">
                          <span className="text-[9px] text-stone-400 uppercase tracking-widest font-mono">Vérifié par VectorSync</span>
                          <span className="text-[10px] font-mono font-bold text-stone-900 bg-stone-50 px-2 py-0.5 rounded">SHA-256: 8a2...f34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-stone-900 rounded-xl p-6 text-white shadow-xl border border-stone-800">
                      <h3 className="font-serif text-2xl font-light mb-6 flex items-baseline gap-2">
                        Lab IA
                        <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Bêta Wasm</span>
                      </h3>
                      <div className="space-y-6">
                        <div className="aspect-[4/3] bg-stone-800 rounded-lg flex flex-col items-center justify-center border border-dashed border-stone-700 group hover:border-amber-500/50 transition-colors cursor-pointer">
                           <Sparkles size={32} className="text-stone-600 group-hover:text-amber-500 transition-colors" />
                           <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Détection Faciale Active</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('ai')}
                          className="w-full py-4 bg-white text-stone-900 font-bold text-xs uppercase tracking-[0.2em] rounded transition-all hover:bg-stone-100 active:scale-[0.98]"
                        >
                          Accéder au Laboratoire
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-4 font-mono">Statistiques Graphe</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg">
                          <span className="text-xs text-stone-600">Membres Totaux</span>
                          <span className="text-lg font-display font-bold">142</span>
                        </div>
                        <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg">
                          <span className="text-xs text-stone-600">Générations</span>
                          <span className="text-lg font-display font-bold">8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && <AILab />}
              {activeTab === 'vault' && <CollaborativeVault />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
