# Guide Rapide - Créer le Dashboard Analytics

## 🎯 Objectif

Créer une application dashboard séparée qui se connecte à la même base de données Supabase que l'application mobile Don de Sang Togo.

---

## 📋 Prérequis

1. **Compte Supabase** créé
2. **Base de données** configurée (voir `/DATABASE_SCHEMA.md`)
3. **Node.js 18+** installé
4. **Git** installé

---

## 🚀 Étape 1 : Créer le Projet Next.js

```bash
# Créer un nouveau projet Next.js
npx create-next-app@latest blood-donation-dashboard

# Options recommandées :
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ App Router
# ✅ Turbopack
# ❌ src/ directory (optionnel)

cd blood-donation-dashboard
```

---

## 📦 Étape 2 : Installer les Dépendances

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# UI Components (shadcn/ui)
npx shadcn@latest init

# Charts & Visualisation
npm install recharts date-fns

# State Management
npm install @tanstack/react-query zustand

# Utilities
npm install clsx tailwind-merge lucide-react

# Export fonctionnalités
npm install jspdf xlsx

# Maps (optionnel)
npm install leaflet react-leaflet
```

---

## ⚙️ Étape 3 : Configuration Supabase

### 3.1 Créer le fichier `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3.2 Créer le client Supabase

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### 3.3 Générer les Types TypeScript

```bash
# Installer le CLI Supabase
npm install -g supabase

# Se connecter
supabase login

# Générer les types
supabase gen types typescript --project-id "votre-project-id" > types/database.types.ts
```

---

## 🗄️ Étape 4 : Créer la Base de Données Supabase

### 4.1 Aller sur votre projet Supabase

1. Ouvrir le SQL Editor
2. Copier le contenu de `/DATABASE_SCHEMA.md`
3. Exécuter les scripts SQL un par un :
   - Créer les tables
   - Créer les index
   - Créer les fonctions
   - Créer les triggers
   - Activer RLS (Row Level Security)

### 4.2 Créer les Politiques RLS

```sql
-- Exemple : Admins peuvent tout voir
CREATE POLICY "Admins can view all"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Répéter pour chaque table
```

---

## 🎨 Étape 5 : Structure du Projet

Créer cette structure :

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx              # 📊 Dashboard principal
│   ├── donneurs/
│   │   └── page.tsx              # 👥 Gestion donneurs
│   ├── centres/
│   │   └── page.tsx              # 🏥 Gestion centres
│   ├── inventaire/
│   │   └── page.tsx              # 🩸 Stock sanguin
│   ├── alertes/
│   │   ├── page.tsx              # 🚨 Alertes urgentes
│   │   └── nouvelle/
│   │       └── page.tsx          # Créer alerte
│   ├── recompenses/
│   │   └── page.tsx              # 🎁 Récompenses
│   ├── rapports/
│   │   └── page.tsx              # 📈 Rapports
│   └── layout.tsx                # Layout dashboard
├── api/
│   ├── stats/
│   │   └── route.ts
│   └── export/
│       └── route.ts
└── layout.tsx

components/
├── dashboard/
│   ├── Sidebar.tsx               # Menu latéral
│   ├── Header.tsx                # En-tête
│   ├── KPICard.tsx               # Carte KPI
│   ├── RealtimeChart.tsx         # Graphique temps réel
│   └── StatsOverview.tsx         # Vue statistiques
├── tables/
│   ├── DonorsTable.tsx           # Table donneurs
│   └── DataTable.tsx             # Table générique
├── charts/
│   ├── BloodTypeChart.tsx        # Graphique types sanguins
│   └── TrendChart.tsx            # Graphique tendances
└── ui/                           # shadcn components

lib/
├── supabase/
│   ├── client.ts                 # Client Supabase
│   └── queries.ts                # Requêtes DB
├── hooks/
│   ├── useDonors.ts
│   └── useRealtime.ts
└── utils/
    └── export.ts                 # Export CSV/PDF
