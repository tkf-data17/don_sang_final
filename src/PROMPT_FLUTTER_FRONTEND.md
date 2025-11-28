# Prompt Flutter - Application Mobile Don de Sang Togo

**Version** : 1.0  
**Date** : 27 Novembre 2025  
**Plateforme Cible** : Android (priorité), iOS (futur)

---

## 🎯 CONTEXTE DU PROJET

Tu es un développeur Flutter expert. Je veux que tu crées une application mobile native pour la plateforme de don de sang au Togo. L'application web existe déjà (React/Tailwind), et je veux maintenant la version mobile native avec Flutter.

**Mission** : Créer une application mobile Flutter complète, performante et optimisée pour Android, avec mode hors-ligne partiel, qui connecte les donneurs de sang avec les centres de collecte et les équipes médicales.

---

## 📱 SPÉCIFICATIONS TECHNIQUES

### Stack Technologique

```yaml
Framework: Flutter 3.16+
Langage: Dart 3.0+
État: Riverpod 2.4+ (ou Provider/Bloc)
Navigation: go_router 12.0+
HTTP: dio 5.0+ ou http 1.0+
Base de données locale: sqflite 2.3+ ou hive 2.2+
Cartes: google_maps_flutter 2.5+ ou flutter_map 6.0+
QR Code: qr_flutter 4.1+ et mobile_scanner 3.5+
Notifications: firebase_messaging 14.0+ ou flutter_local_notifications 16.0+
Cache images: cached_network_image 3.3+
Géolocalisation: geolocator 10.0+
Permissions: permission_handler 11.0+
Partage: share_plus 7.0+
URL launcher: url_launcher 6.2+
Stockage: shared_preferences 2.2+ et flutter_secure_storage 9.0+
```

### Architecture

```
lib/
├── main.dart
├── app.dart
├── config/
│   ├── theme.dart
│   ├── colors.dart
│   ├── routes.dart
│   └── constants.dart
├── core/
│   ├── network/
│   │   ├── api_client.dart
│   │   ├── api_endpoints.dart
│   │   └── network_info.dart
│   ├── storage/
│   │   ├── local_storage.dart
│   │   └── secure_storage.dart
│   ├── utils/
│   │   ├── date_utils.dart
│   │   ├── validators.dart
│   │   └── helpers.dart
│   └── errors/
│       └── exceptions.dart
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── datasources/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── screens/
│   │       ├── widgets/
│   │       └── providers/
│   ├── home/
│   ├── centers/
│   ├── appointments/
│   ├── alerts/
│   ├── rewards/
│   ├── referral/
│   ├── profile/
│   └── admin/
├── shared/
│   ├── widgets/
│   ├── models/
│   └── utils/
└── l10n/ (internationalisation FR)
```

---

## 🎨 DESIGN SYSTEM

### Palette de Couleurs

```dart
// lib/config/colors.dart

class AppColors {
  // Couleurs Principales
  static const Color primaryRed = Color(0xFFDC2626);
  static const Color primaryPink = Color(0xFFEC4899);
  static const Color accentGold = Color(0xFFF59E0B);
  
  // Couleurs Secondaires
  static const Color successGreen = Color(0xFF10B981);
  static const Color infoBlue = Color(0xFF3B82F6);
  static const Color warningOrange = Color(0xFFF97316);
  static const Color errorRed = Color(0xFFEF4444);
  
  // Couleurs Fonctionnelles
  static const Color urgentAlert = Color(0xFFDC2626);
  static const Color rewardGold = Color(0xFFF59E0B);
  static const Color mapMarker = Color(0xFFDC2626);
  
  // Neutres
  static const Color gray900 = Color(0xFF111827);
  static const Color gray800 = Color(0xFF1F2937);
  static const Color gray700 = Color(0xFF374151);
  static const Color gray600 = Color(0xFF4B5563);
  static const Color gray500 = Color(0xFF6B7280);
  static const Color gray400 = Color(0xFF9CA3AF);
  static const Color gray300 = Color(0xFFD1D5DB);
  static const Color gray200 = Color(0xFFE5E7EB);
  static const Color gray100 = Color(0xFFF3F4F6);
  static const Color gray50 = Color(0xFFF9FAFB);
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  
  // Groupes Sanguins
  static const Map<String, Color> bloodTypes = {
    'A+': Color(0xFFEF4444),
    'A-': Color(0xFFDC2626),
    'B+': Color(0xFFF97316),
    'B-': Color(0xFFEA580C),
    'AB+': Color(0xFF8B5CF6),
    'AB-': Color(0xFF7C3AED),
    'O+': Color(0xFF10B981),
    'O-': Color(0xFF059669),
  };
}
```

### Typographie

```dart
// lib/config/theme.dart

class AppTypography {
  static const String fontFamily = 'Inter';
  
  // Tailles
  static const double h1 = 32.0;
  static const double h2 = 28.0;
  static const double h3 = 24.0;
  static const double h4 = 20.0;
  static const double body = 16.0;
  static const double bodySmall = 14.0;
  static const double caption = 12.0;
  
  // Styles
  static TextStyle heading1 = const TextStyle(
    fontSize: h1,
    fontWeight: FontWeight.bold,
    fontFamily: fontFamily,
  );
  
  static TextStyle heading2 = const TextStyle(
    fontSize: h2,
    fontWeight: FontWeight.bold,
    fontFamily: fontFamily,
  );
  
  // ... etc
}
```

### Thème

