# Architecture Complète - Application Don de Sang Togo

## 🏗️ Vue d'Ensemble de l'Écosystème

L'application Don de Sang Togo est composée de **3 applications distinctes** qui partagent la même base de données Supabase :

```
┌─────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                     │
│              (PostgreSQL + Realtime + Auth)              │
└─────────────────────────────────────────────────────────┘
              ↑                ↑                ↑
              │                │                │
    ┌─────────┴─────┐  ┌──────┴──────┐  ┌─────┴──────┐
    │  APP MOBILE/  │  │     ADMIN   │  │  DASHBOARD │
    │      WEB      │  │   SCANNER   │  │  ANALYTICS │
    │  (Donneurs)   │  │  (Centres)  │  │ (Gestion)  │
    └───────────────┘  └─────────────┘  └────────────┘
```

---

## 📱 Application 1 : Mobile/Web Donneurs (ACTUELLE)

### Description
Application principale pour les donneurs de sang. Déjà développée et fonctionnelle.

### Technologies
- **Framework** : React + TypeScript
- **Styling** : Tailwind CSS v4.0
- **State Management** : React Hooks (useState, useEffect)
- **Icons** : Lucide React
- **Charts** : Recharts
- **QR Code** : qrcode.react
- **Deployment** : Figma Make / Vercel / Netlify

### Structure des Composants

```
/
├── App.tsx                          # Point d'entrée principal
├── MainApp.tsx                      # Routeur principal
├── AuthApp.tsx                      # Gestion authentification
├── UserApp.tsx                      # Application utilisateur
├── AdminApp.tsx                     # Interface admin intégrée
│
├── components/
│   ├── auth/
│   │   ├── Login.tsx               # Connexion
│   │   └── Register.tsx            # Inscription
│   │
│   ├── Utilisateur (Donneurs)
│   │   ├── Home.tsx                # Page d'accueil
│   │   ├── Profile.tsx             # Profil utilisateur
│   │   ├── Centers.tsx             # Liste centres de don
│   │   ├── Appointments.tsx        # Gestion RDV
│   │   ├── Alerts.tsx              # Alertes urgentes
│   │   ├── History.tsx             # Historique dons
│   │   ├── Rewards.tsx             # Boutique récompenses
│   │   ├── Eligibility.tsx         # Test éligibilité
│   │   ├── Education.tsx           # Guides et infos
│   │   ├── About.tsx               # À propos
│   │   └── Feedback.tsx            # Retours utilisateurs
│   │
│   ├── QR Code
│   │   ├── QRCodeGenerator.tsx    # Génération QR permanent
│   │   ├── QRCodeHelp.tsx         # Guide utilisation
│   │   ├── QRScanner.tsx          # Scan QR (admin)
│   │   └── RewardQRCode.tsx       # QR récompenses
│   │
│   ├── admin/
│   │   ├── Dashboard.tsx           # Dashboard admin
│   │   ├── DonorsManagement.tsx   # Gestion donneurs
│   │   ├── CentersManagement.tsx  # Gestion centres
│   │   ├── HospitalsManagement.tsx # Gestion hôpitaux
│   │   ├── AlertsManagement.tsx   # Gestion alertes
│   │   ├── Reports.tsx            # Rapports
│   │   └── RewardScanner.tsx      # Scan récompenses
│   │
│   └── ui/                         # Composants UI réutilisables
│       └── [50+ composants shadcn]
│
└── styles/
    └── globals.css                 # Styles globaux Tailwind
```

### Fonctionnalités Implémentées

#### ✅ Authentification
- Inscription avec validation
- Connexion email/mot de passe
- Gestion de session
- Déconnexion

#### ✅ Profil Utilisateur
- Informations personnelles
- Groupe sanguin
- Historique de dons
- Points et niveau
- QR Code permanent
- Statistiques personnelles

#### ✅ Système QR Code
- **QR Code permanent** pour chaque donneur
  - Contient : ID, nom, groupe sanguin, téléphone, points
  - Téléchargeable en PNG
  - Valable à vie
  - Utilisable dans tous les centres
