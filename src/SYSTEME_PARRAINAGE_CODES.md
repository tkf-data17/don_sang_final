# Système de Parrainage & Codes Bonus - Génération Personnalisée

**Date** : 27 Novembre 2025  
**Version** : 3.3.0

---

## 🎯 Vue d'Ensemble

Système complet de **parrainage et codes bonus** permettant à chaque utilisateur de :
- ✅ **Générer son code personnel** unique
- ✅ **Créer des codes bonus** pour événements
- ✅ **Partager et gagner des points**
- ✅ **Utiliser des codes** pour obtenir points
- ✅ **Suivre ses parrainages** en temps réel
- ✅ **Voir statistiques** et classement

---

## 📱 Interface & Navigation

### Accès au Système

```
App → UserApp → Rewards (onglet "Points")
  ↓
[Récompenses] [Parrainage] ← Onglets
       ↓
  ReferralSystem Component
```

### Onglets Principaux

```
┌─────────────────────────────────────┐
│ [🎁 Récompenses] [👥 Parrainage]   │
└─────────────────────────────────────┘
       Ancien              NOUVEAU
```

---

## 🎨 Section Parrainage - 4 Onglets

### 1️⃣ **GÉNÉRER** (Sparkles Icon)
### 2️⃣ **UTILISER** (Gift Icon)
### 3️⃣ **HISTORIQUE** (Users Icon)
### 4️⃣ **STATS** (TrendingUp Icon)

---

## 🌟 ONGLET 1 : GÉNÉRER

### Header Statistiques

```
┌───────────────────────────────────────────┐
│ 🎁 Système de Parrainage                  │
│ Gagne des points en invitant tes amis !   │
├───────────────────────────────────────────┤
│                                           │
│ [👥 Parrainages]  [✓ Validés]            │
│      3                 2                  │
│                                           │
│ [⭐ Points gagnés] [🏆 Rang]              │
│      150                #12               │
└───────────────────────────────────────────┘
```

**Données temps réel** :
- Nombre total de parrainages
- Nombre de parrainages validés
- Points gagnés via parrainage
- Rang dans le classement

---

### A. Mon Code de Parrainage Personnel

```
┌─────────────────────────────────────────┐
│ ⭐ Mon Code de Parrainage               │
├─────────────────────────────────────────┤
│                                         │
│         ┌─────────────────┐             │
│         │                 │             │
│         │   KOFFI2025     │             │
│         │                 │             │
│         │ Partage ce code │             │
│         └─────────────────┘             │
│                                         │
│ [📋 Copier] [📤 Partager]              │
│ [📱 QR Code] [✨ Nouveau code]         │
│                                         │
├─────────────────────────────────────────┤
│ 💰 Récompenses du parrainage :          │
│ • +50 points pour toi (inscription)     │
│ • +50 points pour ton filleul           │
│ • +100 points quand il fait 1er don     │
│ • +20 points à chaque don (à vie !)     │
└─────────────────────────────────────────┘
```

#### Fonctionnalités

##### **📋 Copier**
```typescript
Action : Copie le code dans le presse-papier
Feedback : Icône Check + "Copié !" pendant 2s
Code copié : "KOFFI2025"
```

##### **📤 Partager**
```typescript
Si navigator.share disponible :
  → Ouvre menu partage natif
  → Titre : "Don de Sang Togo - Code Parrainage"
  → Texte : "🩸 Rejoins-moi sur Don de Sang Togo
             et gagne 50 points avec mon code :
             KOFFI2025
             
             Ensemble, sauvons des vies ! 🇹🇬"
  → URL : https://donsangtogo.tg

Sinon :
  → Copie le texte dans presse-papier
  → Alert : "Message copié ! Partage-le sur WhatsApp..."
```