```dart
ThemeData appTheme = ThemeData(
  primaryColor: AppColors.primaryRed,
  scaffoldBackgroundColor: AppColors.white,
  fontFamily: 'Inter',
  
  colorScheme: ColorScheme.light(
    primary: AppColors.primaryRed,
    secondary: AppColors.primaryPink,
    error: AppColors.errorRed,
    surface: AppColors.white,
  ),
  
  appBarTheme: AppBarTheme(
    backgroundColor: AppColors.white,
    foregroundColor: AppColors.gray900,
    elevation: 0,
    centerTitle: true,
  ),
  
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.primaryRed,
      foregroundColor: AppColors.white,
      padding: EdgeInsets.symmetric(vertical: 16, horizontal: 24),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  ),
  
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: AppColors.gray300),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: AppColors.primaryRed, width: 2),
    ),
  ),
);
```

---

## 📲 FONCTIONNALITÉS DÉTAILLÉES

### 1. AUTHENTIFICATION

#### Écrans

**1.1. Splash Screen**
```dart
// lib/features/auth/presentation/screens/splash_screen.dart

- Logo animé (fade in + scale)
- Texte "Don de Sang Togo"
- Vérification token JWT
- Redirection auto :
  → Si connecté : Home
  → Si non connecté : Onboarding
- Durée : 2 secondes
```

**1.2. Onboarding (3 slides)**
```dart
// lib/features/auth/presentation/screens/onboarding_screen.dart

Slide 1 :
- Illustration : Carte avec pins
- Titre : "Trouve un centre près de chez toi"
- Description : "15+ centres de collecte référencés"

Slide 2 :
- Illustration : Calendrier
- Titre : "Prends rendez-vous facilement"
- Description : "Réserve ton créneau en 3 clics"

Slide 3 :
- Illustration : Trophée
- Titre : "Gagne des récompenses"
- Description : "17+ cadeaux à échanger"

Boutons :
- "Suivant" → Slide suivante
- "Passer" → Login
- Indicateurs de progression (3 points)
```

**1.3. Login**
```dart
// lib/features/auth/presentation/screens/login_screen.dart

Champs :
- Email (TextFormField avec validation)
- Mot de passe (obscureText: true, icône œil)
- "Mot de passe oublié ?" (TextButton)
- Bouton "Se connecter" (ElevatedButton)
- "Pas encore inscrit ? S'inscrire" (TextButton)

Validations :
- Email : format email valide
- Mot de passe : min 6 caractères

États :
- Loading (CircularProgressIndicator)
- Erreur (SnackBar rouge)
- Succès (Navigation → Home)

API :
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

**1.4. Register (Multi-étape)**
```dart
// lib/features/auth/presentation/screens/register_screen.dart

Étape 1/3 : Informations personnelles
- Prénom
- Nom
- Date de naissance (DatePicker)
- Genre (Dropdown : Homme/Femme/Autre)
- Bouton "Suivant"

Étape 2/3 : Informations médicales
- Groupe sanguin (Dropdown : A+, A-, B+, B-, AB+, AB-, O+, O-)
- Poids (kg)
- Dernière date de don (DatePicker, optionnel)
- Maladies chroniques (Checkbox list)
- Bouton "Suivant"

Étape 3/3 : Compte
- Email
- Téléphone (+228)
- Mot de passe
- Confirmation mot de passe
- Localisation (MapSelector ou City Dropdown)
- Checkbox : "J'accepte les CGU"
- Bouton "S'inscrire"

Indicateur de progression : 1/3, 2/3, 3/3

API :
POST /api/auth/register
Body: { toutes les infos }
Response: { token, user }
```

**1.5. Forgot Password**
```dart
// lib/features/auth/presentation/screens/forgot_password_screen.dart

- Email input
- Bouton "Envoyer lien de réinitialisation"
- Message de confirmation
- Redirection vers Login après 3s

API :
POST /api/auth/forgot-password
Body: { email }
```

#### Modèles

```dart
// lib/features/auth/data/models/user_model.dart

class User {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String bloodType;
  final DateTime dateOfBirth;
  final String gender;
  final String phone;
  final double? weight;
  final DateTime? lastDonation;
  final String? city;
  final String? region;
  final double? lat;
  final double? lng;
  final String qrCode; // Code unique permanent
  final int points;
  final String role; // 'donor', 'admin', 'center'
  final DateTime createdAt;
  final List<String>? chronicDiseases;
  final bool isEligible;
  
  // Méthodes
  int get age { /* calculer depuis dateOfBirth */ }
  bool get canDonate { /* vérifier éligibilité */ }
  String get fullName => '$firstName $lastName';
}
```

#### Persistance

```dart
// lib/core/storage/secure_storage.dart

class SecureStorage {
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  
  Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  Future<void> saveUser(User user) async {
    await _storage.write(key: 'user', value: jsonEncode(user.toJson()));
  }
  
  Future<User?> getUser() async {
    final userJson = await _storage.read(key: 'user');
    if (userJson != null) {
      return User.fromJson(jsonDecode(userJson));
    }
    return null;
  }
}
```

---

### 2. HOME / DASHBOARD

```dart
// lib/features/home/presentation/screens/home_screen.dart

Structure :
- AppBar :
  - Logo + "Don de Sang"
  - Icône notifications (Badge si non lues)
  - Icône profil
  
- Header Card (Gradient Rouge→Rose) :
  - Photo profil
  - "Bonjour, [Prénom] !"
  - Points : "🌟 1,250 points"
  - Badge actuel : "🥇 Donneur Or"
  - Bouton "Mon QR Code"
  
