# 🚀 Guide de Déploiement - Don de Sang Togo

## Vue d'Ensemble

Ce guide explique comment déployer l'application en production avec toutes ses fonctionnalités.

---

## ✅ Pré-requis

### Environnement Technique
- Node.js 18+ et npm/yarn
- Compte Supabase (backend)
- Domaine personnalisé (optionnel)
- Certificat SSL
- Service d'hébergement (Vercel, Netlify, ou autre)

### Comptes Nécessaires
- [ ] Supabase (base de données et auth)
- [ ] Service d'hébergement
- [ ] Service d'envoi d'emails (pour notifications)
- [ ] Service SMS (pour alertes urgentes)
- [ ] Unsplash API (images) - déjà intégré

---

## 📊 Configuration Supabase

### Étape 1 : Créer le Projet

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre `Project URL` et `anon/public key`

### Étape 2 : Créer les Tables

```sql
-- Table: donors (donneurs)
CREATE TABLE donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_type TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  city TEXT,
  region TEXT,
  total_donations INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: donations (dons enregistrés)
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  center_id UUID REFERENCES centers(id),
  blood_type TEXT NOT NULL,
  volume INTEGER NOT NULL, -- en ml
  points_awarded INTEGER NOT NULL,
  donation_date TIMESTAMP DEFAULT NOW(),
  validated_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: centers (centres de collecte)
CREATE TABLE centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  opening_hours JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: appointments (rendez-vous)
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  center_id UUID REFERENCES centers(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'confirmed', -- confirmed, cancelled, completed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: alerts (alertes urgentes)
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blood_type TEXT NOT NULL,
  urgency TEXT NOT NULL, -- critical, urgent, moderate
  region TEXT,
  city TEXT,
  hospital_name TEXT NOT NULL,
  message TEXT NOT NULL,
  distance_km INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Table: achievements (succès)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  achievement_type TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  points_awarded INTEGER DEFAULT 0
);

-- Table: rewards (récompenses)
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  points_cost INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,
  image_url TEXT
);

-- Table: reward_redemptions (échanges de récompenses)
CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  reward_id UUID REFERENCES rewards(id),
  points_spent INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, delivered
  redeemed_at TIMESTAMP DEFAULT NOW()
);

-- Table: qr_scans (historique des scans)
CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  center_id UUID REFERENCES centers(id),
  scanned_by TEXT,
  scan_timestamp TIMESTAMP DEFAULT NOW(),
  donation_id UUID REFERENCES donations(id)
);
```

### Étape 3 : Créer les Index

```sql
-- Index pour améliorer les performances
CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_donors_donor_id ON donors(donor_id);
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_appointments_donor_id ON appointments(donor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_alerts_active ON alerts(is_active);
CREATE INDEX idx_achievements_donor_id ON achievements(donor_id);
```

### Étape 4 : Row Level Security (RLS)

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Politiques pour les donneurs (peuvent voir/modifier leurs propres données)
CREATE POLICY "Donors can view own data" ON donors
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Donors can update own data" ON donors
  FOR UPDATE USING (auth.uid() = id);

-- Politiques pour les dons (lecture seule pour les donneurs)
CREATE POLICY "Donors can view own donations" ON donations
  FOR SELECT USING (donor_id IN (
    SELECT id FROM donors WHERE auth.uid() = id
  ));

-- Politiques pour les centres (lecture publique)
CREATE POLICY "Anyone can view active centers" ON centers
  FOR SELECT USING (is_active = true);

-- Politiques pour les admins (tous les droits)
CREATE POLICY "Admins have full access" ON donations
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

### Étape 5 : Fonctions Edge