- **Scanner QR** (côté admin/centre)
  - Validation instantanée
  - Attribution automatique de points
  - Enregistrement du don
  - Calcul points selon groupe sanguin (O- = 150pts, A+/B+/O+/AB+ = 100pts, etc.)

#### ✅ Centres de Collecte
- Liste interactive avec carte
- Filtrage par ville/région
- Informations détaillées (horaires, contact, capacité)
- Itinéraire Google Maps
- Prise de rendez-vous

#### ✅ Rendez-vous
- Création de RDV
- Liste des RDV à venir
- Historique des RDV passés
- Annulation possible
- Rappels automatiques

#### ✅ Alertes Urgentes
- Notifications géolocalisées
- Filtrage par type de sang
- Réponse rapide "Je suis disponible"
- Badge urgent
- Bonus de points (+50pts)

#### ✅ Gamification Complète
- **Système de points**
  - Don standard : 100-150 points selon groupe
  - Alerte urgente : +50 points bonus
  - Parrainage : +50 points
  - Profil complet : +25 points
- **5 niveaux** : Bronze, Silver, Gold, Platinum, Diamond
- **Badges** : Succès à débloquer
- **Statistiques** : Vies sauvées, séries de dons

#### ✅ Récompenses (NOUVEAU)
- **17+ récompenses** dans 5 catégories
  - ☕ Cafés & Restaurants (50-300 pts)
  - 💪 Sport & Fitness (200-1200 pts)
  - 🛍️ Shopping (250-1100 pts)
  - ⚕️ Santé (300-500 pts)
  - ⛽ Carburant (250-1100 pts)
- **QR Code d'échange**
  - Code unique avec expiration (30 jours)
  - Téléchargeable
  - Scannable par les partenaires
- **Scanner partenaire**
  - Validation des bons
  - Vérification expiration
  - Historique utilisations

#### ✅ Éducation
- Guide du don de sang
- Processus de don
- FAQ complète
- Critères d'éligibilité
- Explication gamification

#### ✅ Historique
- Liste de tous les dons
- Détails par don (date, lieu, points)
- Export possible
- Statistiques cumulées

#### ✅ Interface Admin Intégrée
- Dashboard avec KPIs
- Gestion donneurs
- Gestion centres de collecte
- Gestion alertes urgentes
- Scanner QR pour validation dons
- Scanner QR pour récompenses
- Rapports et statistiques

---

## 🖥️ Application 2 : Dashboard Analytics (À DÉVELOPPER)

### Description
Dashboard web avancé pour l'administration centrale et l'analyse de données. Application séparée qui se connecte à la même base Supabase.

### Technologies Recommandées
- **Framework** : Next.js 14+ (App Router) ou React + Vite
- **Styling** : Tailwind CSS
- **UI Library** : shadcn/ui + Recharts / Chart.js
- **State** : React Query + Zustand
- **Database** : Supabase Client
- **Auth** : Supabase Auth (rôle admin uniquement)
- **Real-time** : Supabase Realtime subscriptions

### Pages et Fonctionnalités Requises

#### 📊 Dashboard Principal
```typescript
// Route : /dashboard
- Vue d'ensemble temps réel
- KPIs principaux (dons, donneurs, stock)
- Graphiques tendances
- Alertes système
- Activité récente
```

**Widgets :**
- Total donneurs actifs (card)
- Dons aujourd'hui / semaine / mois (card + graphe)
- Stock sanguin par type (graphe camembert)
- Alertes actives (liste)
- Centres les plus actifs (tableau)
- Carte interactive des centres et dons

#### 👥 Gestion Donneurs Avancée
```typescript
// Route : /donneurs
- Table paginée et triable
- Filtres avancés (région, groupe sanguin, niveau, dernière activité)
- Recherche globale
- Export CSV/Excel
- Vue détaillée donneur (modal ou page)
- Historique complet
- Envoi notifications ciblées
```

