# Guide Développeur - Don de Sang Togo

## 🎯 Vue d'Ensemble

Ce guide est destiné aux développeurs qui travailleront sur l'application. Il couvre l'architecture, les conventions de code, et les bonnes pratiques.

---

## 📁 Structure du Projet

```
don-sang-togo/
├── App.tsx                      # Point d'entrée principal
├── UserApp.tsx                  # Application donneur (shell principal)
├── AdminApp.tsx                 # Dashboard administrateur
├── AuthApp.tsx                  # Authentification
│
├── /components                  # Composants réutilisables
│   ├── /                        # Composants donneurs
│   │   ├── Home.tsx            # Page d'accueil
│   │   ├── Centers.tsx         # Centres de collecte
│   │   ├── Appointments.tsx    # Rendez-vous
│   │   ├── Alerts.tsx          # Alertes urgentes
│   │   ├── History.tsx         # Historique des dons
│   │   ├── Eligibility.tsx     # Test d'éligibilité
│   │   ├── Profile.tsx         # Profil utilisateur
│   │   ├── Education.tsx       # Contenu éducatif
│   │   ├── Rewards.tsx         # Gamification & récompenses
│   │   ├── About.tsx           # À propos de l'app
│   │   ├── Feedback.tsx        # Feedback utilisateur
│   │   ├── QRCodeGenerator.tsx # Génération QR Code
│   │   ├── QRScanner.tsx       # Scanner QR (centres)
│   │   ├── QRCodeHelp.tsx      # Guide d'aide QR
│   │   ├── Toast.tsx           # Notifications
│   │   └── LandingPage.tsx     # Page d'atterrissage
│   │
│   └── /admin                   # Composants admin
│       ├── Dashboard.tsx
│       ├── CentersManagement.tsx
│       ├── HospitalsManagement.tsx
│       ├── DonorsManagement.tsx
│       ├── AlertsManagement.tsx
│       └── Reports.tsx
│
├── /styles
│   └── globals.css              # Styles globaux Tailwind
│
├── /lib (à créer)
│   ├── supabase.ts             # Configuration Supabase
│   ├── utils.ts                # Fonctions utilitaires
│   └── constants.ts            # Constantes globales
│
└── /docs                        # Documentation
    ├── QR_CODE_SYSTEM.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── GUIDE_CENTRES.md
    ├── GUIDE_DONNEURS.md
    ├── DEPLOYMENT.md
    ├── CHANGELOG.md
    └── DEVELOPER_GUIDE.md
```

---

## 🔧 Technologies & Stack

### Frontend
- **React 18+** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool

### Bibliothèques
- **lucide-react** - Icônes
- **qrcode.react** - Génération QR Code
- **recharts** - Graphiques
- **motion/react** - Animations
- **sonner** - Notifications toast

### Backend (à intégrer)
- **Supabase** - BaaS (auth, database, storage)
- **PostgreSQL** - Base de données
- **Row Level Security** - Sécurité

---

## 🎨 Conventions de Code

### Composants React

```typescript
// ✅ BON - Composant fonctionnel avec TypeScript
interface UserProfileProps {
  userId: string;
  onUpdate?: (data: UserData) => void;
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const [loading, setLoading] = useState(false);
  
  // Logique du composant...
  
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}

// ❌ MAUVAIS - Pas de typage
export function UserProfile(props) {
  // ...
}
```

### Naming Conventions

```typescript
// Composants - PascalCase
export function QRCodeGenerator() {}

// Fonctions/Variables - camelCase
const handleValidation = () => {};
const userData = {};

// Constantes - UPPER_SNAKE_CASE
const MAX_DONATION_FREQUENCY = 90;
const POINTS_BY_BLOOD_TYPE = {
  'O-': 150,
  'AB-': 150,
  // ...
};

// Types/Interfaces - PascalCase avec "Props" pour composants
interface ButtonProps {}
type Page = 'home' | 'centers';
```

### Fichiers

```
ComponentName.tsx       # Composants
utils.ts               # Utilitaires
constants.ts           # Constantes
types.ts              # Types partagés
hooks.ts              # Custom hooks
```

---

## 🎯 Patterns & Bonnes Pratiques

### 1. État Local vs Global

```typescript
// ✅ État local pour UI simple
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}

// ✅ Props drilling pour partage entre parent/enfant proche
<Parent>
  <Child onAction={handleAction} />
</Parent>

// 🔜 Context/Redux pour état global (à implémenter)
const { user, updateUser } = useAuth();
```

### 2. Composition de Composants

```typescript
// ✅ BON - Composants modulaires et réutilisables
export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}

// Utilisation
<Card>
  <CardHeader />
  <CardContent />
</Card>
```

### 3. Gestion des Erreurs

```typescript
// ✅ BON - Try/catch avec feedback utilisateur
const handleSubmit = async () => {
  try {
    setLoading(true);
    const result = await submitData();
    toast.success('Succès !');
  } catch (error) {
    console.error('Erreur:', error);
    toast.error('Une erreur est survenue');
  } finally {
    setLoading(false);
  }
};
```

### 4. Accessibilité

```typescript
// ✅ BON - Attributs ARIA et sémantique
<button
  onClick={handleClick}
  aria-label="Fermer le modal"
  disabled={loading}
>
  {loading ? 'Chargement...' : 'Valider'}
</button>

// ✅ BON - Navigation au clavier
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Cliquez ici
</div>
```

---

## 🔌 Intégration Supabase

### Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Authentification

```typescript
// Inscription
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      name: 'John Doe',
      blood_type: 'O+'
    }
  }
});

// Connexion
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Déconnexion
await supabase.auth.signOut();
```

### Queries