- Stats Grid (2x2) :
  - Dons réalisés : 12
  - Prochains rendez-vous : 1
  - Vies sauvées : ~36
  - Jours avant prochain don : 45
  
- Actions Rapides (4 boutons) :
  - "🗺️ Trouver un centre"
  - "📅 Prendre RDV"
  - "🚨 Alertes" (Badge rouge si urgentes)
  - "🎁 Récompenses"
  
- Section "Alertes Urgentes" (si disponibles) :
  - Card rouge avec animation pulse
  - "🚨 URGENT : Besoin O- à CHU Lomé"
  - Bouton "Je peux donner"
  
- Section "Prochains RDV" :
  - Liste des RDV (max 3)
  - Card par RDV : date, heure, centre, bouton navigation
  
- Section "Actualités" :
  - Articles, conseils santé
  - Campagnes en cours
  
- Bottom Navigation Bar (5 onglets) :
  - Accueil (home)
  - Centres (map)
  - Alertes (alert)
  - Récompenses (gift)
  - Profil (user)
```

**Widgets Réutilisables**

```dart
// lib/shared/widgets/stat_card.dart
class StatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final Color color;
  // ...
}

// lib/shared/widgets/quick_action_button.dart
class QuickActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onTap;
  final Color? backgroundColor;
  // ...
}

// lib/shared/widgets/alert_card.dart
class AlertCard extends StatelessWidget {
  final Alert alert;
  final VoidCallback onRespond;
  // ...
}
```

---

### 3. CARTE INTERACTIVE DES CENTRES

```dart
// lib/features/centers/presentation/screens/centers_map_screen.dart

Composants :
- GoogleMap ou FlutterMap
- Markers pour les 15 centres (pin rouge)
- Marker pour position utilisateur (pin bleu)
- Bouton "Ma position" (FloatingActionButton)
- Carte slide-up (DraggableScrollableSheet) :
  - Liste des centres triés par distance
  - Filtres : Région, Type, Distance

Centres (15 centres réels du Togo) :
[
  {
    "id": 1,
    "name": "CHU Sylvanus Olympio",
    "city": "Lomé",
    "region": "Maritime",
    "address": "Boulevard du 13 Janvier, Lomé",
    "phone": "+228 22 21 25 01",
    "hours": "Lun-Ven: 8h-17h, Sam: 8h-12h",
    "lat": 6.1319,
    "lng": 1.2223,
    "type": "CHU"
  },
  {
    "id": 2,
    "name": "CHU Campus (Tokoin)",
    "city": "Lomé",
    "region": "Maritime",
    "address": "Route d'Aného, Tokoin, Lomé",
    "phone": "+228 22 25 58 42",
    "hours": "Lun-Sam: 7h30-18h",
    "lat": 6.1633,
    "lng": 1.2255,
    "type": "CHU"
  },
  {
    "id": 3,
    "name": "Centre National de Transfusion Sanguine (CNTS)",
    "city": "Lomé",
    "region": "Maritime",
    "address": "Rue du Commerce, Lomé",
    "phone": "+228 22 21 44 88",
    "hours": "Lun-Ven: 7h-19h, Sam-Dim: 8h-14h",
    "lat": 6.1256,
    "lng": 1.2116,
    "type": "Centre"
  },
  // ... (copier les 15 centres de /components/InteractiveCentersMap.tsx)
]

Fonctionnalités :
- Géolocalisation temps réel
- Calcul distance avec Haversine :
  double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
    const R = 6371; // Rayon de la Terre en km
    final dLat = _toRadians(lat2 - lat1);
    final dLng = _toRadians(lng2 - lng1);
    final a = sin(dLat / 2) * sin(dLat / 2) +
        cos(_toRadians(lat1)) * cos(_toRadians(lat2)) *
        sin(dLng / 2) * sin(dLng / 2);
    final c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c;
  }
  
- Navigation GPS : 
  void openNavigation(double lat, double lng) async {
    final url = 'https://www.google.com/maps/dir/?api=1&destination=$lat,$lng';
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    }
  }

- Tap sur marker → Bottom sheet avec détails centre :
  - Nom
  - Distance
  - Adresse
  - Téléphone (cliquable)
  - Horaires
  - Bouton "Prendre RDV"
  - Bouton "Y aller" (navigation GPS)
```

**Modèle Centre**

```dart
// lib/features/centers/data/models/center_model.dart

class Center {
  final int id;
  final String name;
  final String city;
  final String region;
  final String address;
  final String phone;
  final String hours;
  final double lat;
  final double lng;
  final String type; // 'CHU', 'CHR', 'Centre', 'Mobile'
  double? distance; // Calculée dynamiquement
  
  // Méthodes
  String get formattedDistance => 
    distance != null ? '${distance!.toStringAsFixed(1)} km' : '';
}
```

**Filtres**

```dart
// lib/features/centers/presentation/widgets/center_filters.dart

enum CenterType { all, chu, chr, centre, mobile }
enum Region { all, maritime, plateaux, centrale, kara, savanes }

class CenterFilters extends StatefulWidget {
  final Function(CenterType, Region, double?) onFilterChanged;
  // Dropdowns pour type, région, slider pour distance max
}
```

---

### 4. PRISE DE RENDEZ-VOUS

```dart
// lib/features/appointments/presentation/screens/book_appointment_screen.dart

Étapes :

Étape 1 : Sélectionner un centre
- Liste des centres avec distance
- Recherche par nom/ville
- Filtre par distance
- Card par centre : nom, distance, horaires
- Sélection → Étape 2

