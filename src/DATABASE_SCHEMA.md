# Structure de Base de Données - Application Don de Sang Togo

## 📊 Vue d'ensemble

Cette application utilise Supabase (PostgreSQL) comme base de données. Ce document décrit la structure complète des tables nécessaires pour faire fonctionner l'application mobile/web ET le dashboard d'administration séparé.

---

## 🗄️ Tables Principales

### 1. **users** (Utilisateurs / Donneurs)

Table principale pour tous les utilisateurs de la plateforme.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'donor', -- 'donor', 'admin', 'center_staff', 'partner'
  
  -- Informations personnelles
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10), -- 'male', 'female', 'other'
  blood_type VARCHAR(5) NOT NULL, -- 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  
  -- Localisation
  city VARCHAR(100),
  region VARCHAR(100),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Gamification
  total_donations INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  level VARCHAR(20) DEFAULT 'Bronze', -- 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'
  badges JSONB DEFAULT '[]', -- Array de badges gagnés
  
  -- QR Code permanent
  qr_code_data TEXT UNIQUE, -- Données encodées du QR code permanent
  
  -- Statut et dates
  is_active BOOLEAN DEFAULT true,
  is_eligible BOOLEAN DEFAULT true,
  last_donation_date TIMESTAMP,
  next_eligible_date TIMESTAMP,
  member_since TIMESTAMP DEFAULT NOW(),
  
  -- Préférences
  notification_preferences JSONB DEFAULT '{"email": true, "sms": true, "push": true}',
  language VARCHAR(5) DEFAULT 'fr',
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_users_blood_type ON users(blood_type);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_region ON users(region);
CREATE INDEX idx_users_is_eligible ON users(is_eligible);
CREATE INDEX idx_users_email ON users(email);
```

---

### 2. **donation_centers** (Centres de Collecte)

```sql
CREATE TABLE donation_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Informations de base
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'fixed', 'mobile', 'hospital'
  description TEXT,
  image_url TEXT,
  
  -- Contact
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  
  -- Localisation
  city VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  
  -- Horaires (JSONB pour flexibilité)
  opening_hours JSONB, -- {"monday": "08:00-17:00", "tuesday": "08:00-17:00", ...}
  
  -- Capacités
  daily_capacity INTEGER DEFAULT 50,
  blood_types_accepted TEXT[] DEFAULT ARRAY['A+','A-','B+','B-','AB+','AB-','O+','O-'],
  
  -- Services disponibles
  has_parking BOOLEAN DEFAULT false,
  has_cafeteria BOOLEAN DEFAULT false,
  has_wifi BOOLEAN DEFAULT false,
  
  -- Stock actuel (mis à jour en temps réel)
  current_stock JSONB DEFAULT '{}', -- {"A+": 45, "O-": 12, ...}
  
  -- Statistiques
  total_donations_received INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Statut
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_centers_city ON donation_centers(city);
CREATE INDEX idx_centers_region ON donation_centers(region);
CREATE INDEX idx_centers_is_active ON donation_centers(is_active);
```

---

### 3. **donations** (Historique des Dons)

```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  center_id UUID NOT NULL REFERENCES donation_centers(id),
  validated_by UUID REFERENCES users(id), -- Staff qui a scanné le QR
  
  -- Détails du don
  donation_date TIMESTAMP NOT NULL,
  blood_type VARCHAR(5) NOT NULL,
  volume_ml INTEGER DEFAULT 450, -- ml de sang donné
  
  -- QR Code scan
  qr_code_scanned TEXT, -- QR code utilisé pour ce don
  scan_timestamp TIMESTAMP,
  
  -- Gamification
  points_earned INTEGER NOT NULL,
  bonus_points INTEGER DEFAULT 0, -- Points bonus (alerte urgente, etc.)
  badges_earned JSONB DEFAULT '[]',
  
  -- Tests et résultats
  hemoglobin_level DECIMAL(4, 2), -- g/dL
  blood_pressure VARCHAR(20), -- "120/80"
  temperature DECIMAL(4, 2), -- Celsius
  weight_kg DECIMAL(5, 2),
  test_results JSONB, -- Résultats détaillés des tests
  
  -- Statut
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'rejected'
  rejection_reason TEXT,
  
  -- Notes
  medical_notes TEXT,
  staff_notes TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_center_id ON donations(center_id);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_blood_type ON donations(blood_type);