##### **📱 QR Code**
```typescript
Affiche/Masque section QR :

┌─────────────────────────┐
│   ┌───────────────┐     │
│   │               │     │
│   │  [QR CODE]    │     │
│   │               │     │
│   │  KOFFI2025    │     │
│   └───────────────┘     │
│                         │
│ [📥 Télécharger QR]     │
└─────────────────────────┘

Taille : 192x192px
Contenu : Code parrainage
Téléchargement : PNG
```

##### **✨ Nouveau code**
```typescript
Action :
1. Génère code aléatoire 8 caractères
   Format : [A-Z0-9]
   Exemple : "AB12CD34"

2. Remplace ancien code

3. Met à jour dans customCodes[]

4. Alert : "Nouveau code généré : AB12CD34"

Algorithme :
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let code = '';
for (let i = 0; i < 8; i++) {
  code += chars[Math.random() * chars.length];
}
```

---

### B. Mes Codes Bonus Créés

```
┌─────────────────────────────────────────┐
│ 🎁 Mes Codes Bonus          [+ Créer]   │
├─────────────────────────────────────────┤
│                                         │
│ Si vide :                               │
│   🎁 Aucun code bonus créé              │
│   Crée des codes personnalisés pour     │
│   des événements !                      │
│                                         │
│ Si codes créés :                        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ EVENT2025 [Actif]          [📋]     │ │
│ │ Bonus événement campus              │ │
│ │ ⭐ 100 pts  👥 3/10  ⏰ Expire 30/12│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ NOEL50 [Actif]             [📋]     │ │
│ │ Bonus spécial Noël                  │ │
│ │ ⭐ 50 pts  👥 0/5  ⏰ Expire 25/12  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Modal Créer Code Bonus

```
┌───────────────────────────────────────┐
│ Créer un Code Bonus             [×]   │
├───────────────────────────────────────┤
│                                       │
│ Nombre de points *                    │
│ [    50    ] (10-500)                 │
│                                       │
│ Utilisations max *                    │
│ [     1    ] (1-100)                  │
│                                       │
│ Description *                         │
│ [Ex: Bonus événement campus...]       │
│                                       │
│ Expire dans (jours) - Optionnel       │
│ [Ex: 7]                               │
│                                       │
│ [    Créer le Code    ]               │
└───────────────────────────────────────┘
```

**Validation** :
```typescript
Points : 10 ≤ points ≤ 500
Utilisations : 1 ≤ max ≤ 100
Description : Requis, min 5 caractères
Expiration : Optionnel, 1-365 jours

Génération :
- Code aléatoire 8 caractères
- Type : 'bonus'
- CreatedAt : Date actuelle
- ExpiresAt : CreatedAt + jours (si spécifié)
- UsedBy : [] (vide)
- Active : true
```

---

### C. Codes Événements Disponibles

```
┌─────────────────────────────────────────┐
│ ✨ Codes Événements Disponibles         │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ WELCOME2025          [+100 pts]     │ │
│ │ Code de bienvenue nouvel inscrit    │ │
│ │ ⏰ Expire le 31/12/2025             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────���───────────────────────────────┐ │
│ │ NOEL50              [+50 pts]       │ │
│ │ Bonus spécial Noël                  │ │
│ │ ⏰ Expire le 25/12/2025             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ DONNEUR100          [+100 pts]      │ │
│ │ Bonus 100ème donneur du mois        │ │
│ │ ⏰ Expire le 30/11/2025             │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Codes pré-définis** (configurés par admin) :
- Codes promotionnels
- Codes événements spéciaux
- Codes saisonniers
- Codes d'urgence

---

## 🎁 ONGLET 2 : UTILISER