```

---

## 💻 Étape 6 : Code de Démarrage

### 6.1 Layout Dashboard

```typescript
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 6.2 Page Dashboard Principal

```typescript
// app/(dashboard)/dashboard/page.tsx
import { KPICard } from '@/components/dashboard/KPICard';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { RealtimeChart } from '@/components/dashboard/RealtimeChart';
import { supabase } from '@/lib/supabase/client';
import { Users, Droplet, AlertCircle, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
  // Récupérer les statistiques
  const { data: donors } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'donor')
    .eq('is_active', true);

  const { data: todayDonations } = await supabase
    .from('donations')
    .select('id')
    .eq('status', 'completed')
    .gte('donation_date', new Date().toISOString().split('T')[0]);

  const { data: activeAlerts } = await supabase
    .from('urgent_alerts')
    .select('id')
    .eq('status', 'active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de Bord
        </h1>
        <p className="text-gray-600 mt-1">
          Vue d'ensemble de l'activité Don de Sang Togo
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Donneurs Actifs"
          value={donors?.length || 0}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <KPICard
          title="Dons Aujourd'hui"
          value={todayDonations?.length || 0}
          icon={Droplet}
          trend="+5"
          trendUp={true}
        />
        <KPICard
          title="Alertes Actives"
          value={activeAlerts?.length || 0}
          icon={AlertCircle}
          trend="2 résolues"
          trendUp={false}
        />
        <KPICard
          title="Taux Satisfaction"
          value="94%"
          icon={TrendingUp}
          trend="+2%"
          trendUp={true}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealtimeChart />
        <StatsOverview />
      </div>
    </div>
  );
}
```

### 6.3 Composant KPI Card

```typescript
// components/dashboard/KPICard.tsx
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function KPICard({ title, value, icon: Icon, trend, trendUp }: KPICardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trendUp ? 'text-green-600' : 'text-gray-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-red-600" />
        </div>
      </div>
    </Card>
  );
}
```

### 6.4 Hook Temps Réel

```typescript
// lib/hooks/useRealtime.ts
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

type Donation = Database['public']['Tables']['donations']['Row'];

export function useRealtimeDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Charger données initiales
    const loadDonations = async () => {
      const { data } = await supabase
        .from('donations')
        .select('*')
        .eq('status', 'completed')
        .order('donation_date', { ascending: false })
        .limit(10);

      if (data) setDonations(data);
    };

    loadDonations();

    // S'abonner aux nouveaux dons
    const channel = supabase
      .channel('donations-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations',
        },
        (payload) => {
          setDonations((prev) => [payload.new as Donation, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return donations;
}
```

---

## 📊 Étape 7 : Requêtes Essentielles

Créer un fichier avec toutes les requêtes DB :