```

---

### 4. **appointments** (Rendez-vous)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  center_id UUID NOT NULL REFERENCES donation_centers(id),
  
  -- Date et heure
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  
  -- Détails
  blood_type VARCHAR(5) NOT NULL,
  is_first_time BOOLEAN DEFAULT false,
  
  -- Rappels
  reminder_sent BOOLEAN DEFAULT false,
  reminder_sent_at TIMESTAMP,
  
  -- Statut
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'
  cancellation_reason TEXT,
  cancelled_by VARCHAR(10), -- 'donor', 'center', 'system'
  
  -- Notes
  donor_notes TEXT,
  center_notes TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_appointments_donor_id ON appointments(donor_id);
CREATE INDEX idx_appointments_center_id ON appointments(center_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

---

### 5. **urgent_alerts** (Alertes Urgentes)

```sql
CREATE TABLE urgent_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Créateur
  created_by UUID REFERENCES users(id), -- Admin ou staff hospitalier
  hospital_name VARCHAR(255) NOT NULL,
  
  -- Type d'urgence
  priority VARCHAR(20) NOT NULL, -- 'critical', 'high', 'medium'
  blood_types_needed TEXT[] NOT NULL, -- ['O-', 'AB+']
  units_needed INTEGER NOT NULL,
  
  -- Localisation
  city VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  hospital_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Informations
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  patient_condition TEXT,
  
  -- Contact
  contact_name VARCHAR(255),
  contact_phone VARCHAR(20) NOT NULL,
  
  -- Rayon de notification (km)
  notification_radius_km INTEGER DEFAULT 50,
  
  -- Statut
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'resolved', 'expired', 'cancelled'
  expires_at TIMESTAMP,
  resolved_at TIMESTAMP,
  
  -- Réponses
  total_responses INTEGER DEFAULT 0,
  units_collected INTEGER DEFAULT 0,
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_alerts_status ON urgent_alerts(status);
CREATE INDEX idx_alerts_city ON urgent_alerts(city);
CREATE INDEX idx_alerts_priority ON urgent_alerts(priority);
CREATE INDEX idx_alerts_expires_at ON urgent_alerts(expires_at);
```

---

### 6. **alert_responses** (Réponses aux Alertes)

```sql
CREATE TABLE alert_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  alert_id UUID NOT NULL REFERENCES urgent_alerts(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Réponse
  response_type VARCHAR(20) NOT NULL, -- 'available', 'interested', 'donated'
  will_donate BOOLEAN DEFAULT false,
  
  -- Planning
  available_date DATE,
  available_time TIME,
  
  -- Statut
  donation_completed BOOLEAN DEFAULT false,
  donation_id UUID REFERENCES donations(id),
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(alert_id, donor_id) -- Un donneur ne peut répondre qu'une fois par alerte
);

CREATE INDEX idx_alert_responses_alert_id ON alert_responses(alert_id);
CREATE INDEX idx_alert_responses_donor_id ON alert_responses(donor_id);
```

---

### 7. **rewards** (Catalogue de Récompenses)

```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Informations de base
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'food', 'fitness', 'shopping', 'health', 'fuel', 'premium'
  
  -- Valeur
  points_cost INTEGER NOT NULL,
  monetary_value INTEGER, -- Valeur en CFA
  
  -- Partenaire
  partner_name VARCHAR(255) NOT NULL,
  partner_logo_url TEXT,
  partner_locations TEXT[], -- Villes où disponible
  
  -- Stock
  total_available INTEGER,
  total_redeemed INTEGER DEFAULT 0,
  
  -- Conditions
  terms_and_conditions TEXT,
  validity_days INTEGER DEFAULT 30, -- Jours de validité après échange
  minimum_level VARCHAR(20), -- 'Bronze', 'Silver', etc.
  
  -- Visibilité
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Image
  image_url TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rewards_category ON rewards(category);