Étape 2 : Choisir date et créneau
- Calendrier (calendar_date_picker2 ou table_calendar)
- Dates disponibles (excluant weekends/jours fériés selon centre)
- Liste créneaux disponibles par tranche 30min :
  - 8h00, 8h30, 9h00, ..., 17h00
  - Afficher disponibilité (vert = dispo, gris = complet)
- Sélection → Étape 3

Étape 3 : Confirmation
- Résumé :
  - Centre : CHU Sylvanus Olympio
  - Date : Vendredi 15 Décembre 2025
  - Heure : 10h30
  - Adresse : Boulevard du 13 Janvier, Lomé
- Checkbox : "Je confirme que j'ai respecté les 56 jours depuis mon dernier don"
- Bouton "Confirmer le rendez-vous"

Confirmation :
- Message succès : "✅ RDV confirmé !"
- Bouton "Ajouter au calendrier" (add_2_calendar package)
- Bouton "Retour à l'accueil"

API :
POST /api/appointments
Body: {
  userId,
  centerId,
  date,
  time
}
Response: { appointment }
```

**Modèle RDV**

```dart
// lib/features/appointments/data/models/appointment_model.dart

class Appointment {
  final String id;
  final String userId;
  final int centerId;
  final String centerName;
  final DateTime date;
  final String time; // "10:30"
  final String status; // 'pending', 'confirmed', 'completed', 'cancelled'
  final DateTime createdAt;
  
  String get formattedDate => DateFormat('EEEE d MMMM yyyy', 'fr_FR').format(date);
  DateTime get dateTime => DateTime(date.year, date.month, date.day, 
    int.parse(time.split(':')[0]), int.parse(time.split(':')[1]));
}
```

**Liste des RDV**

```dart
// lib/features/appointments/presentation/screens/appointments_list_screen.dart

Onglets :
- À venir (status = 'pending' ou 'confirmed', date >= aujourd'hui)
- Passés (status = 'completed' ou date < aujourd'hui)

Card par RDV :
- Badge statut (couleur selon status)
- Date et heure
- Centre
- Adresse
- Boutons :
  - "Itinéraire" (navigation GPS)
  - "Modifier" (si à venir, date > 24h)
  - "Annuler" (si à venir)
  - "Mon QR Code" (pour check-in au centre)
```

---

### 5. ALERTES URGENTES

```dart
// lib/features/alerts/presentation/screens/alerts_screen.dart

Liste des alertes :
- Triées par date (plus récentes en haut)
- Filtres :
  - Toutes
  - Mon groupe sanguin
  - Ma région
  - Urgentes uniquement

Card par alerte :
- Badge "🚨 URGENT" si critical
- Groupe sanguin (A+, O-, etc.) - badge coloré
- Titre : "Besoin urgent de sang"
- Centre : "CHU Sylvanus Olympio - Lomé"
- Description courte
- Distance si géoloc activée
- Date de publication : "Il y a 15 min"
- Bouton "Je peux donner"
- Bouton "Partager"

Détails alerte (tap sur card) :
- Toutes les infos complètes
- Carte avec localisation centre
- Nombre de réponses : "12 donneurs se sont manifestés"
- Boutons :
  - "Je peux donner"
  - "Appeler le centre"
  - "Y aller" (navigation)
  - "Partager"

Réponse à une alerte :
- Confirmation : "Voulez-vous confirmer que vous pouvez donner ?"
- Checkbox : "Je peux me rendre au centre dans les 2h"
- Bouton "Confirmer"
- Message succès : "✅ Le centre a été notifié. Merci !"
- Le centre vous contactera par téléphone

API :
GET /api/alerts?bloodType=O-&region=Maritime
POST /api/alerts/:id/respond
Body: { userId }
```

**Modèle Alerte**

```dart
// lib/features/alerts/data/models/alert_model.dart

class Alert {
  final String id;
  final String bloodType;
  final String centerName;
  final int centerId;
  final String city;
  final String region;
  final double? lat;
  final double? lng;
  final String description;
  final bool isCritical;
  final DateTime createdAt;
  final int responseCount;
  final bool hasResponded;
  
  String get timeAgo {
    final diff = DateTime.now().difference(createdAt);
    if (diff.inMinutes < 60) return 'Il y a ${diff.inMinutes} min';
    if (diff.inHours < 24) return 'Il y a ${diff.inHours}h';
    return 'Il y a ${diff.inDays}j';
  }
}
```

**Notifications Push**

```dart
// lib/core/notifications/push_notifications.dart

class PushNotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  
  Future<void> initialize() async {
    // Demander permission
    await _fcm.requestPermission();
    
    // Obtenir token FCM
    String? token = await _fcm.getToken();
    // Envoyer token au backend
    
    // Écouter notifications foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _showLocalNotification(message);
    });
    
    // Gérer tap sur notification
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _handleNotificationTap(message);
    });
  }
  
  void _handleNotificationTap(RemoteMessage message) {
    if (message.data['type'] == 'alert') {
      // Navigation vers AlertDetailsScreen
      final alertId = message.data['alertId'];
      // navigatorKey.currentState?.push(...)
    }
  }
}
```

---

### 6. SYSTÈME DE RÉCOMPENSES

```dart
// lib/features/rewards/presentation/screens/rewards_screen.dart

Header :
- Points totaux : "🌟 1,250 points"
- Badge actuel : "🥇 Donneur Or"
- Progression vers prochain niveau :
  - Progress bar
  - "500 points avant Platine"

Onglets (TabBar) :