```
┌─────────────────────────────────────────┐
│ 🎁 Utiliser un Code                     │
├─────────────────────────────────────────┤
│                                         │
│ Entre un code de parrainage ou bonus    │
│                                         │
│ [  KOFFI2025  ]        [Valider]        │
│                                         │
├─────────────────────────────────────────┤
│ Si validé :                             │
│ ┌─────────────────────────────────────┐ │
│ │ ✅ Code validé avec succès !        │ │
│ │ Les points ont été ajoutés          │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 💡 Types de codes :                     │
│ • Codes de parrainage : Partagés par    │
│   d'autres donneurs                     │
│ • Codes événements : Campagnes spéciales│
│ • Codes bonus : Actions spécifiques     │
└─────────────────────────────────────────┘
```

### Logique de Validation

```typescript
function validateCode(inputCode) {
  // 1. Vérifier si code existe
  const allCodes = [...customCodes, ...bonusCodes];
  const foundCode = allCodes.find(c => c.code === inputCode);
  
  if (!foundCode) {
    return "❌ Code invalide ou inexistant";
  }
  
  // 2. Vérifier si actif
  if (!foundCode.active) {
    return "❌ Ce code est expiré ou désactivé";
  }
  
  // 3. Vérifier limite utilisations
  if (foundCode.usedBy.length >= foundCode.maxUses) {
    return "❌ Ce code a atteint sa limite d'utilisation";
  }
  
  // 4. Vérifier expiration (si applicable)
  if (foundCode.expiresAt) {
    const now = new Date();
    const expiry = new Date(foundCode.expiresAt);
    if (now > expiry) {
      return "❌ Ce code a expiré";
    }
  }
  
  // 5. Valider et attribuer points
  return {
    success: true,
    points: foundCode.points,
    description: foundCode.description
  };
}
```

---

## 👥 ONGLET 3 : HISTORIQUE

```
┌─────────────────────────────────────────┐
│ Mes Parrainages                         │
│ 3 personnes parrainées                  │
├─────────────────────────────────────────┤
│                                         │
│ ┌───���─────────────────────────────────┐ │
│ │ Marie AGBO              [Récompensé]│ │
│ │ Code utilisé : KOFFI2025            │ │
│ │ 25/11/2025              +100 pts ⭐ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Jean DOE                [Validé]    │ │
│ │ Code utilisé : KOFFI2025            │ │
│ │ 23/11/2025              +50 pts ⭐  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Paul KPOTI              [En attente]│ │
│ │ Code utilisé : KOFFI2025            │ │
│ │ 20/11/2025                          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Statuts Parrainages

#### **🟡 Pending (En attente)**
```
État : Filleul inscrit mais pas encore validé
Points gagnés : 0
Couleur badge : Jaune
Prochaine étape : Validation compte filleul
```

#### **🔵 Completed (Validé)**
```
État : Compte filleul validé
Points gagnés : 50 (inscription)
Couleur badge : Bleu
Prochaine étape : 1er don du filleul
```

#### **🟢 Rewarded (Récompensé)**
```
État : Filleul a fait son 1er don
Points gagnés : 150 (50 + 100 bonus)
Couleur badge : Vert
Bonus futur : +20 pts par don à vie
```

---

## 📊 ONGLET 4 : STATS

### A. Performance

```
┌─────────────────────────────────────┐
│ 📊 Performance                      │
├─────────────────────────────────────┤
│ Total parrainages          3        │
│ Taux de validation         66%      │
│ Points totaux              150      │
│ Moyenne par filleul        75 pts   │
└─────────────────────────────────────┘
```

**Calculs** :
```typescript
Taux validation = (completedReferrals / totalReferrals) × 100
Moyenne = totalPointsEarned / completedReferrals
```

### B. Classement

```
┌─────────────────────────────────────┐
│ 🏆 Classement                       │
├─────────────────────────────────────┤
│        ┌────────┐                   │
│        │  #12   │                   │
│        └────────┘                   │
│   Sur 1,247 parrains actifs         │
│                                     │
│   Prochain palier : Top 10          │
│   [██████████░░░░] 75%              │
│   Plus que 2 parrainages validés    │
└─────────────────────────────────────┘
```

### C. Récompenses à Venir

```
┌─────────────────────────────────────┐
│ 🎁 Récompenses à venir              │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [5] 5 parrainages    Manque 2   │ │
│ │     Badge "Ambassadeur Bronze"  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [10] 10 parrainages  Manque 7   │ │
│ │      +200 points bonus          │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### D. Meilleurs Filleuls

