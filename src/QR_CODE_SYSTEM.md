# Système QR Code - Don de Sang Togo

## Vue d'ensemble

Le système de QR Code fournit à chaque donneur une **carte d'identité numérique permanente** sous forme de QR Code. Cette carte permet aux centres de collecte d'identifier rapidement les donneurs, d'enregistrer leurs dons et d'attribuer automatiquement des points de récompense.

## Concept : Carte Donneur Permanente

Chaque donneur possède un QR Code unique et permanent (comme une carte de fidélité) qui contient ses informations personnelles. Ce QR Code n'est pas lié à un rendez-vous spécifique mais à l'identité du donneur.

## Flux du processus

### 1. Carte Donneur QR Code (Donneur)

**Où :** Application mobile donneur → Profil → "Ma Carte Donneur"

**Composant :** `/components/QRCodeGenerator.tsx`

La carte donneur contient :
- ID du donneur (unique et permanent)
- Nom complet
- Groupe sanguin
- Téléphone
- Date de naissance
- Type: DONOR_CARD
- Timestamp de génération

**Actions disponibles :**
- Affichage permanent du QR Code
- Téléchargement en PNG pour l'avoir hors ligne
- Visualisation des statistiques (dons effectués, points)
- Utilisation illimitée (pas d'expiration)

**Avantages :**
- ✅ Pas besoin de rendez-vous pour avoir le QR Code
- ✅ Utilisable dans n'importe quel centre de collecte
- ✅ Simplifie l'enregistrement des dons
- ✅ Réduit les erreurs de saisie manuelle

### 2. Scanner et Enregistrer un Don (Centre de collecte)

**Où :** Dashboard Admin → Menu "Scanner QR Code"

**Composant :** `/components/QRScanner.tsx`

Le personnel du centre peut :
1. **Scanner** le QR Code avec la caméra (simulation) ou saisie manuelle
2. **Vérifier** l'identité du donneur (nom, groupe sanguin, téléphone)
3. **Saisir** les détails du don :
   - Centre de collecte actuel
   - Volume de sang collecté (350ml, 450ml, 500ml)
   - Date et heure automatiques
4. **Valider** le don en un clic

### 3. Attribution des points

Les points sont attribués automatiquement selon le groupe sanguin :

| Groupe sanguin | Points attribués | Raison |
|----------------|------------------|---------|
| AB- | 150 points | Très rare |
| O- | 150 points | Donneur universel rare |
| A- | 125 points | Rare |
| B- | 125 points | Rare |
| AB+ | 100 points | Standard |
| A+ | 100 points | Standard |
| B+ | 100 points | Standard |
| O+ | 100 points | Standard |

### 4. Consultation des points (Donneur)

**Où :** Application mobile → Menu "Points"

**Composant :** `/components/Rewards.tsx`

Le donneur peut :
- Voir son total de points
- Consulter son niveau actuel
- Voir les succès débloqués
- Échanger les points contre des récompenses
- Suivre sa progression vers le prochain niveau

## Niveaux et progression

### Système de niveaux

1. **Donneur Débutant** (0+ points) 🩸
2. **Donneur Engagé** (200+ points) 💙
3. **Héros du Sang** (400+ points) 🦸
4. **Super Donneur** (800+ points) ⭐
5. **Légende Vivante** (1500+ points) 👑

### Succès déblocables

- **Premier Don** : 100 points
- **Donneur Régulier** : 150 points (3 dons en 6 mois)
- **Groupe Rare** : 200 points (don d'un groupe rare)
- **Partageur** : 100 points (inviter 5 amis)
- **Marathon** : 500 points (10 dons)
- **Sauveur de Vies** : 1000 points (20 dons)

### Boutique de récompenses

- Badge Exclusif : 200 points
- T-shirt Donneur : 300 points
- Certificat de Mérite : 400 points
- Invitation VIP : 500 points
- Pack Wellness : 800 points

## Implémentation technique

### Structure des données du QR Code (Carte Donneur)

```json
{
  "donorId": "DNR-2024-00156",
  "name": "Koffi Mensah",
  "bloodType": "O+",
  "phone": "+228 90 12 34 56",
  "dateOfBirth": "15/03/1995",
  "generatedAt": 1733140800000,
  "type": "DONOR_CARD"
}
```

### Structure d'enregistrement d'un don

Lorsque le centre valide le don, les données suivantes sont enregistrées :

```json
{
  "donorId": "DNR-2024-00156",
  "donorName": "Koffi Mensah",
  "bloodType": "O+",
  "center": "CHU Sylvanus Olympio",
  "volume": 450,
  "date": "2025-11-27T14:30:00.000Z",
  "pointsAwarded": 100,
  "validatedBy": "admin@chu-sylvanus.tg"
}
```

### Bibliothèques utilisées

- **qrcode.react** : Génération des QR Codes
- Format : SVG avec niveau de correction d'erreur élevé (H)
- Taille : 220x220 pixels

### Sécurité

- Le QR Code contient un timestamp pour éviter la réutilisation
- Validation côté serveur des informations (à implémenter en production)
- Vérification de la correspondance rendez-vous/donneur
- Historique des scans pour prévenir la fraude

## Points d'intégration avec Supabase (Production)

### Tables nécessaires

1. **donations**
   - id
   - donor_id
   - appointment_id
   - center_id
   - blood_type
   - points_awarded
   - validated_at
   - validated_by

2. **donor_points**
   - donor_id
   - total_points
   - current_level
   - updated_at

3. **achievements**
   - id
   - donor_id
   - achievement_type
   - unlocked_at
   - points_awarded

4. **rewards_redemptions**
   - id
   - donor_id
   - reward_id
   - points_spent
   - redeemed_at

### Fonctions Edge à créer

1. **validate_donation** : Valide le don et attribue les points
2. **calculate_level** : Calcule le niveau du donneur
3. **check_achievements** : Vérifie les succès débloqués
4. **redeem_reward** : Échange de points contre récompense

## Avantages du système

### Pour les donneurs
- ✅ Une seule carte à conserver
- ✅ Pas besoin de carte physique
- ✅ Utilisable dans tous les centres
- ✅ Points crédités automatiquement
- ✅ Pas de risque de perte ou oubli (dans le téléphone)
- ✅ Téléchargeable pour utilisation hors ligne

### Pour les centres
- ✅ Identification rapide et fiable
- ✅ Moins d'erreurs de saisie
- ✅ Gain de temps à l'enregistrement
- ✅ Traçabilité complète des dons
- ✅ Statistiques en temps réel
- ✅ Réduction de la paperasse

### Pour le système de santé
- ✅ Base de données centralisée
- ✅ Historique complet par donneur
- ✅ Détection des donneurs réguliers
- ✅ Prévention de la fraude
- ✅ Analytics et reporting facilités

## Fonctionnalités futures

### Phase 2 - Amélioration technique
- [ ] Scan avec vraie caméra (react-qr-reader ou html5-qrcode)
- [ ] Signature numérique pour sécurité renforcée
- [ ] Mode hors ligne avec synchronisation
- [ ] QR Code dynamique avec rotation des codes

### Phase 3 - Gamification avancée
- [ ] Notifications push instantanées à la validation
- [ ] Historique détaillé des validations avec carte interactive
- [ ] Classement mensuel/annuel des donneurs
- [ ] Défis mensuels avec récompenses spéciales
- [ ] Badges sociaux partageables sur réseaux sociaux
- [ ] Certificats digitaux téléchargeables

### Phase 4 - Extension du programme
- [ ] Programme de parrainage avec bonus (50 points par filleul)
- [ ] Partenariats avec commerces locaux (réductions)
- [ ] Événements exclusifs pour top donneurs
- [ ] Carte physique optionnelle avec puce NFC
- [ ] Intégration avec systèmes hospitaliers existants

## Navigation

### Pour les donneurs
**Option 1 - Depuis la page d'accueil :**
Accueil → Banner "Gagnez des points" → Voir mes récompenses

**Option 2 - Depuis le profil :**
Profil → "Ma Carte Donneur" → Afficher le QR Code → Télécharger ou présenter

**Option 3 - Depuis la navigation :**
Menu → Icône "Points" (trophée) → Page Récompenses

### Pour les centres
Dashboard Admin → "Scanner QR Code" (menu ou banner) → Scanner la carte → Sélectionner le centre → Choisir le volume → Valider → Points attribués automatiquement

## Scénarios d'utilisation

### Scénario 1 : Don spontané (sans rendez-vous)
1. Donneur se présente au centre sans rendez-vous
2. Donneur montre sa carte QR Code sur son téléphone
3. Centre scanne le code et identifie le donneur
4. Centre vérifie l'éligibilité (délai depuis dernier don)
5. Don effectué
6. Centre valide dans le système
7. Points ajoutés instantanément

### Scénario 2 : Don planifié (avec rendez-vous)
1. Donneur prend rendez-vous via l'application
2. Le jour J, le donneur se présente avec sa carte QR Code
3. Centre scanne pour confirmer l'identité
4. Don effectué
5. Centre valide et ajoute les points

### Scénario 3 : Don mobile (collecte en entreprise/université)
1. Équipe mobile se déplace avec l'application admin
2. Donneurs présentent leur carte QR Code
3. L'équipe scanne et sélectionne le lieu de collecte
4. Validation instantanée sur place

## Support

En cas de problème :
- Le donneur peut télécharger le QR Code en avance
- Entrée manuelle du code possible
- Support technique disponible dans le profil