**Colonnes Table :**
- Nom, Email, Téléphone
- Groupe sanguin
- Ville/Région
- Total dons
- Points / Niveau
- Dernier don
- Prochain don éligible
- Statut (actif/inactif)
- Actions (voir, modifier, notifier)

#### 🏥 Gestion Centres & Hôpitaux
```typescript
// Route : /centres
- Liste tous les centres
- Carte interactive
- Ajout/Modification/Suppression
- Configuration horaires
- Capacité journalière
- Statistiques par centre
- Stock actuel par centre
```

#### 🩸 Inventaire & Stock
```typescript
// Route : /inventaire
- Vue globale du stock par type sanguin
- Stock par centre
- Stock par région
- Alertes stock faible
- Historique mouvements
- Prédictions demande (AI)
- Graphiques évolution
```

**Tableau Stock :**
| Groupe | Stock Total | Seuil Min | Seuil Max | Statut | Dernière MàJ |
|--------|-------------|-----------|-----------|--------|--------------|
| O-     | 125         | 100       | 500       | ✅     | Il y a 2h    |
| AB-    | 18          | 50        | 200       | ⚠️     | Il y a 5h    |

#### 🚨 Gestion Alertes Urgentes
```typescript
// Route : /alertes
- Créer nouvelle alerte
- Liste alertes actives/historique
- Carte avec rayon de notification
- Statistiques réponses
- Suivi résolution
- Notifications push
```

**Formulaire Création Alerte :**
- Hôpital demandeur
- Types sanguins nécessaires
- Nombre d'unités
- Niveau urgence
- Localisation + rayon
- Contact
- Expiration

#### 🎁 Gestion Récompenses
```typescript
// Route : /recompenses
- Catalogue récompenses
- Ajout/Modification récompenses
- Gestion partenaires
- Stock disponible
- Historique échanges
- Statistiques popularité
- Génération rapports
```

#### 📅 Rendez-vous
```typescript
// Route : /rendez-vous
- Calendrier global
- Vue par centre
- Liste tous les RDV
- Confirmation manuelle
- Gestion annulations
- Statistiques no-shows
```

#### 📈 Rapports & Analytics
```typescript
// Route : /rapports
- Générateur de rapports personnalisés
- Rapports prédéfinis (hebdo, mensuel, annuel)
- Export PDF/Excel
- Graphiques personnalisables
- Comparaisons périodes
```

**Types de Rapports :**
- Rapport mensuel dons par région
- Performance centres de collecte
- Taux de rétention donneurs
- Efficacité campagnes
- Stock et demandes
- ROI gamification
- Impact récompenses

#### 🔔 Notifications
```typescript
// Route : /notifications
- Envoi notifications groupées
- Templates de messages
- Ciblage (groupe sanguin, région, niveau)
- Historique envois
- Statistiques ouverture/clic
```

#### ⚙️ Configuration
```typescript
// Route : /parametres
- Configuration système
- Gestion utilisateurs admin
- Rôles et permissions
- Paramètres alertes automatiques
- Seuils stocks
- Points par groupe sanguin
- Niveaux gamification
- API keys
```

#### 📊 Analytics Avancés
```typescript
// Route : /analytics
- Analyse géographique
- Analyse démographique
- Prédictions IA
- Tendances saisonnières
- Segmentation donneurs
- Analyse cohortes
```

### Architecture Dashboard