```sql
-- Fonction: Valider un don et attribuer des points
CREATE OR REPLACE FUNCTION validate_donation(
  p_donor_id UUID,
  p_center_id UUID,
  p_blood_type TEXT,
  p_volume INTEGER,
  p_validated_by TEXT
)
RETURNS JSON AS $$
DECLARE
  v_points INTEGER;
  v_donation_id UUID;
BEGIN
  -- Calculer les points selon le groupe sanguin
  v_points := CASE p_blood_type
    WHEN 'O-' THEN 150
    WHEN 'AB-' THEN 150
    WHEN 'A-' THEN 125
    WHEN 'B-' THEN 125
    ELSE 100
  END;

  -- Insérer le don
  INSERT INTO donations (
    donor_id, center_id, blood_type, volume, 
    points_awarded, validated_by
  ) VALUES (
    p_donor_id, p_center_id, p_blood_type, p_volume,
    v_points, p_validated_by
  ) RETURNING id INTO v_donation_id;

  -- Mettre à jour les points du donneur
  UPDATE donors
  SET 
    total_donations = total_donations + 1,
    total_points = total_points + v_points,
    updated_at = NOW()
  WHERE id = p_donor_id;

  -- Vérifier et débloquer les succès
  PERFORM check_achievements(p_donor_id);

  -- Retourner le résultat
  RETURN json_build_object(
    'success', true,
    'donation_id', v_donation_id,
    'points_awarded', v_points
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction: Vérifier et débloquer les succès
CREATE OR REPLACE FUNCTION check_achievements(p_donor_id UUID)
RETURNS VOID AS $$
DECLARE
  v_total_donations INTEGER;
  v_blood_type TEXT;
BEGIN
  -- Récupérer les infos du donneur
  SELECT total_donations, blood_type INTO v_total_donations, v_blood_type
  FROM donors WHERE id = p_donor_id;

  -- Succès: Premier Don
  IF v_total_donations = 1 THEN
    INSERT INTO achievements (donor_id, achievement_type, points_awarded)
    VALUES (p_donor_id, 'first_donation', 100)
    ON CONFLICT DO NOTHING;
    
    UPDATE donors SET total_points = total_points + 100 
    WHERE id = p_donor_id;
  END IF;

  -- Succès: Donneur Régulier (3 dons en 6 mois)
  IF (SELECT COUNT(*) FROM donations 
      WHERE donor_id = p_donor_id 
      AND donation_date > NOW() - INTERVAL '6 months') >= 3 
  THEN
    INSERT INTO achievements (donor_id, achievement_type, points_awarded)
    VALUES (p_donor_id, 'regular_donor', 150)
    ON CONFLICT DO NOTHING;
    
    UPDATE donors SET total_points = total_points + 150 
    WHERE id = p_donor_id;
  END IF;

  -- Succès: Groupe Rare
  IF v_blood_type IN ('O-', 'AB-', 'A-', 'B-') THEN
    INSERT INTO achievements (donor_id, achievement_type, points_awarded)
    VALUES (p_donor_id, 'rare_blood', 200)
    ON CONFLICT DO NOTHING;
    
    UPDATE donors SET total_points = total_points + 200 
    WHERE id = p_donor_id;
  END IF;

  -- Succès: Marathon (10 dons)
  IF v_total_donations >= 10 THEN
    INSERT INTO achievements (donor_id, achievement_type, points_awarded)
    VALUES (p_donor_id, 'marathon', 500)
    ON CONFLICT DO NOTHING;
    
    UPDATE donors SET total_points = total_points + 500 
    WHERE id = p_donor_id;
  END IF;

  -- Succès: Sauveur de Vies (20 dons)
  IF v_total_donations >= 20 THEN
    INSERT INTO achievements (donor_id, achievement_type, points_awarded)
    VALUES (p_donor_id, 'lifesaver', 1000)
    ON CONFLICT DO NOTHING;
    
    UPDATE donors SET total_points = total_points + 1000 
    WHERE id = p_donor_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction: Calculer le niveau du donneur
CREATE OR REPLACE FUNCTION calculate_donor_level(p_total_points INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN CASE
    WHEN p_total_points >= 1500 THEN 5
    WHEN p_total_points >= 800 THEN 4
    WHEN p_total_points >= 400 THEN 3
    WHEN p_total_points >= 200 THEN 2
    ELSE 1
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

---

## 🔧 Configuration de l'Application

### Variables d'Environnement

Créez un fichier `.env.local` :

```env
# Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publique

# Unsplash (optionnel, déjà configuré)
VITE_UNSPLASH_ACCESS_KEY=votre-cle-unsplash

# Admin
VITE_ADMIN_EMAIL=admin@donsang-togo.org