CREATE INDEX idx_rewards_is_active ON rewards(is_active);
CREATE INDEX idx_rewards_points_cost ON rewards(points_cost);
```

---

### 8. **reward_redemptions** (Échanges de Récompenses)

```sql
CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id),
  
  -- Détails de l'échange
  points_spent INTEGER NOT NULL,
  reward_code VARCHAR(100) UNIQUE NOT NULL, -- Code QR unique
  qr_code_data TEXT NOT NULL, -- Données encodées
  
  -- Validité
  issued_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  
  -- Utilisation
  status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'USED', 'EXPIRED', 'CANCELLED'
  used_at TIMESTAMP,
  used_at_location VARCHAR(255),
  validated_by UUID REFERENCES users(id), -- Partner staff qui a validé
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_redemptions_donor_id ON reward_redemptions(donor_id);
CREATE INDEX idx_redemptions_reward_id ON reward_redemptions(reward_id);
CREATE INDEX idx_redemptions_status ON reward_redemptions(status);
CREATE INDEX idx_redemptions_reward_code ON reward_redemptions(reward_code);
```

---

### 9. **notifications** (Notifications)

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Destinataire
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Type et contenu
  type VARCHAR(50) NOT NULL, -- 'alert', 'reminder', 'achievement', 'reward', 'system'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Action
  action_url TEXT,
  action_type VARCHAR(50), -- 'open_alert', 'view_appointment', etc.
  
  -- Données associées
  related_id UUID, -- ID de l'alerte, rendez-vous, etc.
  
  -- Statut
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  
  -- Envoi
  sent_via TEXT[] DEFAULT ARRAY['push'], -- 'push', 'email', 'sms'
  sent_at TIMESTAMP DEFAULT NOW(),
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
```

---

### 10. **achievements** (Succès / Badges)

```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Informations
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  category VARCHAR(50), -- 'milestone', 'streak', 'special', 'hero'
  
  -- Conditions
  required_donations INTEGER,
  required_points INTEGER,
  special_condition TEXT, -- Condition spéciale en JSON
  
  -- Récompense
  points_reward INTEGER DEFAULT 0,
  
  -- Ordre d'affichage
  display_order INTEGER DEFAULT 0,
  rarity VARCHAR(20), -- 'common', 'rare', 'epic', 'legendary'
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 11. **user_achievements** (Succès des Utilisateurs)

```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relations
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  
  -- Dates
  earned_at TIMESTAMP DEFAULT NOW(),
  
  -- Métadonnées
  progress JSONB, -- Progression vers le succès
  
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
```

---

### 12. **feedback** (Retours Utilisateurs)

```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Auteur
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Type et contenu
  type VARCHAR(50) NOT NULL, -- 'bug', 'feature', 'improvement', 'complaint', 'praise'
  category VARCHAR(50), -- 'ui', 'performance', 'center', 'reward', 'other'
  title VARCHAR(255),
  message TEXT NOT NULL,
  
  -- Evaluation
  rating INTEGER, -- 1-5 étoiles
  
  -- Pièces jointes
  attachments JSONB DEFAULT '[]',
  
  -- Suivi
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'reviewing', 'resolved', 'closed'
  admin_response TEXT,
  responded_at TIMESTAMP,
  responded_by UUID REFERENCES users(id),
  
  -- Métadonnées
  user_agent TEXT,
  device_info JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_type ON feedback(type);
```

---

### 13. **blood_inventory** (Inventaire Sang)

```sql
CREATE TABLE blood_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Localisation
  center_id UUID REFERENCES donation_centers(id),
  hospital_id UUID, -- Si géré par un hôpital
  
  -- Type de sang
  blood_type VARCHAR(5) NOT NULL,
  
  -- Quantités (en unités de 450ml)
  current_stock INTEGER DEFAULT 0,
  minimum_threshold INTEGER DEFAULT 10,
  maximum_capacity INTEGER DEFAULT 100,
  
  -- Statut
  last_updated TIMESTAMP DEFAULT NOW(),
  last_donation_received TIMESTAMP,
  
  -- Alertes automatiques
  low_stock_alert_sent BOOLEAN DEFAULT false,
  critical_stock_alert_sent BOOLEAN DEFAULT false,
  
  UNIQUE(center_id, blood_type)
);