```
dashboard-app/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/           # Page principale
│   │   ├── donneurs/            # Gestion donneurs
│   │   ├── centres/             # Gestion centres
│   │   ├── inventaire/          # Stock sanguin
│   │   ├── alertes/             # Alertes urgentes
│   │   ├── recompenses/         # Récompenses
│   │   ├── rendez-vous/         # Calendrier RDV
│   │   ├── rapports/            # Rapports
│   │   ├── notifications/       # Notifications
│   │   ├── analytics/           # Analytics avancés
│   │   ├── parametres/          # Configuration
│   │   └── layout.tsx           # Layout dashboard
│   ├── api/                     # API Routes Next.js
│   │   ├── stats/
│   │   ├── export/
│   │   └── notifications/
│   └── layout.tsx
│
├── components/
│   ├── dashboard/
│   │   ├── KPICard.tsx
│   │   ├── RealtimeChart.tsx
│   │   ├── MapView.tsx
│   │   └── AlertWidget.tsx
│   ├── tables/
│   │   ├── DonorsTable.tsx
│   │   ├── DataTable.tsx       # Table réutilisable
│   │   └── ExportButton.tsx
│   ├── charts/
│   │   ├── BloodTypeChart.tsx
│   │   ├── TrendChart.tsx
│   │   └── DistributionChart.tsx
│   ├── forms/
│   │   ├── AlertForm.tsx
│   │   ├── CenterForm.tsx
│   │   └── NotificationForm.tsx
│   └── ui/                      # shadcn components
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase client
│   │   ├── server.ts           # Server-side client
│   │   └── queries.ts          # Requêtes DB
│   ├── hooks/
│   │   ├── useDonors.ts
│   │   ├── useAlerts.ts
│   │   └── useRealtime.ts
│   └── utils/
│       ├── export.ts           # Export CSV/PDF
│       ├── notifications.ts     # Gestion notifs
│       └── charts.ts           # Helpers graphiques
│
├── types/
│   ├── database.types.ts       # Types Supabase générés
│   └── index.ts
│
└── public/
    └── images/
```

### Connexion à Supabase

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase/queries.ts
export async function getDonorsStats() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'donor')
    .eq('is_active', true);
    
  if (error) throw error;
  return data;
}

export async function getDonationsToday() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      donor:users(full_name, blood_type),
      center:donation_centers(name, city)
    `)
    .eq('status', 'completed')
    .gte('donation_date', today);
    
  if (error) throw error;
  return data;
}
```

### Subscriptions Temps Réel

```typescript
// hooks/useRealtimeDonations.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useRealtimeDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Charger données initiales
    loadDonations();

    // S'abonner aux changements
    const subscription = supabase
      .channel('donations-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'donations' },
        (payload) => {
          setDonations(prev => [payload.new, ...prev]);
          // Notification toast
          toast.success('Nouveau don enregistré !');
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return donations;
}
```

---

## 📊 Flux de Données Entre Applications

### Scénario 1 : Don de Sang Complet

```
1. Donneur ouvre l'app mobile
   → Voir son QR Code permanent dans Profil
   
2. Donneur se rend au centre
   → Centre scanne le QR avec Admin Scanner
   
3. Scanner valide l'identité
   → INSERT dans table donations (status: 'completed')
   → UPDATE table users (total_donations++, points++)
   → TRIGGER update_donor_points()
   
4. Dashboard reçoit notification temps réel
   → Supabase Realtime envoie event
   → Dashboard met à jour KPIs
   → Graphique se met à jour
   
5. Donneur reçoit notification
   → INSERT dans table notifications
   → Push notification mobile
   → Voir nouveaux points dans app
```

### Scénario 2 : Alerte Urgente

```
1. Admin Dashboard crée alerte
   → INSERT dans urgent_alerts
   → Calcul donneurs dans rayon + groupe sanguin
   
2. Notification push envoyée
   → INSERT dans notifications (tous les donneurs ciblés)
   → Service push Supabase/Firebase
   
3. Donneurs reçoivent alerte
   → App mobile affiche badge
   → Page Alertes mise à jour
   
4. Donneur répond "Disponible"
   → INSERT dans alert_responses
   → UPDATE urgent_alerts (total_responses++)
   
5. Dashboard voit les réponses
   → Table en temps réel
   → Mise à jour compteur
   → Notification admin si objectif atteint
```

### Scénario 3 : Échange de Récompense