1. BOUTIQUE (17+ récompenses)
   - Grid 2 colonnes
   - Card par récompense :
     - Icône/Image
     - Nom : "Bon restaurant"
     - Points : 500 points
     - Badge "Populaire" ou "Nouveau"
     - Bouton "Échanger"
   
   Catégories (chips filtrables) :
   - Tous
   - Restaurants
   - Transport
   - Loisirs
   - Santé
   - Télécom

   Récompenses (copier de l'app web) :
   [
     { id: 1, name: "Bon restaurant 5,000 FCFA", points: 500, category: "Restaurants", icon: "🍽️" },
     { id: 2, name: "Ticket cinéma", points: 800, category: "Loisirs", icon: "🎬" },
     { id: 3, name: "Crédit transport 3,000 FCFA", points: 300, category: "Transport", icon: "🚗" },
     { id: 4, name: "Recharge téléphone 2,000 FCFA", points: 200, category: "Télécom", icon: "📱" },
     { id: 5, name: "Bon shopping 10,000 FCFA", points: 1000, category: "Shopping", icon: "🛍️" },
     // ... (copier les 17+ de l'app web)
   ]

2. MES ÉCHANGES
   - Historique des récompenses échangées
   - Card par échange :
     - Date
     - Récompense
     - Code promo/QR code
     - Statut : "Utilisé" ou "Non utilisé"
     - Validité
   - Si code non utilisé : bouton "Voir le code"

3. BADGES
   - Grid de tous les badges (3 colonnes)
   - Badge obtenu : couleur + date
   - Badge non obtenu : grisé + conditions
   
   Badges (niveaux) :
   - 🥉 Bronze (0-99 points)
   - 🥈 Argent (100-299 points)
   - 🥇 Or (300-599 points)
   - 💎 Platine (600-999 points)
   - 👑 Diamant (1000+ points)
   
   Badges spéciaux :
   - 🎯 Premier don
   - 🔥 5 dons
   - ⭐ 10 dons
   - 🏆 20 dons
   - 💪 50 dons
   - 🚨 Réponse alerte urgente
   - 🤝 Parrain 5 amis
   - 📅 RDV réguliers (6 mois consécutifs)

4. LEADERBOARD
   - Top 50 donneurs du mois
   - Card par donneur :
     - Rang : #1, #2, #3, ...
     - Avatar
     - Prénom (anonyme : "Maxime D.")
     - Points ce mois
     - Badge
   - Highlight si utilisateur dans le top
   - Ma position : "#12 sur 1,248 donneurs"

Échange de récompense :
- Dialog confirmation :
  - Image récompense
  - Nom
  - Points requis
  - "Confirmer l'échange ?"
  - Bouton "Échanger (500 pts)"
- Succès :
  - Animation confettis (confetti package)
  - Message : "✅ Récompense échangée !"
  - Affichage code promo/QR code
  - Bouton "Copier le code"
  - Bouton "Partager"
  - Expiration : "Valide jusqu'au 31/12/2025"

API :
GET /api/rewards
GET /api/rewards/my-exchanges
POST /api/rewards/:id/exchange
Body: { userId }
Response: { exchange, promoCode, qrCode }
```

**Modèle Récompense**

```dart
// lib/features/rewards/data/models/reward_model.dart

class Reward {
  final int id;
  final String name;
  final String description;
  final int points;
  final String category;
  final String icon;
  final String? imageUrl;
  final bool isAvailable;
  final int stock;
  
  bool canExchange(int userPoints) => userPoints >= points && isAvailable;
}

class RewardExchange {
  final String id;
  final int rewardId;
  final String rewardName;
  final String promoCode;
  final String qrCode;
  final DateTime exchangedAt;
  final DateTime? usedAt;
  final DateTime expiresAt;
  final bool isUsed;
  
  bool get isExpired => DateTime.now().isAfter(expiresAt);
  bool get isValid => !isUsed && !isExpired;
}
```

---

### 7. SYSTÈME DE PARRAINAGE

```dart
// lib/features/referral/presentation/screens/referral_screen.dart

Onglets (4) :

1. GÉNÉRER
   Header stats (cards) :
   - Parrainages : 3
   - Validés : 2
   - Points gagnés : 150
   - Rang : #12
   
   Mon code perso :
   - Card avec gradient
   - Code : "MAXIME2025"
   - Bouton "Copier"
   - Bouton "Partager"
   - QR Code
   - Bouton "Télécharger QR"
   
   Message pré-rempli :
   "🩸 Rejoins-moi sur Don de Sang Togo !
   
   Utilise mon code MAXIME2025 pour gagner 50 points de bienvenue.
   
   Ensemble, sauvons des vies ! ❤️
   
   📱 Télécharge l'app : [lien]"
   
   Options partage :
   - WhatsApp
   - SMS
   - Facebook
   - Copier le lien

2. UTILISER
   - Input pour entrer un code
   - Bouton "Valider"
   - Message : "Entre le code d'un ami pour gagner des points"
   - Historique codes utilisés (si plusieurs codes possibles)
   
   Validation :
   - Vérifier code existe
   - Vérifier pas déjà utilisé
   - Vérifier pas expiré
   - Appliquer points
   - Message succès : "✅ +50 points gagnés !"

3. CODES BONUS
   - Créer mes propres codes bonus (fonctionnalité avancée)
   
   Formulaire :
   - Points à offrir (slider 10-500)
   - Nombre d'utilisations max (slider 1-100)
   - Description
   - Date d'expiration (optionnelle)
   - Bouton "Créer le code"
   
   Liste mes codes créés :
   - Card par code :
     - Code : "BONUS100"
     - Points : 100
     - Utilisations : 5/20
     - Expire le : 31/12/2025
     - Statut : Actif/Expiré
     - Bouton "Désactiver"
     - Bouton "Partager"

4. HISTORIQUE
   - Liste de tous mes parrainages
   - Card par filleul :
     - Avatar + Prénom
     - "Parrainé le [date]"
     - Statut : "En attente" ou "Validé ✅"
     - Points gagnés : "+50 pts"
   
   Stats :
   - Total filleuls : 5
   - Filleuls actifs (ont fait un don) : 2
   - Points gagnés total : 150
   
   Badges Ambassadeur :
   - 🥉 Ambassadeur Bronze : 5 filleuls
   - 🥈 Ambassadeur Argent : 10 filleuls
   - 🥇 Ambassadeur Or : 25 filleuls
   - 👑 Ambassadeur Légende : 50 filleuls

API :
GET /api/referral/my-code
POST /api/referral/use-code
Body: { code }
POST /api/referral/create-bonus-code
Body: { points, maxUses, description, expiresAt }
GET /api/referral/my-referrals
```

**Modèles**

```dart
// lib/features/referral/data/models/referral_models.dart

class ReferralCode {
  final String code;
  final String type; // 'personal', 'bonus'
  final int points;
  final int maxUses;
  final int currentUses;
  final String? description;
  final DateTime createdAt;
  final DateTime? expiresAt;
  final bool isActive;
  
  bool get isExpired => expiresAt != null && DateTime.now().isAfter(expiresAt);
  bool get hasReachedLimit => currentUses >= maxUses;
  bool get isValid => isActive && !isExpired && !hasReachedLimit;
}

class Referral {
  final String id;
  final String referrerId;
  final String referredId;
  final String referredName;
  final String code;
  final int pointsEarned;
  final DateTime createdAt;
  final bool isValidated; // true si le filleul a fait au moins 1 don
  final DateTime? validatedAt;
}
```

---

### 8. PROFIL & QR CODE

```dart
// lib/features/profile/presentation/screens/profile_screen.dart

Header :
- Photo de profil (CircleAvatar, éditable)
- Nom complet
- Badge actuel
- Points totaux

Sections :

1. INFORMATIONS PERSONNELLES
   - Card expandable
   - Prénom, Nom, Email, Téléphone
   - Date de naissance, Genre
   - Bouton "Modifier"

2. INFORMATIONS MÉDICALES
   - Card expandable
   - Groupe sanguin (badge coloré)
   - Poids
   - Dernière date de don
   - Prochaine date de don possible
   - Éligibilité : ✅ ou ❌
   - Bouton "Mettre à jour"

3. MON QR CODE
   - Card avec QR code permanent
   - Code unique : "DNG-TG-00123456"
   - Description : "Présente ce code lors de ton don"
   - Boutons :
     - "Agrandir" (plein écran)
     - "Télécharger"
     - "Partager"

4. HISTORIQUE DES DONS
   - Liste des dons passés
   - Card par don :
     - Date
     - Centre
     - Quantité (généralement 450ml)
     - Points gagnés : +50 pts
     - Badge obtenu (si niveau up)
   - Bouton "Voir tout l'historique"
   - Bouton "Exporter CSV"

5. STATISTIQUES
   - Card avec graphiques (fl_chart package)
   - Dons par mois (bar chart)
   - Évolution points (line chart)
   - Répartition types centres (pie chart)

6. PARAMÈTRES
   - Notifications :
     - Push notifications (Switch)
     - Alertes urgentes (Switch)
     - Rappels RDV (Switch)
   - Localisation :
     - Partager ma position (Switch)
   - Langue : Français (dropdown)
   - Thème : Clair/Sombre (en préparation)

7. LIENS
   - FAQ
   - Conditions d'utilisation
   - Politique de confidentialité
   - Nous contacter
   - À propos

8. COMPTE
   - Bouton "Modifier mon mot de passe"
   - Bouton "Supprimer mon compte" (avec confirmation)
   - Bouton "Se déconnecter" (rouge)

Édition profil :
- BottomSheet ou Page dédiée
- Formulaire avec les champs
- Validation en temps réel
- Bouton "Enregistrer"
- Feedback succès

QR Code en plein écran :
- Fond blanc
- QR code centré, très grand
- Code en dessous
- Nom et groupe sanguin
- Bouton retour
- Rotation écran en landscape
- Luminosité max automatique

API :
GET /api/users/me
PUT /api/users/me
Body: { firstName, lastName, phone, weight, ... }
GET /api/donations/history
```

**Modèle Donation**

```dart
// lib/features/profile/data/models/donation_model.dart

class Donation {
  final String id;
  final String userId;
  final int centerId;
  final String centerName;
  final DateTime date;
  final int quantity; // en ml (généralement 450)
  final int pointsEarned;
  final String? notes;
  final bool isValidated;
  
  String get formattedDate => DateFormat('d MMMM yyyy', 'fr_FR').format(date);
}
```

---

### 9. INTERFACE ADMIN (si role = 'admin')

```dart
// lib/features/admin/presentation/screens/admin_dashboard_screen.dart

Dashboard :
- Card stats :
  - Donneurs inscrits : 1,248
  - Dons ce mois : 342
  - Alertes actives : 15
  - Récompenses échangées : 5,678

Onglets :

1. DONNEURS
   - Liste tous les donneurs
   - Recherche par nom, email, groupe sanguin
   - Filtres : région, éligibilité, dernière connexion
   - Card par donneur :
     - Avatar + Nom
     - Email, Téléphone
     - Groupe sanguin
     - Dons effectués
     - Points
     - Bouton "Voir détails"
     - Bouton "Valider un don"
   
   Valider un don :
   - Dialog :
     - Sélectionner centre
     - Sélectionner date (défaut: aujourd'hui)
     - Quantité : 450ml (défaut)
     - Points à attribuer : 50 (défaut)
     - Bouton "Valider"
   - Succès : don ajouté à l'historique + points ajoutés

2. RENDEZ-VOUS
   - Liste tous les RDV
   - Filtres : date, centre, statut
   - Card par RDV :
     - Date et heure
     - Donneur (nom + tel)
     - Centre
     - Statut
     - Boutons :
       - "Confirmer"
       - "Annuler"
       - "Marquer comme effectué"

3. ALERTES
   - Créer nouvelle alerte :
     - Formulaire :
       - Groupe sanguin
       - Centre
       - Description
       - Checkbox "Critique"
       - Bouton "Publier l'alerte"
   - Liste alertes actives :
     - Card par alerte :
       - Groupe sanguin
       - Centre
       - Date publication
       - Réponses : 12 donneurs
       - Bouton "Voir réponses"
       - Bouton "Clôturer"

4. RÉCOMPENSES
   - Gérer le catalogue :
     - Liste récompenses
     - Boutons "Ajouter", "Modifier", "Supprimer"
     - Gestion stock
   - Historique échanges :
     - Liste tous les échanges
     - Filtres : date, récompense, statut
     - Possibilité marquer "utilisé"

5. STATISTIQUES
   - Graphiques :
     - Dons par mois (bar chart)
     - Nouveaux inscrits par mois (line chart)
     - Répartition groupes sanguins (pie chart)
     - Top 10 centres (bar chart)
   - Export données :
     - Bouton "Exporter CSV" (toutes données)
     - Filtres export : date range, type données

API :
GET /api/admin/stats
GET /api/admin/users
POST /api/admin/donations/validate
GET /api/admin/appointments
POST /api/admin/alerts/create
```

---

### 10. MODE HORS-LIGNE PARTIEL

```dart
// lib/core/storage/local_storage.dart

Données à cacher localement (sqflite ou hive) :

1. Profil utilisateur
2. Liste des 15 centres (statique)
3. Historique des dons
4. RDV à venir
5. Récompenses échangées non utilisées
6. Mon code de parrainage
7. Mon QR code

Stratégie de cache :

- Lors de la connexion : télécharger et sauvegarder
- Afficher les données en cache si pas de connexion
- Banner "Mode hors-ligne" en haut si pas de connexion
- Synchroniser automatiquement quand connexion retrouvée

Vérification connexion :

class NetworkInfo {
  final InternetConnectionChecker checker;
  
  Future<bool> get isConnected => checker.hasConnection;
  
  Stream<InternetConnectionStatus> get connectionStream => 
    checker.onStatusChange;
}

Utilisation :

if (await networkInfo.isConnected) {
  // Requête API
  final data = await api.fetchCenters();
  await localStorage.saveCenters(data);
} else {
  // Charger depuis cache
  final data = await localStorage.getCenters();
  if (data.isEmpty) {
    // Afficher message "Pas de connexion"
  }
}
```

---

## 🔔 NOTIFICATIONS

### Notifications Locales

```dart
// lib/core/notifications/local_notifications.dart

Types de notifications locales :

1. Rappel RDV (1 jour avant, 2h avant)
2. Éligibilité de nouveau don (56 jours après dernier don)
3. Nouveau badge obtenu
4. Points sur le point d'expirer (si système d'expiration)

Configuration :

FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
  FlutterLocalNotificationsPlugin();

const AndroidInitializationSettings initializationSettingsAndroid =
  AndroidInitializationSettings('@mipmap/ic_launcher');

const InitializationSettings initializationSettings = InitializationSettings(
  android: initializationSettingsAndroid,
);

await flutterLocalNotificationsPlugin.initialize(
  initializationSettings,
  onDidReceiveNotificationResponse: (NotificationResponse response) {
    // Gérer tap notification
  },
);

Planifier notification :

await flutterLocalNotificationsPlugin.zonedSchedule(
  id,
  'Rappel : Rendez-vous demain',
  'N\'oublie pas ton RDV au CHU Lomé à 10h30',
  scheduledDate,
  const NotificationDetails(
    android: AndroidNotificationDetails(
      'appointments',
      'Rendez-vous',
      importance: Importance.high,
    ),
  ),
  uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
  matchDateTimeComponents: DateTimeComponents.time,
);
```

### Notifications Push (Firebase)

```dart
Types de push notifications :

1. Nouvelle alerte urgente (par groupe sanguin)
2. RDV confirmé par le centre
3. Nouveau code bonus disponible
4. Message du centre
5. Campagne de don

Payload exemple :

{
  "notification": {
    "title": "🚨 Alerte urgente",
    "body": "Besoin urgent de O- au CHU Lomé"
  },
  "data": {
    "type": "alert",
    "alertId": "abc123",
    "bloodType": "O-",
    "centerId": "1",
    "priority": "high"
  }
}

Gestion :

FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  if (message.data['type'] == 'alert') {
    // Afficher notification locale immédiatement
    _showLocalNotification(
      title: message.notification?.title ?? '',
      body: message.notification?.body ?? '',
    );
    
    // Si app en foreground : afficher dialog ou bottom sheet
    if (message.data['priority'] == 'high') {
      _showUrgentAlertDialog(message.data);
    }
  }
});
```

---

## 🧪 TESTS

### Tests Unitaires

```dart
// test/features/auth/data/repositories/auth_repository_test.dart