```typescript
// SELECT
const { data: donors, error } = await supabase
  .from('donors')
  .select('*')
  .eq('blood_type', 'O+')
  .order('created_at', { ascending: false });

// INSERT
const { data, error } = await supabase
  .from('donations')
  .insert({
    donor_id: donorId,
    center_id: centerId,
    blood_type: bloodType,
    volume: 450,
    points_awarded: 100
  });

// UPDATE
const { data, error } = await supabase
  .from('donors')
  .update({ total_points: newPoints })
  .eq('id', donorId);

// RPC (fonctions)
const { data, error } = await supabase
  .rpc('validate_donation', {
    p_donor_id: donorId,
    p_center_id: centerId,
    p_volume: 450
  });
```

### Real-time

```typescript
// Écouter les changements
const subscription = supabase
  .channel('donations')
  .on('postgres_changes', 
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'donations' 
    },
    (payload) => {
      console.log('Nouveau don:', payload);
      // Mettre à jour l'UI
    }
  )
  .subscribe();

// Nettoyer
return () => {
  subscription.unsubscribe();
};
```

---

## 🧪 Tests (à implémenter)

### Tests Unitaires

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QRCodeGenerator } from './QRCodeGenerator';

describe('QRCodeGenerator', () => {
  it('affiche le QR Code avec les bonnes données', () => {
    const donor = {
      id: 'DNR-001',
      name: 'Test User',
      bloodType: 'O+'
    };
    
    render(<QRCodeGenerator donor={donor} onClose={jest.fn()} />);
    
    expect(screen.getByText('Ma Carte Donneur')).toBeInTheDocument();
    expect(screen.getByText(donor.name)).toBeInTheDocument();
  });
});
```

---

## 🚀 Workflow de Développement

### 1. Branches

```bash
main          # Production
develop       # Développement
feature/*     # Nouvelles fonctionnalités
bugfix/*      # Corrections de bugs
hotfix/*      # Corrections urgentes
```

### 2. Commits

```bash
# Format des commits
type(scope): description

# Types
feat:     # Nouvelle fonctionnalité
fix:      # Correction de bug
docs:     # Documentation
style:    # Formatage (pas de changement de code)
refactor: # Refactoring
test:     # Tests
chore:    # Maintenance

# Exemples
feat(qrcode): add QR code download functionality
fix(rewards): correct points calculation for rare blood types
docs(readme): update installation instructions
```

### 3. Pull Requests

**Template de PR :**

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug
- [ ] Amélioration
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests manuels effectués
- [ ] Testé sur mobile

## Checklist
- [ ] Code respecte les conventions
- [ ] Documentation à jour
- [ ] Pas de warnings console
- [ ] Responsive testé
- [ ] Accessible (ARIA)
```

---

## 🐛 Debugging

### Console Logs

```typescript
// ✅ BON - Console logs structurés
console.group('Validation Don');
console.log('Donneur:', donorData);
console.log('Volume:', volume);
console.log('Points:', calculatedPoints);
console.groupEnd();

// ❌ Production - Retirer tous les console.log
// Utiliser plutôt un logger (ex: winston)
```

### React DevTools

- Installer l'extension React DevTools
- Inspecter les composants et props
- Profiler les performances

### Network Tab

- Vérifier les appels API
- Temps de réponse
- Codes d'erreur

---

## 📊 Performance

### Optimisations React

```typescript
// Mémoïsation des calculs coûteux
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// Mémoïsation des callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Code splitting
const AdminApp = lazy(() => import('./AdminApp'));
```

### Images

```typescript
// Lazy loading
<img loading="lazy" src={imageUrl} alt="..." />

// WebP avec fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

---

## 🔒 Sécurité

### Checklist

- [ ] Validation des inputs côté client ET serveur
- [ ] Sanitization des données utilisateur
- [ ] Pas de données sensibles dans le localStorage
- [ ] HTTPS en production
- [ ] Headers de sécurité configurés
- [ ] Rate limiting sur les endpoints
- [ ] Row Level Security (RLS) activé sur Supabase

### Exemple de validation

```typescript
// ✅ BON - Validation stricte
const validateDonation = (data: DonationData) => {
  if (!data.donorId || typeof data.donorId !== 'string') {
    throw new Error('ID donneur invalide');
  }
  
  if (!['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].includes(data.bloodType)) {
    throw new Error('Groupe sanguin invalide');
  }
  
  if (![350, 450, 500].includes(data.volume)) {
    throw new Error('Volume invalide');
  }
  
  return true;
};
```

---

## 📝 Documentation du Code

```typescript
/**
 * Calcule les points à attribuer selon le groupe sanguin
 * 
 * @param bloodType - Groupe sanguin du donneur (ex: "O+", "AB-")
 * @returns Nombre de points à attribuer
 * 
 * @example
 * ```ts
 * calculatePoints('O-') // retourne 150
 * calculatePoints('A+') // retourne 100
 * ```
 */
export function calculatePoints(bloodType: string): number {
  const rareTypes = ['O-', 'AB-'];
  const uncommonTypes = ['A-', 'B-'];
  
  if (rareTypes.includes(bloodType)) return 150;
  if (uncommonTypes.includes(bloodType)) return 125;
  return 100;
}
```

---

## 🎓 Ressources

### Documentation Officielle
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
- [Vite](https://vitejs.dev/)

### Outils Utiles
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)
- [Excalidraw](https://excalidraw.com/) - Wireframes

---

## 💬 Support

- **Équipe Dev :** dev@donsang-togo.org
- **Slack :** #dev-don-sang-togo
- **Repo :** github.com/don-sang-togo/app

---

**Version :** 1.0  
**Dernière mise à jour :** 27 Novembre 2025  
**Mainteneur :** Équipe Technique Don de Sang Togo