CREATE INDEX idx_inventory_center_id ON blood_inventory(center_id);
CREATE INDEX idx_inventory_blood_type ON blood_inventory(blood_type);
```

---

### 14. **analytics_events** (Événements Analytiques)

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Utilisateur
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  
  -- Événement
  event_type VARCHAR(100) NOT NULL, -- 'page_view', 'button_click', 'donation_completed', etc.
  event_category VARCHAR(50),
  event_label VARCHAR(255),
  
  -- Données
  event_data JSONB DEFAULT '{}',
  
  -- Contexte
  page_url TEXT,
  referrer TEXT,
  device_type VARCHAR(50), -- 'mobile', 'tablet', 'desktop'
  os VARCHAR(50),
  browser VARCHAR(50),
  
  -- Localisation
  country VARCHAR(100),
  city VARCHAR(100),
  
  -- Métadonnées
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);
```

---

## 🔐 Row Level Security (RLS)

Pour Supabase, activer RLS sur toutes les tables :

```sql
-- Exemple pour users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Les admins peuvent tout voir
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 📊 Vues Matérialisées (pour le Dashboard)

### Vue : Statistiques Quotidiennes

```sql
CREATE MATERIALIZED VIEW daily_statistics AS
SELECT 
  DATE(donation_date) as date,
  COUNT(*) as total_donations,
  COUNT(DISTINCT donor_id) as unique_donors,
  SUM(volume_ml) as total_volume_ml,
  AVG(points_earned) as avg_points,
  blood_type,
  center_id
FROM donations
WHERE status = 'completed'
GROUP BY DATE(donation_date), blood_type, center_id;

-- Rafraîchir toutes les heures
CREATE INDEX idx_daily_stats_date ON daily_statistics(date);
```

### Vue : Stock Actuel par Région

```sql
CREATE MATERIALIZED VIEW regional_blood_stock AS
SELECT 
  dc.region,
  dc.city,
  bi.blood_type,
  SUM(bi.current_stock) as total_stock,
  AVG(bi.current_stock) as avg_stock,
  COUNT(DISTINCT dc.id) as total_centers
FROM blood_inventory bi
JOIN donation_centers dc ON bi.center_id = dc.id
WHERE dc.is_active = true
GROUP BY dc.region, dc.city, bi.blood_type;
```

---

## 🔄 Triggers et Fonctions

### Trigger : Mettre à jour les points après un don

```sql
CREATE OR REPLACE FUNCTION update_donor_points()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE users
    SET 
      total_points = total_points + NEW.points_earned,
      total_donations = total_donations + 1,
      last_donation_date = NEW.donation_date,
      next_eligible_date = NEW.donation_date + INTERVAL '3 months'
    WHERE id = NEW.donor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donation_completed_trigger
AFTER UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_donor_points();
```

### Fonction : Calculer le niveau d'un donneur

```sql
CREATE OR REPLACE FUNCTION calculate_donor_level(points INTEGER)
RETURNS VARCHAR(20) AS $$
BEGIN
  CASE
    WHEN points >= 2000 THEN RETURN 'Diamond';
    WHEN points >= 1500 THEN RETURN 'Platinum';
    WHEN points >= 1000 THEN RETURN 'Gold';
    WHEN points >= 500 THEN RETURN 'Silver';
    ELSE RETURN 'Bronze';
  END CASE;
END;
$$ LANGUAGE plpgsql;
```

---

## 📈 Requêtes Utiles pour le Dashboard

### KPI Principaux

```sql
-- Nombre total de donneurs actifs
SELECT COUNT(*) FROM users WHERE is_active = true AND role = 'donor';

-- Dons du mois en cours
SELECT 
  COUNT(*) as total_donations,
  SUM(volume_ml) as total_volume
FROM donations
WHERE 
  status = 'completed' 
  AND donation_date >= DATE_TRUNC('month', CURRENT_DATE);