void main() {
  group('AuthRepository', () {
    test('login should return User when credentials are correct', () async {
      // Arrange
      final repository = MockAuthRepository();
      when(repository.login('test@example.com', 'password123'))
        .thenAnswer((_) async => User(id: '1', email: 'test@example.com'));
      
      // Act
      final result = await repository.login('test@example.com', 'password123');
      
      // Assert
      expect(result, isA<User>());
      expect(result.email, 'test@example.com');
    });
  });
}
```

### Tests d'Intégration

```dart
// integration_test/app_test.dart

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Complete flow: login → view centers → book appointment', 
    (WidgetTester tester) async {
    
    // Lance l'app
    await tester.pumpWidget(MyApp());
    
    // Test login
    await tester.enterText(find.byKey(Key('email_field')), 'test@example.com');
    await tester.enterText(find.byKey(Key('password_field')), 'password123');
    await tester.tap(find.byKey(Key('login_button')));
    await tester.pumpAndSettle();
    
    // Vérifie qu'on est sur Home
    expect(find.text('Accueil'), findsOneWidget);
    
    // Navigation vers Centres
    await tester.tap(find.text('Centres'));
    await tester.pumpAndSettle();
    
    // Vérifie la carte
    expect(find.byType(GoogleMap), findsOneWidget);
    
    // ... etc
  });
}
```

---

## 🚀 DÉPLOIEMENT

### Configuration Android

```gradle
// android/app/build.gradle