```typescript
// lib/supabase/queries.ts
import { supabase } from './client';

// Statistiques générales
export async function getOverviewStats() {
  const [donors, donations, alerts, centers] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'donor'),
    supabase.from('donations').select('id', { count: 'exact' }).eq('status', 'completed'),
    supabase.from('urgent_alerts').select('id', { count: 'exact' }).eq('status', 'active'),
    supabase.from('donation_centers').select('id', { count: 'exact' }).eq('is_active', true),
  ]);

  return {
    totalDonors: donors.count || 0,
    totalDonations: donations.count || 0,
    activeAlerts: alerts.count || 0,
    activeCenters: centers.count || 0,
  };
}

// Dons par type de sang
export async function getDonationsByBloodType() {
  const { data, error } = await supabase
    .from('donations')
    .select('blood_type')
    .eq('status', 'completed');

  if (error) throw error;

  // Regrouper par type
  const grouped = data.reduce((acc, don) => {
    acc[don.blood_type] = (acc[don.blood_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([type, count]) => ({
    type,
    count,
  }));
}

// Dons récents
export async function getRecentDonations(limit = 10) {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donor:users(full_name, blood_type),
      center:donation_centers(name, city)
    `)
    .eq('status', 'completed')
    .order('donation_date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Stock par type
export async function getBloodInventory() {
  const { data, error } = await supabase
    .from('blood_inventory')
    .select(`
      *,
      center:donation_centers(name, city)
    `);

  if (error) throw error;
  return data;
}

// Donneurs par région
export async function getDonorsByRegion() {
  const { data, error } = await supabase
    .from('users')
    .select('region')
    .eq('role', 'donor')
    .eq('is_active', true);

  if (error) throw error;

  const grouped = data.reduce((acc, donor) => {
    acc[donor.region] = (acc[donor.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([region, count]) => ({
    region,
    count,
  }));
}
```

---

## 🎨 Étape 8 : Ajouter des Composants UI

```bash
# Installer les composants shadcn nécessaires
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add toast
```

---

## 🚀 Étape 9 : Lancer le Dashboard

```bash
# Mode développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000
```

---

## 🔐 Étape 10 : Authentification Admin

```typescript
// app/(auth)/login/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Vérifier que c'est un admin
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (user?.role !== 'admin') {
      setError('Accès refusé : vous devez être administrateur');
      await supabase.auth.signOut();
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Dashboard Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don de Sang Togo
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 📱 Étape 11 : Responsive Design

Assurer que tous les composants sont responsive :

```typescript
// Exemple de grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cartes KPI */}
</div>

// Sidebar qui se cache sur mobile
<div className="hidden lg:block">
  <Sidebar />
</div>
```

---

## 🧪 Étape 12 : Tester

```bash
# Créer un compte admin de test
# Via SQL dans Supabase :

INSERT INTO users (
  email,
  password_hash,
  role,
  full_name,
  blood_type,
  date_of_birth,
  city,
  region
) VALUES (
  'admin@test.com',
  crypt('password123', gen_salt('bf')),
  'admin',
  'Administrateur Test',
  'O+',
  '1990-01-01',
  'Lomé',
  'Maritime'
);
```

---

## 📚 Ressources Utiles

- **Supabase Docs** : https://supabase.com/docs
- **Next.js Docs** : https://nextjs.org/docs
- **shadcn/ui** : https://ui.shadcn.com
- **Recharts** : https://recharts.org
- **Tailwind CSS** : https://tailwindcss.com

---

## ✅ Checklist de Vérification

- [ ] Projet Next.js créé
- [ ] Supabase configuré
- [ ] Types générés
- [ ] Base de données créée
- [ ] RLS activé
- [ ] Layout dashboard créé
- [ ] Page principale avec KPIs
- [ ] Authentification admin
- [ ] Temps réel fonctionne
- [ ] Responsive design
- [ ] Tests effectués

---

## 🎯 Prochaines Fonctionnalités à Ajouter

1. **Page Donneurs**
   - Table avec pagination
   - Filtres avancés
   - Export CSV

2. **Page Centres**
   - CRUD complet
   - Carte interactive

3. **Page Inventaire**
   - Vue stock en temps réel
   - Alertes automatiques

4. **Page Alertes**
   - Création alerte
   - Suivi réponses

5. **Page Rapports**
   - Générateur de rapports
   - Export PDF

---

## 💡 Conseils

- **Commencez simple** : D'abord le dashboard principal, puis ajoutez les pages
- **Utilisez les composants shadcn** : Ils sont pré-stylés et accessibles
- **Testez avec des données réelles** : Insérez des données de test dans Supabase
- **Temps réel partout** : Utilisez Supabase Realtime pour une expérience dynamique
- **Mobile-first** : Même si c'est un dashboard, assurez la compatibilité mobile

---

## 🆘 Besoin d'Aide ?

Consultez :
- `/DATABASE_SCHEMA.md` - Structure base de données
- `/ARCHITECTURE_COMPLETE.md` - Architecture globale
- Documentation Supabase et Next.js

---

**Bon développement ! 🚀**