```
┌─────────────────────────────────────┐
│ ⭐ Meilleurs filleuls               │
├─────────────────────────────────────┤
│ [MA] Marie AGBO        +100 pts     │
│ [JD] Jean DOE          +50 pts      │
└─────────────────────────────────────┘
```

---

## 🎯 Système de Récompenses Multi-Niveaux

### Récompenses Parrainage

#### **Niveau 1 : Inscription** 🎉
```
Événement : Filleul s'inscrit avec ton code
Récompense Parrain : +50 points
Récompense Filleul : +50 points
Condition : Code valide saisi à l'inscription
```

#### **Niveau 2 : 1er Don** 💉
```
Événement : Filleul fait son 1er don de sang
Récompense Parrain : +100 points BONUS
Récompense Filleul : Points normaux du don
Condition : Don validé par centre
```

#### **Niveau 3 : Dons Récurrents** 🔄
```
Événement : Chaque don suivant du filleul
Récompense Parrain : +20 points par don
Récompense Filleul : Points normaux du don
Condition : À vie (permanent)
Limite : Aucune !
```

### Exemple Calcul Total

```
Parrain KOFFI avec 3 filleuls :

Filleul 1 - Marie (5 dons) :
- Inscription : +50 pts
- 1er don : +100 pts
- 4 dons suivants : +20 × 4 = +80 pts
Sous-total : 230 pts

Filleul 2 - Jean (1 don) :
- Inscription : +50 pts
- 1er don : +100 pts
Sous-total : 150 pts

Filleul 3 - Paul (0 don) :
- Inscription : +0 pts (en attente validation)
Sous-total : 0 pts

TOTAL GAGNÉ : 380 points
```

---

## 🏆 Paliers Ambassadeurs

### Badge Bronze - 5 Parrainages
```
Récompense :
- Badge "Ambassadeur Bronze"
- +100 points bonus
- Accès codes promo exclusifs
- Certificat numérique
```

### Badge Argent - 10 Parrainages
```
Récompense :
- Badge "Ambassadeur Argent"
- +200 points bonus
- Multiplicateur ×1.5 sur parrainages
- Invitation événements VIP
```

### Badge Or - 25 Parrainages
```
Récompense :
- Badge "Ambassadeur Or"
- +500 points bonus
- Multiplicateur ×2 sur parrainages
- R��compense physique (T-shirt)
```

### Badge Platine - 50 Parrainages
```
Récompense :
- Badge "Ambassadeur Platine"
- +1000 points bonus
- Multiplicateur ×3 sur parrainages
- Rencontre équipe CNTS
- Article dans newsletter
```

---

## 📋 Types de Codes

### 1. Code Personnel (Personal)
```typescript
{
  code: 'KOFFI2025',
  type: 'personal',
  points: 50,
  createdAt: '2025-11-20',
  usedBy: ['Marie', 'Jean'],
  maxUses: 999,  // Illimité
  description: 'Mon code de parrainage personnel',
  active: true
}
```