android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "tg.donsang.app"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}

dependencies {
    implementation 'com.google.android.gms:play-services-maps:18.2.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    implementation 'com.google.firebase:firebase-messaging:23.4.0'
}
```

### Permissions

```xml
<!-- android/app/src/main/AndroidManifest.xml -->

<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    
    <application>
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
        
        <!-- ... -->
    </application>
</manifest>
```

### Build et Release

```bash
# Build APK
flutter build apk --release

# Build App Bundle (pour Play Store)
flutter build appbundle --release

# Générer signing key
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias donsang

# Fichiers générés :
# build/app/outputs/flutter-apk/app-release.apk
# build/app/outputs/bundle/release/app-release.aab
```

---

## 📋 CHECKLIST DÉVELOPPEMENT

### Phase 1 : Setup (Jour 1)
```
□ Créer projet Flutter
□ Configurer architecture (dossiers)
□ Installer packages
□ Configurer Firebase
□ Configurer Google Maps API
□ Setup thème et couleurs
□ Setup navigation (go_router)
□ Setup state management (Riverpod)
```

### Phase 2 : Authentification (Jours 2-3)
```
□ Splash screen
□ Onboarding
□ Login
□ Register (3 étapes)
□ Forgot password
□ Gestion token JWT
□ Stockage sécurisé
```

### Phase 3 : Core Features (Jours 4-8)
```
□ Home/Dashboard
□ Bottom navigation
□ Carte interactive (15 centres)
□ Géolocalisation
□ Liste centres avec filtres
□ Détails centre
□ Navigation GPS
```

### Phase 4 : Rendez-vous (Jours 9-10)
```
□ Book appointment (3 étapes)
□ Calendrier
□ Sélection créneau
□ Confirmation
□ Liste RDV
□ Modification/Annulation
```

### Phase 5 : Alertes (Jours 11-12)
```
□ Liste alertes
□ Filtres
□ Détails alerte
□ Réponse alerte
□ Notifications push
□ Partage alerte
```

### Phase 6 : Récompenses (Jours 13-15)
```
□ Boutique (17+ récompenses)
□ Échange récompense
□ Mes échanges
□ Badges
□ Leaderboard
□ Animations
```

### Phase 7 : Parrainage (Jours 16-17)
```
□ Génération code
□ QR code
□ Partage
□ Utilisation code
□ Codes bonus
□ Historique parrainages
```

### Phase 8 : Profil (Jours 18-19)
```
□ Profil utilisateur
□ Édition profil
□ QR code permanent
□ Historique dons
□ Statistiques
□ Paramètres
```

### Phase 9 : Admin (Jour 20)
```
□ Dashboard admin
□ Gestion donneurs
□ Validation dons
□ Gestion RDV
□ Création alertes
```

### Phase 10 : Finalisation (Jours 21-25)
```
□ Mode hors-ligne
□ Notifications locales
□ Optimisation performances
□ Tests unitaires
□ Tests intégration
□ Corrections bugs
□ Documentation
□ Build release
```

---

## 🎯 RÉSUMÉ

**Tu dois créer** :
- ✅ 9 modules fonctionnels complets
- ✅ 30+ écrans
- ✅ 15 centres réels intégrés
- ✅ Géolocalisation temps réel
- ✅ 17+ récompenses
- ✅ Système parrainage complet
- ✅ QR codes permanents
- ✅ Notifications push et locales
- ✅ Mode hors-ligne partiel
- ✅ Interface admin

**Technologies clés** :
- Flutter 3.16+
- Riverpod (état)
- go_router (navigation)
- Google Maps / Flutter Map
- Firebase Messaging
- sqflite (cache local)
- QR Flutter
- Geolocator

**Timeline** : 25 jours pour app complète

**Priorités** :
1. Auth + Home (Jours 1-3)
2. Carte + Centres (Jours 4-8)
3. RDV + Alertes (Jours 9-12)
4. Récompenses + Parrainage (Jours 13-17)
5. Profil + Admin + Tests (Jours 18-25)

---

**Prêt à coder ! 🚀 Commence par le setup et l'authentification.**