-- Stock critique (en dessous du seuil minimum)
SELECT 
  dc.name,
  dc.city,
  bi.blood_type,
  bi.current_stock,
  bi.minimum_threshold
FROM blood_inventory bi
JOIN donation_centers dc ON bi.center_id = dc.id
WHERE bi.current_stock < bi.minimum_threshold;

-- Top 10 donneurs
SELECT 
  u.full_name,
  u.blood_type,
  u.total_donations,
  u.total_points,
  u.level
FROM users u
WHERE u.role = 'donor'
ORDER BY u.total_points DESC
LIMIT 10;
```

---

## 🌐 API Endpoints Suggérés (pour le Dashboard)

Le dashboard séparé devra se connecter à ces endpoints :

### Endpoints Statistiques

- `GET /api/dashboard/stats/overview` - KPIs principaux
- `GET /api/dashboard/stats/donations?period=daily|weekly|monthly` - Graphe des dons
- `GET /api/dashboard/stats/blood-types` - Répartition par groupe sanguin
- `GET /api/dashboard/stats/regions` - Statistiques par région
- `GET /api/dashboard/stats/centers` - Performance des centres

### Endpoints Données

- `GET /api/donors?page=1&limit=50` - Liste paginée des donneurs
- `GET /api/donations?filters={...}` - Historique des dons
- `GET /api/alerts?status=active` - Alertes actives
- `GET /api/inventory?low_stock=true` - Inventaire du sang
- `GET /api/rewards/redemptions` - Récompenses échangées

### Endpoints Actions

- `POST /api/alerts/create` - Créer une alerte urgente
- `PUT /api/centers/{id}` - Modifier un centre
- `POST /api/notifications/send` - Envoyer notification groupée
- `PUT /api/inventory/update` - Mettre à jour stock

---

## 🔒 Authentification

Le dashboard utilisera :
- **Supabase Auth** avec rôle 'admin'
- **JWT tokens** pour les requêtes API
- **Row Level Security** pour sécuriser les données

---

## 📱 Synchronisation Temps Réel

Utiliser **Supabase Realtime** pour :
- Nouvelles alertes urgentes
- Mise à jour du stock
- Nouveaux dons enregistrés
- Notifications en direct

```javascript
// Exemple de subscription
const subscription = supabase
  .channel('donations-channel')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'donations' },
    (payload) => {
      console.log('Nouveau don!', payload);
      // Mettre à jour le dashboard
    }
  )
  .subscribe();
```

---

## 📊 Métriques Importantes pour le Dashboard

### Métriques Opérationnelles
- Nombre de dons aujourd'hui / cette semaine / ce mois
- Taux de remplissage des rendez-vous
- Taux de non-présentation (no-shows)
- Temps moyen entre rendez-vous et don

### Métriques d'Inventaire
- Stock actuel par groupe sanguin
- Centres en alerte stock faible
- Taux de rotation du stock
- Demande vs stock disponible

### Métriques Utilisateurs
- Nouveaux inscrits (jour/semaine/mois)
- Taux de rétention des donneurs
- Distribution géographique
- Engagement (dernière connexion)

### Métriques Gamification
- Points distribués
- Récompenses échangées
- Taux de conversion points → récompenses
- Badges les plus gagnés

---

## 💡 Notes Importantes

1. **Performance** : Utiliser les vues matérialisées pour les requêtes lourdes
2. **Cache** : Implémenter Redis pour les données fréquemment consultées
3. **Backup** : Sauvegardes automatiques quotidiennes
4. **Monitoring** : Logs pour toutes les actions sensibles
5. **RGPD** : Anonymisation possible des données après X mois

---

## 🚀 Prochaines Étapes

1. Créer le projet Supabase
2. Exécuter les scripts SQL de création des tables
3. Configurer RLS et permissions
4. Créer les fonctions et triggers
5. Tester avec données de démonstration
6. Développer le dashboard séparé
7. Configurer les endpoints API
8. Mettre en place le monitoring

---

**Version** : 1.0.0  
**Dernière mise à jour** : 27 Novembre 2025
