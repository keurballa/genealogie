import React, { useState } from 'react';
import { Person } from '../../types';
import { UserPlus, Edit2, Trash2, Save, X, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface FamilyManagerProps {
  people: Person[];
  onAddPerson: (person: Person) => void;
  onUpdatePerson: (person: Person) => void;
  onDeletePerson: (id: string) => void;
}

export const FamilyManager: React.FC<FamilyManagerProps> = ({ 
  people, 
  onAddPerson, 
  onUpdatePerson, 
  onDeletePerson 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Person>>({});

  const startEdit = (person: Person) => {
    setFormData(person);
    setEditingId(person.id);
    setIsAdding(false);
  };

  const startAdd = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: 'male',
      parents: [],
      spouses: [],
      birthDate: '',
      extraInfo: '',
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      const newPerson: Person = {
        ...formData as Person,
        id: Math.random().toString(36).substr(2, 9),
        parents: formData.parents || [],
        spouses: formData.spouses || []
      };
      onAddPerson(newPerson);
    } else if (editingId) {
      onUpdatePerson(formData as Person);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const cancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif italic text-stone-800">Gestion des Membres</h3>
        <button 
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-800 transition-colors"
        >
          <UserPlus size={16} /> Ajouter un Membre
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* List of People */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm h-[600px] flex flex-col">
          <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">Répertoire Familial</span>
            <span className="text-[10px] font-mono text-stone-400">{people.length} Membres</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {people.map(person => (
              <div 
                key={person.id}
                className="flex items-center justify-between p-3 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold uppercase">
                    {person.firstName[0]}{person.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{person.firstName} {person.lastName}</p>
                    <p className="text-[10px] text-stone-400 font-mono italic">
                      {person.birthDate ? `Né(e) le ${person.birthDate}` : 'Date inconnue'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => startEdit(person)}
                    className="p-2 text-stone-400 hover:text-amber-600 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => onDeletePerson(person.id)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Editor */}
        <AnimatePresence mode="wait">
          {(editingId || isAdding) ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-stone-900 text-white rounded-xl p-8 shadow-xl border border-stone-800 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-serif text-xl font-light">
                  {isAdding ? 'Nouveau Profil' : 'Éditer Profil'}
                </h4>
                <button onClick={cancel} className="text-stone-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Prénom</label>
                    <input 
                      className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none"
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Nom</label>
                    <input 
                      className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none"
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Date de Naissance</label>
                    <input 
                      type="date"
                      className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none"
                      value={formData.birthDate}
                      onChange={e => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Genre</label>
                    <select 
                      className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none"
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value as any})}
                    >
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Parent (ID)</label>
                  <select 
                    className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none"
                    value={formData.parents?.[0] || ''}
                    onChange={e => setFormData({...formData, parents: e.target.value ? [e.target.value] : []})}
                  >
                    <option value="">Aucun</option>
                    {people.filter(p => p.id !== editingId).map(p => (
                      <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">Informations Supplémentaires</label>
                  <textarea 
                    className="w-full bg-stone-800 border border-stone-700 rounded p-2 text-sm focus:border-amber-500 outline-none h-24"
                    value={formData.extraInfo}
                    onChange={e => setFormData({...formData, extraInfo: e.target.value})}
                    placeholder="Anecdotes, lieux de vie, professions..."
                  />
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full py-4 mt-4 bg-white text-stone-900 font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Enregistrer
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white border border-dashed border-stone-200 rounded-xl flex items-center justify-center p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300">
                  <Plus size={32} />
                </div>
                <p className="text-sm font-serif italic text-stone-400">
                  Sélectionnez un membre pour le modifier<br/>ou créez-en un nouveau.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