```
1. Donneur échange points contre récompense
   → INSERT dans reward_redemptions
   → UPDATE users (total_points -= cost)
   → Génération QR code unique
   
2. Donneur reçoit QR bon
   → Modal affiche QR
   → Téléchargement PNG possible
   
3. Partenaire scanne le bon
   → Scanner Récompense (Admin ou Partner App)
   → Vérification expiration + statut
   
4. Validation utilisation
   → UPDATE reward_redemptions (status='USED')
   → UPDATE rewards (total_redeemed++)
   
5. Dashboard voit statistique
   → Graphique récompenses populaires
   → Rapport ROI gamification
```

---

## 🔐 Sécurité et Permissions

### Rôles Utilisateurs

```sql
-- Définition des rôles
CREATE TYPE user_role AS ENUM (
  'donor',           -- Donneur standard
  'admin',           -- Admin système
  'center_staff',    -- Personnel centre
  'partner',         -- Partenaire récompenses
  'hospital_staff'   -- Personnel hôpital
);
```

### Matrice des Permissions

| Action | Donor | Center Staff | Partner | Hospital | Admin |
|--------|-------|--------------|---------|----------|-------|
| Voir son profil | ✅ | ❌ | ❌ | ❌ | ✅ |
| Prendre RDV | ✅ | ✅ | ❌ | ❌ | ✅ |
| Scanner QR don | ❌ | ✅ | ❌ | ❌ | ✅ |
| Scanner QR récompense | ❌ | ❌ | ✅ | ❌ | ✅ |
| Créer alerte | ❌ | ❌ | ❌ | ✅ | ✅ |
| Voir dashboard | ❌ | ❌ | ❌ | ❌ | ✅ |
| Modifier centres | ❌ | ❌ | ❌ | ❌ | ✅ |
| Voir tous donneurs | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🚀 Déploiement

### App Mobile/Web Donneurs
- **Hébergement** : Vercel / Netlify / Figma Make
- **Domaine** : `app.dondusang.tg`
- **Build** : `npm run build`

### Dashboard Admin
- **Hébergement** : Vercel / Railway / Render
- **Domaine** : `admin.dondusang.tg` ou `dashboard.dondusang.tg`
- **Auth** : Restriction IP possible + 2FA

### Base de Données
- **Supabase Cloud** (recommandé) ou self-hosted
- **Backups** : Automatiques quotidiennes
- **Region** : Europe (RGPD)

---

## 📝 Checklist Implémentation Dashboard

### Phase 1 : Setup (Semaine 1)
- [ ] Créer projet Next.js
- [ ] Installer dépendances (Supabase, Tailwind, shadcn)
- [ ] Configurer Supabase client
- [ ] Générer types TypeScript depuis Supabase
- [ ] Setup authentification admin
- [ ] Créer layout de base

### Phase 2 : Dashboard Principal (Semaine 2)
- [ ] Page dashboard avec KPIs
- [ ] Graphiques principaux (dons, stock)
- [ ] Widgets temps réel
- [ ] Carte interactive
- [ ] Alertes actives

### Phase 3 : Gestion Données (Semaine 3-4)
- [ ] Table donneurs avec filtres
- [ ] CRUD centres de collecte
- [ ] Gestion inventaire
- [ ] Gestion alertes urgentes
- [ ] Gestion récompenses

### Phase 4 : Analytics (Semaine 5)
- [ ] Page rapports
- [ ] Export CSV/PDF
- [ ] Graphiques avancés
- [ ] Prédictions IA (optionnel)

### Phase 5 : Finalisation (Semaine 6)
- [ ] Notifications
- [ ] Configuration système
- [ ] Tests complets
- [ ] Documentation
- [ ] Déploiement production

---

## 📚 Documentation Additionnelle

Voir aussi :
- `/DATABASE_SCHEMA.md` - Structure détaillée base de données
- `/QR_CODE_SYSTEM.md` - Système QR Code
- `/PROJECT_STATUS.md` - État actuel du projet
- `/DEVELOPER_GUIDE.md` - Guide développeur

---

**Version** : 1.0.0  
**Date** : 27 Novembre 2025  
**Contact** : equipe@dondusang.tg