**Caractéristiques** :
- 1 seul par utilisateur
- Personnalisable
- Illimité en utilisations
- Permanent (pas d'expiration)
- Regénérable à volonté

### 2. Code Événement (Event)
```typescript
{
  code: 'WELCOME2025',
  type: 'event',
  points: 100,
  createdAt: '2025-11-01',
  expiresAt: '2025-12-31',
  usedBy: [],
  maxUses: 1,  // 1 fois par utilisateur
  description: 'Code de bienvenue nouvel inscrit',
  active: true
}
```

**Caractéristiques** :
- Créé par admin
- Date d'expiration
- Usage unique par personne
- Promotionnel

### 3. Code Bonus (Bonus)
```typescript
{
  code: 'EVENT2025',
  type: 'bonus',
  points: 75,
  createdAt: '2025-11-15',
  expiresAt: '2025-12-15',
  usedBy: ['User1', 'User2'],
  maxUses: 10,
  description: 'Bonus événement campus',
  active: true
}
```

**Caractéristiques** :
- Créé par utilisateur OU admin
- Utilisations limitées
- Date d'expiration optionnelle
- Pour événements spécifiques

### 4. Code Admin (Admin)
```typescript
{
  code: 'ADMIN500',
  type: 'admin',
  points: 500,
  createdAt: '2025-11-01',
  expiresAt: undefined,
  usedBy: [],
  maxUses: 100,
  description: 'Compensation incident technique',
  active: true
}
```

**Caractéristiques** :
- Créé uniquement par admin
- Points élevés
- Pour situations exceptionnelles
- Traçabilité complète

---

## 🔐 Sécurité & Validation

### Prévention Abus

#### **Anti-Duplication**
```typescript
Vérifications :
1. Code déjà utilisé par cet utilisateur ?
   → Refuse si oui

2. Code auto-parrainage ?
   → Refuse si code personnel de l'utilisateur

3. Même IP multiple inscriptions ?
   → Flag pour review manuelle

4. Pattern suspect ?
   → Limite 5 codes par jour par utilisateur
```

#### **Validation Email**
```typescript
Pour parrainage validé :
1. Email filleul doit être vérifié
2. Compte filleul actif > 24h
3. Pas de bounce sur email

Sinon : Statut reste "pending"
```

#### **Validation Don**
```typescript
Pour bonus 1er don :
1. Don scanné par centre officiel
2. QR code valide
3. Don effectif (pas annulé)
4. Délai min 7 jours après inscription

Vérifications anti-fraude
```

---

## 💾 Structure Données Supabase

### Table: referral_codes
```sql
CREATE TABLE referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(12) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL, -- personal, event, bonus, admin
  points INTEGER NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  description TEXT,
  active BOOLEAN DEFAULT true,
  
  INDEX idx_code (code),
  INDEX idx_type (type),
  INDEX idx_active (active)
);
```

### Table: referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id),  -- Parrain
  referred_id UUID REFERENCES users(id),  -- Filleul
  code_used VARCHAR(12) REFERENCES referral_codes(code),
  status VARCHAR(20) DEFAULT 'pending',   -- pending, completed, rewarded
  created_at TIMESTAMP DEFAULT NOW(),
  validated_at TIMESTAMP,
  first_donation_at TIMESTAMP,
  
  points_earned_inscription INTEGER DEFAULT 0,
  points_earned_first_don INTEGER DEFAULT 0,
  points_earned_recurring INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  
  INDEX idx_referrer (referrer_id),
  INDEX idx_referred (referred_id),
  INDEX idx_status (status)
);
```

### Table: code_usages
```sql
CREATE TABLE code_usages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(12) REFERENCES referral_codes(code),
  user_id UUID REFERENCES users(id),
  used_at TIMESTAMP DEFAULT NOW(),
  points_awarded INTEGER,
  ip_address INET,
  user_agent TEXT,
  
  UNIQUE(code, user_id),  -- Un code une fois par utilisateur
  INDEX idx_code (code),
  INDEX idx_user (user_id)
);
```

---

## 📈 Analytics & Rapports

### Métriques Principales

```sql
-- Top Parrains
SELECT 
  u.first_name,
  u.last_name,
  COUNT(r.id) as total_referrals,
  SUM(r.total_points_earned) as total_points,
  AVG(r.total_points_earned) as avg_points_per_referral
FROM users u
JOIN referrals r ON u.id = r.referrer_id
GROUP BY u.id
ORDER BY total_referrals DESC
LIMIT 10;

