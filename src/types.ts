export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  deathDate?: string;
  gender: 'male' | 'female' | 'other';
  photoUrl?: string;
  parents: string[]; // Child of these IDs
  spouses: string[]; // Married to these IDs
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