# App
VITE_APP_NAME=Don de Sang Togo
VITE_APP_VERSION=1.0.0
```

### Mise à Jour du Code

Dans vos composants, remplacez les données mockées par des appels Supabase :

```typescript
// Exemple dans QRScanner.tsx
import { supabase } from './lib/supabase';

const handleValidateDonation = async () => {
  const { data, error } = await supabase
    .rpc('validate_donation', {
      p_donor_id: scanResult.donorId,
      p_center_id: selectedCenter,
      p_blood_type: scanResult.bloodType,
      p_volume: bloodVolume,
      p_validated_by: currentUser.email
    });

  if (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la validation');
    return;
  }

  alert(`Don validé ! +${data.points_awarded} points`);
};
```

---

## 📦 Build et Déploiement

### Option 1 : Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel

# Configuration dans Vercel Dashboard:
# - Ajouter les variables d'environnement
# - Configurer le domaine personnalisé
# - Activer HTTPS
```

### Option 2 : Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Déployer
netlify deploy --prod

# Configuration dans Netlify Dashboard:
# - Ajouter les variables d'environnement
# - Configurer le domaine
# - Activer HTTPS
```

### Option 3 : Build Manuel

```bash
# Build de production
npm run build

# Les fichiers seront dans /dist
# Uploader sur votre hébergeur
```

---

## 🔐 Sécurité

### Checklist de Sécurité

- [ ] HTTPS activé (SSL/TLS)
- [ ] Variables d'environnement sécurisées
- [ ] RLS activé sur toutes les tables Supabase
- [ ] Rate limiting sur les endpoints
- [ ] Validation des données côté serveur
- [ ] Protection CSRF
- [ ] Headers de sécurité configurés
- [ ] Logs d'audit activés

### Headers de Sécurité

Configurez dans `vercel.json` ou `netlify.toml` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 📱 PWA Configuration

### manifest.json

```json
{
  "name": "Don de Sang Togo",
  "short_name": "Don Sang TG",
  "description": "Application de don de sang au Togo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#dc2626",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 📊 Monitoring & Analytics

### Outils Recommandés

1. **Supabase Dashboard** - Monitoring base de données
2. **Vercel Analytics** - Performance et utilisateurs
3. **Sentry** - Tracking d'erreurs
4. **Google Analytics** - Comportement utilisateurs
5. **Uptime Robot** - Disponibilité de l'app

---

## 🧪 Tests Avant Production

### Checklist de Tests

- [ ] Inscription et connexion
- [ ] Génération de QR Code
- [ ] Scan de QR Code (simulation)
- [ ] Attribution des points
- [ ] Calcul des niveaux
- [ ] Déblocage des succès
- [ ] Échange de récompenses
- [ ] Prise de rendez-vous
- [ ] Alertes urgentes
- [ ] Responsive mobile
- [ ] Performance (< 3s chargement)
- [ ] Sécurité (tests de pénétration)

---

## 🚀 Lancement

### Phase 1 : Beta Test (2 semaines)
- Groupe de 50-100 donneurs testeurs
- 2-3 centres pilotes
- Collecte de feedback
- Corrections de bugs

### Phase 2 : Soft Launch (1 mois)
- Région de Lomé uniquement
- Communication limitée
- Monitoring intensif
- Ajustements

### Phase 3 : Déploiement National
- Toutes les régions
- Communication large
- Formation des centres
- Support actif

---

## 📞 Support Post-Déploiement

### Mise en Place du Support

1. **Email :** support@donsang-togo.org
2. **Téléphone :** Hotline 24/7
3. **FAQ en ligne :** Documentation complète
4. **Formation :** Sessions pour les centres

### Maintenance

- **Quotidienne :** Monitoring et logs
- **Hebdomadaire :** Backup base de données
- **Mensuelle :** Mises à jour de sécurité
- **Trimestrielle :** Nouvelles fonctionnalités

---

## 📈 Métriques de Succès

### KPIs à Suivre

- Nombre d'utilisateurs actifs
- Taux de conversion (inscription → don)
- Nombre de dons validés via QR
- Temps moyen de validation
- Taux de satisfaction
- Taux de rétention
- Nombre d'alertes résolues

---

**Date de déploiement prévu :** À définir  
**Responsable :** Équipe Technique Don de Sang Togo  
**Contact :** tech@donsang-togo.org