-- Codes les Plus Utilisés
SELECT 
  rc.code,
  rc.type,
  rc.description,
  COUNT(cu.id) as times_used,
  SUM(cu.points_awarded) as total_points_distributed
FROM referral_codes rc
JOIN code_usages cu ON rc.code = cu.code
GROUP BY rc.id
ORDER BY times_used DESC;

-- Taux de Conversion
SELECT 
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
  COUNT(CASE WHEN status = 'rewarded' THEN 1 END) as rewarded,
  ROUND(
    COUNT(CASE WHEN status != 'pending' THEN 1 END)::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as conversion_rate
FROM referrals;
```

---

## 🎨 Design System

### Couleurs

```css
Parrainage Principal :
- Primary : #9333ea (Violet)
- Secondary : #ec4899 (Rose)
- Gradient : purple-600 to pink-600

États :
- Pending : #fbbf24 (Jaune)
- Completed : #3b82f6 (Bleu)
- Rewarded : #10b981 (Vert)
- Expired : #6b7280 (Gris)

Badges :
- Bronze : #cd7f32
- Argent : #c0c0c0
- Or : #ffd700
- Platine : #e5e4e2
```

### Icônes

```typescript
Sparkles : Générer
Gift : Récompenses
Users : Parrainages
TrendingUp : Statistiques
Copy : Copier
Share2 : Partager
QrCode : QR Code
Check : Validé
X : Fermer
Plus : Ajouter
Star : Points
Award : Badges
```

---

## 🧪 Tests

### Scénarios de Test

```
Code Personnel :
[ ] Générer code fonctionne
[ ] Code unique (8 caractères)
[ ] Copier code fonctionne
[ ] Partager code fonctionne (natif + fallback)
[ ] QR code s'affiche
[ ] Régénérer code fonctionne
[ ] Nouveau code remplace ancien

Codes Bonus :
[ ] Modal création s'ouvre
[ ] Validation champs fonctionne
[ ] Code créé avec bons paramètres
[ ] Code apparaît dans liste
[ ] Copier code bonus fonctionne

Utilisation Code :
[ ] Input accepte code
[ ] Validation code valide fonctionne
[ ] Validation code invalide fonctionne
[ ] Vérification limite utilisations
[ ] Vérification expiration
[ ] Points attribués correctement

Historique :
[ ] Liste parrainages s'affiche
[ ] Statuts corrects
[ ] Dates formatées
[ ] Points affichés si > 0

Statistiques :
[ ] Calculs corrects
[ ] Progression affichée
[ ] Classement mis à jour
[ ] Badges à venir visibles
```

---

## 🚀 Prochaines Fonctionnalités

### Court Terme
- [ ] Push notifications parrainage validé
- [ ] Partage direct WhatsApp/Facebook
- [ ] Email automatique au filleul
- [ ] Graphiques progression

### Moyen Terme
- [ ] Concours meilleurs parrains
- [ ] Récompenses physiques
- [ ] Certificats personnalisés
- [ ] Vidéo explicative

### Long Terme
- [ ] Programme VIP Ambassadeurs
- [ ] Événements exclusifs parrains
- [ ] Partenariats marques
- [ ] Système de paliers avancés

---

## 📞 Support

Questions fréquentes :

**Q : Combien de fois puis-je régénérer mon code ?**  
R : Illimité ! Mais attention, l'ancien code devient invalide.

**Q : Limite de codes bonus créables ?**  
R : Pas de limite, mais modération si abus.

**Q : Que se passe si mon filleul ne fait jamais de don ?**  
R : Tu gardes les 50 points d'inscription, mais pas le bonus 100.

**Q : Combien de temps pour validation parrainage ?**  
R : 24-48h après inscription filleul.

---

**Système de parrainage complet avec génération de codes personnalisés ! 🎉👥**

Chaque utilisateur peut créer ses propres codes bonus et partager son code personnel pour gagner des points !
