export interface Person {
  id: string;
  uniqueCode: string; // HeritageNexus unique identifier
  firstName: string;
  lastName: string;
  birthDate?: string;
  deathDate?: string;
  gender: 'male' | 'female' | 'other';
  photoUrl?: string;
  parents: string[]; // Maintaining for tree logic
  fatherId?: string;
  motherId?: string;
  spouses: string[]; 
  extraInfo?: string;
  bio?: string;
}

export interface FamilyLink {
  source: string;
  target: string;
  type: 'parent' | 'spouse';
}

export interface VaultItem {
  id: string;
  name: string;
  type: 'document' | 'photo' | 'note';
  encryptedData: string;
  createdAt: string;
  ownerId: string;
}

export interface AIModelStatus {
  loaded: boolean;
  progress: number;
  error?: string;
}
