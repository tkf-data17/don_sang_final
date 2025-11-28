# Prompt Backend API - Application Don de Sang Togo

**Version** : 1.0  
**Date** : 27 Novembre 2025  
**Stack** : Node.js + Express + Supabase (ou PostgreSQL)

---

## 🎯 CONTEXTE DU PROJET

Tu es un développeur backend expert. Je veux que tu crées une API REST complète pour la plateforme de don de sang au Togo. L'API doit gérer l'authentification, les données des donneurs, les centres de collecte, les rendez-vous, les alertes urgentes, le système de récompenses et le parrainage.

**Mission** : Créer une API Node.js/Express robuste, sécurisée et scalable qui supporte à la fois l'application web (React) et mobile (Flutter).

---

## 📱 SPÉCIFICATIONS TECHNIQUES

### Stack Technologique

```yaml
Runtime: Node.js 20.x LTS
Framework: Express.js 4.18+
Base de données: PostgreSQL 15+ (via Supabase)
ORM: Prisma 5.0+ ou Supabase Client
Authentification: JWT (jsonwebtoken 9.0+)
Validation: Joi 17.0+ ou Zod 3.0+
Upload fichiers: Multer 1.4+
Email: Nodemailer 6.9+ ou SendGrid
SMS: Twilio ou AfricasTalking
Notifications Push: Firebase Admin SDK 12.0+
Cache: Redis 4.6+ (optionnel)
Tests: Jest 29.0+ + Supertest 6.3+
Documentation: Swagger/OpenAPI 3.0
Monitoring: Winston 3.11+ (logs)
Sécurité: Helmet 7.1+, express-rate-limit 7.1+
CORS: cors 2.8+
Env: dotenv 16.3+
```

### Architecture

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── firebase.js
│   │   ├── jwt.js
│   │   └── constants.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Center.js
│   │   ├── Appointment.js
│   │   ├── Alert.js
│   │   ├── Donation.js
│   │   ├── Reward.js
│   │   ├── RewardExchange.js
│   │   └── Referral.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── centerController.js
│   │   ├── appointmentController.js
│   │   ├── alertController.js
│   │   ├── rewardController.js
│   │   ├── referralController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── centers.js
│   │   ├── appointments.js
│   │   ├── alerts.js
│   │   ├── rewards.js
│   │   ├── referrals.js
│   │   └── admin.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   ├── notificationService.js
│   │   ├── qrCodeService.js
│   │   └── pointsService.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── errors.js
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── README.md
```

---

## 🗄️ SCHÉMA DE BASE DE DONNÉES

### Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ USERS ============

model User {
  id                String    @id @default(uuid())
  email             String    @unique
  password          String
  firstName         String
  lastName          String
  phone             String    @unique
  bloodType         BloodType
  dateOfBirth       DateTime
  gender            Gender
  weight            Float?
  city              String?
  region            Region?
  lat               Float?
  lng               Float?
  qrCode            String    @unique // Code permanent ex: "DNG-TG-00123456"
  points            Int       @default(0)
  role              Role      @default(DONOR)
  isEligible        Boolean   @default(true)
  lastDonation      DateTime?
  chronicDiseases   String[]  @default([])
  profilePicture    String?
  fcmToken          String?   // Pour notifications push
  emailVerified     Boolean   @default(false)
  phoneVerified     Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // Relations
  appointments      Appointment[]
  donations         Donation[]
  alertResponses    AlertResponse[]
  rewardExchanges   RewardExchange[]
  referralsGiven    Referral[]      @relation("Referrer")
  referralsReceived Referral[]      @relation("Referred")
  referralCodes     ReferralCode[]
  notifications     Notification[]
  
  @@index([email])
  @@index([bloodType])
  @@index([qrCode])
}

enum BloodType {
  A_POSITIVE
  A_NEGATIVE
  B_POSITIVE
  B_NEGATIVE
  AB_POSITIVE
  AB_NEGATIVE
  O_POSITIVE
  O_NEGATIVE
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum Region {
  MARITIME
  PLATEAUX
  CENTRALE
  KARA
  SAVANES
}

enum Role {
  DONOR
  ADMIN
  CENTER_STAFF
  SUPER_ADMIN
}

// ============ CENTERS ============

model Center {
  id          Int      @id @default(autoincrement())
  name        String
  city        String
  region      Region
  address     String
  phone       String
  hours       String
  lat         Float
  lng         Float
  type        CenterType
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  appointments Appointment[]
  donations    Donation[]
  alerts       Alert[]
  
  @@index([region])
  @@index([type])
}

enum CenterType {
  CHU
  CHR
  CENTRE
  MOBILE
}

// ============ APPOINTMENTS ============

model Appointment {
  id          String            @id @default(uuid())
  userId      String
  centerId    Int
  date        DateTime
  time        String            // "10:30"
  status      AppointmentStatus @default(PENDING)
  notes       String?
  cancelledAt DateTime?
  cancelReason String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  
  // Relations
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  center      Center  @relation(fields: [centerId], references: [id])
  
  @@index([userId])
  @@index([centerId])
  @@index([date])
  @@index([status])
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  NO_SHOW
}

// ============ DONATIONS ============

model Donation {
  id          String   @id @default(uuid())
  userId      String
  centerId    Int
  date        DateTime
  quantity    Int      @default(450) // en ml
  pointsEarned Int     @default(50)
  notes       String?
  isValidated Boolean  @default(false)
  validatedBy String?
  validatedAt DateTime?
  createdAt   DateTime @default(now())
  
  // Relations
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  center      Center  @relation(fields: [centerId], references: [id])
  
  @@index([userId])
  @@index([centerId])
  @@index([date])
}

// ============ ALERTS ============

model Alert {
  id          String      @id @default(uuid())
  bloodType   BloodType
  centerId    Int
  description String
  isCritical  Boolean     @default(false)
  isActive    Boolean     @default(true)
  closedAt    DateTime?
  createdBy   String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relations
  center      Center           @relation(fields: [centerId], references: [id])
  responses   AlertResponse[]
  
  @@index([bloodType])
  @@index([centerId])
  @@index([isActive])
  @@index([createdAt])
}

model AlertResponse {
  id        String   @id @default(uuid())
  alertId   String
  userId    String
  canDonate Boolean  @default(true)
  message   String?
  createdAt DateTime @default(now())
  
  // Relations
  alert     Alert @relation(fields: [alertId], references: [id], onDelete: Cascade)
  user      User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([alertId, userId]) // Un user ne peut répondre qu'une fois
  @@index([alertId])
  @@index([userId])
}

// ============ REWARDS ============

model Reward {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  points      Int
  category    String
  icon        String
  imageUrl    String?
  isAvailable Boolean  @default(true)
  stock       Int      @default(-1) // -1 = illimité
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  exchanges   RewardExchange[]
  
  @@index([category])
  @@index([isAvailable])
}

model RewardExchange {
  id         String    @id @default(uuid())
  userId     String
  rewardId   Int
  promoCode  String    @unique
  qrCode     String
  exchangedAt DateTime @default(now())
  usedAt     DateTime?
  expiresAt  DateTime
  isUsed     Boolean   @default(false)
  
  // Relations
  user       User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  reward     Reward @relation(fields: [rewardId], references: [id])
  
  @@index([userId])
  @@index([rewardId])
  @@index([isUsed])
}

// ============ REFERRAL ============

model ReferralCode {
  id          String    @id @default(uuid())
  code        String    @unique
  userId      String
  type        CodeType  @default(PERSONAL)
  points      Int       @default(50)
  maxUses     Int       @default(999)
  currentUses Int       @default(0)
  description String?
  isActive    Boolean   @default(true)
  expiresAt   DateTime?
  createdAt   DateTime  @default(now())
  
  // Relations
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  referrals   Referral[]
  
  @@index([code])
  @@index([userId])
}

enum CodeType {
  PERSONAL
  BONUS
  CAMPAIGN
}

model Referral {
  id           String        @id @default(uuid())
  referrerId   String
  referredId   String
  codeId       String
  pointsEarned Int           @default(50)
  isValidated  Boolean       @default(false) // true si le filleul a fait au moins 1 don
  validatedAt  DateTime?
  createdAt    DateTime      @default(now())
  
  // Relations
  referrer     User          @relation("Referrer", fields: [referrerId], references: [id], onDelete: Cascade)
  referred     User          @relation("Referred", fields: [referredId], references: [id], onDelete: Cascade)
  code         ReferralCode  @relation(fields: [codeId], references: [id])
  
  @@unique([referredId]) // Un user ne peut être parrainé qu'une fois
  @@index([referrerId])
  @@index([referredId])
}

// ============ NOTIFICATIONS ============

model Notification {
  id        String            @id @default(uuid())
  userId    String
  type      NotificationType
  title     String
  body      String
  data      Json?
  isRead    Boolean           @default(false)
  readAt    DateTime?
  createdAt DateTime          @default(now())
  
  // Relations
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
}

enum NotificationType {
  ALERT
  APPOINTMENT
  REWARD
  REFERRAL
  DONATION
  SYSTEM
}
```

### Données Initiales - 15 Centres du Togo

```javascript
// prisma/seed.js

const centers = [
  // LOMÉ - RÉGION MARITIME
  {
    name: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    region: 'MARITIME',
    address: 'Boulevard du 13 Janvier, Lomé',
    phone: '+228 22 21 25 01',
    hours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    lat: 6.1319,
    lng: 1.2223,
    type: 'CHU'
  },
  {
    name: 'CHU Campus (Tokoin)',
    city: 'Lomé',
    region: 'MARITIME',
    address: "Route d'Aného, Tokoin, Lomé",
    phone: '+228 22 25 58 42',
    hours: 'Lun-Sam: 7h30-18h',
    lat: 6.1633,
    lng: 1.2255,
    type: 'CHU'
  },
  {
    name: 'Centre National de Transfusion Sanguine (CNTS)',
    city: 'Lomé',
    region: 'MARITIME',
    address: 'Rue du Commerce, Lomé',
    phone: '+228 22 21 44 88',
    hours: 'Lun-Ven: 7h-19h, Sam-Dim: 8h-14h',
    lat: 6.1256,
    lng: 1.2116,
    type: 'CENTRE'
  },
  {
    name: 'Hôpital Régional de Tsévié',
    city: 'Tsévié',
    region: 'MARITIME',
    address: 'Route Nationale 1, Tsévié',
    phone: '+228 25 31 03 45',
    hours: 'Lun-Ven: 8h-16h',
    lat: 6.4264,
    lng: 1.2139,
    type: 'CENTRE'
  },
  {
    name: "Hôpital d'Aného",
    city: 'Aného',
    region: 'MARITIME',
    address: 'Centre-ville, Aného',
    phone: '+228 23 30 01 23',
    hours: 'Lun-Ven: 8h-15h',
    lat: 6.2311,
    lng: 1.5925,
    type: 'CENTRE'
  },
  
  // RÉGION PLATEAUX
  {
    name: 'CHR Atakpamé',
    city: 'Atakpamé',
    region: 'PLATEAUX',
    address: 'Route de Kpalimé, Atakpamé',
    phone: '+228 24 40 01 56',
    hours: 'Lun-Ven: 8h-16h',
    lat: 7.5333,
    lng: 1.1167,
    type: 'CHR'
  },
  {
    name: 'Hôpital de Kpalimé',
    city: 'Kpalimé',
    region: 'PLATEAUX',
    address: 'Avenue de la République, Kpalimé',
    phone: '+228 24 41 01 89',
    hours: 'Lun-Ven: 8h-16h, Sam: 8h-12h',
    lat: 6.9000,
    lng: 0.6333,
    type: 'CENTRE'
  },
  {
    name: 'Hôpital de Notse',
    city: 'Notse',
    region: 'PLATEAUX',
    address: 'Centre-ville, Notse',
    phone: '+228 24 50 01 34',
    hours: 'Lun-Ven: 8h-15h',
    lat: 6.9500,
    lng: 1.1667,
    type: 'CENTRE'
  },
  
  // RÉGION CENTRALE
  {
    name: 'CHR Sokodé',
    city: 'Sokodé',
    region: 'CENTRALE',
    address: 'Route de Bassar, Sokodé',
    phone: '+228 25 50 01 67',
    hours: 'Lun-Ven: 8h-17h',
    lat: 8.9833,
    lng: 1.1333,
    type: 'CHR'
  },
  {
    name: 'Hôpital de Tchamba',
    city: 'Tchamba',
    region: 'CENTRALE',
    address: 'Centre-ville, Tchamba',
    phone: '+228 25 55 01 23',
    hours: 'Lun-Ven: 8h-16h',
    lat: 9.0333,
    lng: 1.4167,
    type: 'CENTRE'
  },
  
  // RÉGION KARA
  {
    name: 'CHR Kara',
    city: 'Kara',
    region: 'KARA',
    address: 'Route Nationale 1, Kara',
    phone: '+228 26 60 01 45',
    hours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    lat: 9.5511,
    lng: 1.1864,
    type: 'CHR'
  },
  {
    name: 'Hôpital de Bassar',
    city: 'Bassar',
    region: 'KARA',
    address: 'Centre-ville, Bassar',
    phone: '+228 26 70 01 78',
    hours: 'Lun-Ven: 8h-16h',
    lat: 9.2500,
    lng: 0.7833,
    type: 'CENTRE'
  },
  
  // RÉGION SAVANES
  {
    name: 'CHR Dapaong',
    city: 'Dapaong',
    region: 'SAVANES',
    address: 'Route de Mango, Dapaong',
    phone: '+228 27 70 01 56',
    hours: 'Lun-Ven: 8h-17h',
    lat: 10.8667,
    lng: 0.2167,
    type: 'CHR'
  },
  {
    name: 'Hôpital de Mango',
    city: 'Mango',
    region: 'SAVANES',
    address: 'Centre-ville, Mango',
    phone: '+228 27 71 01 89',
    hours: 'Lun-Ven: 8h-16h',
    lat: 10.3583,
    lng: 0.4722,
    type: 'CENTRE'
  },
  {
    name: 'Unité Mobile Savanes',
    city: 'Dapaong',
    region: 'SAVANES',
    address: 'Variable selon campagne',
    phone: '+228 27 70 01 56',
    hours: 'Voir calendrier des campagnes',
    lat: 10.8667,
    lng: 0.2167,
    type: 'MOBILE'
  }
];

async function seed() {
  for (const center of centers) {
    await prisma.center.create({ data: center });
  }
  console.log('✅ 15 centres créés');
}
```

---

## 🔐 AUTHENTIFICATION

### Register

```javascript
// src/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateQRCode } = require('../utils/qrCode');

exports.register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName, phone,
      bloodType, dateOfBirth, gender, weight,
      city, region, lat, lng, chronicDiseases
    } = req.body;
    
    // Validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().pattern(/^\+228\d{8}$/).required(),
      bloodType: Joi.string().valid(
        'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE',
        'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE'
      ).required(),
      dateOfBirth: Joi.date().max('now').required(),
      gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
      // ... autres champs
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Vérifier si email ou téléphone existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email ou téléphone déjà utilisé' 
      });
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Générer QR code unique
    const qrCode = await generateUniqueQRCode();
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        bloodType,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        weight,
        city,
        region,
        lat,
        lng,
        chronicDiseases,
        qrCode,
        points: 0
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        bloodType: true,
        qrCode: true,
        points: true,
        role: true
      }
    });
    
    // Créer code de parrainage personnel
    await prisma.referralCode.create({
      data: {
        code: generateReferralCode(firstName, lastName),
        userId: user.id,
        type: 'PERSONAL',
        points: 50,
        maxUses: 999
      }
    });
    
    // Générer JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Envoyer email de bienvenue
    await sendWelcomeEmail(user.email, user.firstName);
    
    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user
    });
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

// Générer QR code unique
async function generateUniqueQRCode() {
  let qrCode;
  let exists = true;
  
  while (exists) {
    // Format : DNG-TG-00123456
    const number = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0');
    qrCode = `DNG-TG-${number}`;
    
    const existing = await prisma.user.findUnique({
      where: { qrCode }
    });
    
    exists = !!existing;
  }
  
  return qrCode;
}

// Générer code de parrainage
function generateReferralCode(firstName, lastName) {
  const base = `${firstName.substring(0, 3)}${lastName.substring(0, 3)}`
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100);
  return `${base}${year}${random}`;
}
```

### Login

```javascript
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email et mot de passe requis' 
      });
    }
    
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        bloodType: true,
        qrCode: true,
        points: true,
        role: true,
        isEligible: true,
        lastDonation: true
      }
    });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }
    
    // Vérifier mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect' 
      });
    }
    
    // Supprimer le password de la réponse
    delete user.password;
    
    // Générer JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Connexion réussie',
      token,
      user
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};
```

### Middleware Auth

```javascript
// src/middlewares/auth.js

const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant' });
    }
    
    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        bloodType: true,
        qrCode: true,
        points: true
      }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré' });
    }
    return res.status(401).json({ error: 'Token invalide' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Accès non autorisé' 
      });
    }
    next();
  };
};
```

---

## 📍 CENTRES DE COLLECTE

```javascript
// src/controllers/centerController.js

exports.getAllCenters = async (req, res) => {
  try {
    const { region, type, lat, lng, maxDistance } = req.query;
    
    let where = { isActive: true };
    
    // Filtres
    if (region) where.region = region;
    if (type) where.type = type;
    
    const centers = await prisma.center.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    
    // Si lat/lng fournis, calculer distances
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      
      centers.forEach(center => {
        center.distance = calculateDistance(
          userLat, userLng,
          center.lat, center.lng
        );
      });
      
      // Filtrer par distance max si spécifié
      if (maxDistance) {
        const max = parseFloat(maxDistance);
        centers = centers.filter(c => c.distance <= max);
      }
      
      // Trier par distance
      centers.sort((a, b) => a.distance - b.distance);
    }
    
    res.json(centers);
    
  } catch (error) {
    console.error('Get centers error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des centres' });
  }
};

exports.getCenterById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const center = await prisma.center.findUnique({
      where: { id: parseInt(id) },
      include: {
        appointments: {
          where: {
            date: {
              gte: new Date()
            },
            status: {
              in: ['PENDING', 'CONFIRMED']
            }
          },
          select: {
            date: true,
            time: true
          }
        }
      }
    });
    
    if (!center) {
      return res.status(404).json({ error: 'Centre non trouvé' });
    }
    
    res.json(center);
    
  } catch (error) {
    console.error('Get center error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du centre' });
  }
};

// Formule Haversine pour calculer distance
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
```

---

## 📅 RENDEZ-VOUS

```javascript
// src/controllers/appointmentController.js

exports.createAppointment = async (req, res) => {
  try {
    const { centerId, date, time } = req.body;
    const userId = req.user.id;
    
    // Validation
    const schema = Joi.object({
      centerId: Joi.number().required(),
      date: Joi.date().min('now').required(),
      time: Joi.string().pattern(/^\d{2}:\d{2}$/).required()
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Vérifier centre existe
    const center = await prisma.center.findUnique({
      where: { id: centerId }
    });
    
    if (!center) {
      return res.status(404).json({ error: 'Centre non trouvé' });
    }
    
    // Vérifier éligibilité utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastDonation: true, isEligible: true }
    });
    
    if (!user.isEligible) {
      return res.status(400).json({ 
        error: 'Vous n\'êtes pas éligible au don actuellement' 
      });
    }
    
    // Vérifier 56 jours depuis dernier don
    if (user.lastDonation) {
      const daysSinceLastDonation = Math.floor(
        (new Date() - new Date(user.lastDonation)) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastDonation < 56) {
        return res.status(400).json({ 
          error: `Vous devez attendre ${56 - daysSinceLastDonation} jours avant de donner à nouveau` 
        });
      }
    }
    
    // Vérifier disponibilité créneau
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        centerId,
        date: new Date(date),
        time,
        status: { in: ['PENDING', 'CONFIRMED'] }
      }
    });
    
    if (existingAppointment) {
      return res.status(409).json({ 
        error: 'Ce créneau n\'est plus disponible' 
      });
    }
    
    // Créer le RDV
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        centerId,
        date: new Date(date),
        time,
        status: 'PENDING'
      },
      include: {
        center: true
      }
    });
    
    // Envoyer notification
    await sendAppointmentConfirmation(user, appointment);
    
    // Créer notification in-app
    await prisma.notification.create({
      data: {
        userId,
        type: 'APPOINTMENT',
        title: 'Rendez-vous confirmé',
        body: `Votre RDV au ${center.name} est confirmé pour le ${formatDate(date)} à ${time}`,
        data: { appointmentId: appointment.id }
      }
    });
    
    res.status(201).json({
      message: 'Rendez-vous créé avec succès',
      appointment
    });
    
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, upcoming } = req.query;
    
    let where = { userId };
    
    if (status) {
      where.status = status;
    }
    
    if (upcoming === 'true') {
      where.date = { gte: new Date() };
      where.status = { in: ['PENDING', 'CONFIRMED'] };
    }
    
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        center: true
      },
      orderBy: { date: 'desc' }
    });
    
    res.json(appointments);
    
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;
    
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });
    
    if (!appointment) {
      return res.status(404).json({ error: 'Rendez-vous non trouvé' });
    }
    
    if (appointment.userId !== userId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    
    if (appointment.status !== 'PENDING' && appointment.status !== 'CONFIRMED') {
      return res.status(400).json({ 
        error: 'Ce rendez-vous ne peut pas être annulé' 
      });
    }
    
    // Vérifier que le RDV est dans plus de 24h
    const hoursUntilAppointment = 
      (new Date(appointment.date) - new Date()) / (1000 * 60 * 60);
    
    if (hoursUntilAppointment < 24) {
      return res.status(400).json({ 
        error: 'Vous ne pouvez pas annuler un rendez-vous moins de 24h avant' 
      });
    }
    
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason
      }
    });
    
    res.json({
      message: 'Rendez-vous annulé',
      appointment: updatedAppointment
    });
    
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'annulation' });
  }
};
```

---

## 🚨 ALERTES URGENTES

```javascript
// src/controllers/alertController.js

exports.getAlerts = async (req, res) => {
  try {
    const { bloodType, region, active } = req.query;
    
    let where = {};
    
    if (bloodType) where.bloodType = bloodType;
    if (active !== undefined) where.isActive = active === 'true';
    
    // Filtrer par région via le centre
    if (region) {
      where.center = {
        region
      };
    }
    
    const alerts = await prisma.alert.findMany({
      where,
      include: {
        center: true,
        responses: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Ajouter responseCount et hasResponded
    const userId = req.user?.id;
    const enrichedAlerts = alerts.map(alert => ({
      ...alert,
      responseCount: alert.responses.length,
      hasResponded: userId ? alert.responses.some(r => r.userId === userId) : false,
      responses: undefined // Retirer le détail
    }));
    
    res.json(enrichedAlerts);
    
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des alertes' });
  }
};

exports.respondToAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { canDonate, message } = req.body;
    const userId = req.user.id;
    
    const alert = await prisma.alert.findUnique({
      where: { id },
      include: { center: true }
    });
    
    if (!alert) {
      return res.status(404).json({ error: 'Alerte non trouvée' });
    }
    
    if (!alert.isActive) {
      return res.status(400).json({ error: 'Cette alerte est close' });
    }
    
    // Vérifier si déjà répondu
    const existingResponse = await prisma.alertResponse.findUnique({
      where: {
        alertId_userId: {
          alertId: id,
          userId
        }
      }
    });
    
    if (existingResponse) {
      return res.status(409).json({ 
        error: 'Vous avez déjà répondu à cette alerte' 
      });
    }
    
    // Créer la réponse
    const response = await prisma.alertResponse.create({
      data: {
        alertId: id,
        userId,
        canDonate: canDonate !== false,
        message
      }
    });
    
    // Notifier le centre
    await notifyCenterOfResponse(alert, req.user);
    
    // Créer notification in-app
    await prisma.notification.create({
      data: {
        userId,
        type: 'ALERT',
        title: 'Réponse enregistrée',
        body: `Le centre ${alert.center.name} a été notifié. Merci !`,
        data: { alertId: id }
      }
    });
    
    res.status(201).json({
      message: 'Réponse enregistrée. Le centre vous contactera.',
      response
    });
    
  } catch (error) {
    console.error('Respond to alert error:', error);
    res.status(500).json({ error: 'Erreur lors de la réponse' });
  }
};

exports.createAlert = async (req, res) => {
  try {
    // Seulement admin
    const { bloodType, centerId, description, isCritical } = req.body;
    const createdBy = req.user.id;
    
    const alert = await prisma.alert.create({
      data: {
        bloodType,
        centerId,
        description,
        isCritical: isCritical || false,
        createdBy
      },
      include: {
        center: true
      }
    });
    
    // Envoyer notifications push aux donneurs du groupe sanguin
    await sendAlertNotifications(alert);
    
    res.status(201).json({
      message: 'Alerte créée',
      alert
    });
    
  } catch (error) {
    console.error('Create alert error:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'alerte' });
  }
};

// Service de notification push
async function sendAlertNotifications(alert) {
  // Trouver tous les users avec ce groupe sanguin et un fcmToken
  const users = await prisma.user.findMany({
    where: {
      bloodType: alert.bloodType,
      fcmToken: { not: null }
    },
    select: {
      fcmToken: true
    }
  });
  
  const tokens = users.map(u => u.fcmToken);
  
  if (tokens.length === 0) return;
  
  const message = {
    notification: {
      title: alert.isCritical ? '🚨 ALERTE URGENTE' : '🩸 Besoin de sang',
      body: `Besoin de ${alert.bloodType.replace('_', '')} au ${alert.center.name}`
    },
    data: {
      type: 'alert',
      alertId: alert.id,
      bloodType: alert.bloodType,
      centerId: alert.centerId.toString(),
      priority: alert.isCritical ? 'high' : 'normal'
    },
    tokens
  };
  
  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log(`${response.successCount} notifications envoyées`);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}
```

---

## 🎁 RÉCOMPENSES

```javascript
// src/controllers/rewardController.js

exports.getAllRewards = async (req, res) => {
  try {
    const { category, available } = req.query;
    
    let where = {};
    if (category) where.category = category;
    if (available !== undefined) where.isAvailable = available === 'true';
    
    const rewards = await prisma.reward.findMany({
      where,
      orderBy: { points: 'asc' }
    });
    
    res.json(rewards);
    
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des récompenses' });
  }
};

exports.exchangeReward = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const reward = await prisma.reward.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!reward) {
      return res.status(404).json({ error: 'Récompense non trouvée' });
    }
    
    if (!reward.isAvailable) {
      return res.status(400).json({ error: 'Récompense non disponible' });
    }
    
    if (reward.stock === 0) {
      return res.status(400).json({ error: 'Stock épuisé' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });
    
    if (user.points < reward.points) {
      return res.status(400).json({ 
        error: `Pas assez de points. Il vous manque ${reward.points - user.points} points.` 
      });
    }
    
    // Transaction
    const [exchange, updatedUser, updatedReward] = await prisma.$transaction([
      // Créer l'échange
      prisma.rewardExchange.create({
        data: {
          userId,
          rewardId: reward.id,
          promoCode: generatePromoCode(),
          qrCode: generateQRCodeData(),
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 jours
        }
      }),
      // Déduire les points
      prisma.user.update({
        where: { id: userId },
        data: {
          points: { decrement: reward.points }
        }
      }),
      // Décrémenter le stock
      prisma.reward.update({
        where: { id: reward.id },
        data: {
          stock: reward.stock > 0 ? { decrement: 1 } : reward.stock
        }
      })
    ]);
    
    // Notification
    await prisma.notification.create({
      data: {
        userId,
        type: 'REWARD',
        title: 'Récompense échangée ! 🎉',
        body: `Vous avez échangé ${reward.name}`,
        data: { exchangeId: exchange.id }
      }
    });
    
    res.status(201).json({
      message: 'Récompense échangée avec succès',
      exchange: {
        ...exchange,
        reward
      },
      newPoints: updatedUser.points
    });
    
  } catch (error) {
    console.error('Exchange reward error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'échange' });
  }
};

exports.getMyExchanges = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const exchanges = await prisma.rewardExchange.findMany({
      where: { userId },
      include: {
        reward: true
      },
      orderBy: { exchangedAt: 'desc' }
    });
    
    res.json(exchanges);
    
  } catch (error) {
    console.error('Get exchanges error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};

function generatePromoCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
```

---

## 🤝 PARRAINAGE

```javascript
// src/controllers/referralController.js

exports.getMyCode = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const code = await prisma.referralCode.findFirst({
      where: {
        userId,
        type: 'PERSONAL'
      }
    });
    
    if (!code) {
      return res.status(404).json({ error: 'Code non trouvé' });
    }
    
    // Stats
    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId }
    });
    
    const stats = {
      totalReferrals: referrals.length,
      completedReferrals: referrals.filter(r => r.isValidated).length,
      totalPointsEarned: referrals.reduce((sum, r) => sum + r.pointsEarned, 0),
      rank: await getUserReferralRank(userId)
    };
    
    res.json({
      code,
      stats
    });
    
  } catch (error) {
    console.error('Get my code error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};

exports.useCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;
    
    // Vérifier code existe
    const referralCode = await prisma.referralCode.findUnique({
      where: { code: code.toUpperCase() }
    });
    
    if (!referralCode) {
      return res.status(404).json({ error: 'Code invalide' });
    }
    
    // Vérifications
    if (!referralCode.isActive) {
      return res.status(400).json({ error: 'Code désactivé' });
    }
    
    if (referralCode.expiresAt && new Date() > referralCode.expiresAt) {
      return res.status(400).json({ error: 'Code expiré' });
    }
    
    if (referralCode.currentUses >= referralCode.maxUses) {
      return res.status(400).json({ error: 'Limite d\'utilisation atteinte' });
    }
    
    if (referralCode.userId === userId) {
      return res.status(400).json({ error: 'Vous ne pouvez pas utiliser votre propre code' });
    }
    
    // Vérifier si déjà parrainé
    const existingReferral = await prisma.referral.findUnique({
      where: { referredId: userId }
    });
    
    if (existingReferral) {
      return res.status(409).json({ error: 'Vous avez déjà été parrainé' });
    }
    
    // Transaction
    const [referral, updatedCode, updatedUser] = await prisma.$transaction([
      // Créer le parrainage
      prisma.referral.create({
        data: {
          referrerId: referralCode.userId,
          referredId: userId,
          codeId: referralCode.id,
          pointsEarned: referralCode.points
        }
      }),
      // Incrémenter utilisation
      prisma.referralCode.update({
        where: { id: referralCode.id },
        data: { currentUses: { increment: 1 } }
      }),
      // Ajouter points au filleul
      prisma.user.update({
        where: { id: userId },
        data: { points: { increment: referralCode.points } }
      })
    ]);
    
    // Notification au parrain
    await prisma.notification.create({
      data: {
        userId: referralCode.userId,
        type: 'REFERRAL',
        title: 'Nouveau filleul ! 🎉',
        body: `Quelqu'un a utilisé ton code ${code}`,
        data: { referralId: referral.id }
      }
    });
    
    res.status(201).json({
      message: `Code validé ! +${referralCode.points} points gagnés`,
      pointsEarned: referralCode.points,
      newTotalPoints: updatedUser.points
    });
    
  } catch (error) {
    console.error('Use code error:', error);
    res.status(500).json({ error: 'Erreur lors de la validation' });
  }
};

exports.createBonusCode = async (req, res) => {
  try {
    const { points, maxUses, description, expiresAt } = req.body;
    const userId = req.user.id;
    
    // Générer code unique
    let code;
    let exists = true;
    while (exists) {
      code = generateRandomCode();
      const existing = await prisma.referralCode.findUnique({
        where: { code }
      });
      exists = !!existing;
    }
    
    const bonusCode = await prisma.referralCode.create({
      data: {
        code,
        userId,
        type: 'BONUS',
        points,
        maxUses,
        description,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });
    
    res.status(201).json({
      message: 'Code créé',
      code: bonusCode
    });
    
  } catch (error) {
    console.error('Create bonus code error:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

function generateRandomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
```

---

## 👤 PROFIL & DONS

```javascript
// src/controllers/userController.js

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        bloodType: true,
        dateOfBirth: true,
        gender: true,
        weight: true,
        city: true,
        region: true,
        qrCode: true,
        points: true,
        role: true,
        isEligible: true,
        lastDonation: true,
        chronicDiseases: true,
        profilePicture: true,
        createdAt: true
      }
    });
    
    // Stats
    const donationsCount = await prisma.donation.count({
      where: { userId }
    });
    
    const nextDonationDate = user.lastDonation 
      ? new Date(user.lastDonation.getTime() + 56 * 24 * 60 * 60 * 1000)
      : new Date();
    
    res.json({
      ...user,
      stats: {
        totalDonations: donationsCount,
        livesSaved: donationsCount * 3, // 1 don = 3 vies sauvées
        nextDonationDate,
        daysUntilNextDonation: Math.max(0, Math.ceil(
          (nextDonationDate - new Date()) / (1000 * 60 * 60 * 24)
        ))
      }
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone, weight, city, region } = req.body;
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone,
        weight,
        city,
        region
      }
    });
    
    res.json({
      message: 'Profil mis à jour',
      user
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

exports.getDonationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const donations = await prisma.donation.findMany({
      where: { userId },
      include: {
        center: {
          select: {
            name: true,
            city: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });
    
    res.json(donations);
    
  } catch (error) {
    console.error('Get donation history error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};
```

---

## 👨‍💼 ADMIN

```javascript
// src/controllers/adminController.js

exports.validateDonation = async (req, res) => {
  try {
    const { userId, centerId, date, quantity, points } = req.body;
    const validatedBy = req.user.id;
    
    // Créer le don
    const donation = await prisma.donation.create({
      data: {
        userId,
        centerId,
        date: new Date(date),
        quantity: quantity || 450,
        pointsEarned: points || 50,
        isValidated: true,
        validatedBy,
        validatedAt: new Date()
      }
    });
    
    // Mettre à jour user
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastDonation: new Date(date),
        points: { increment: points || 50 }
      }
    });
    
    // Vérifier si parrainage à valider
    const referral = await prisma.referral.findUnique({
      where: { referredId: userId }
    });
    
    if (referral && !referral.isValidated) {
      // Valider le parrainage et donner points au parrain
      await prisma.$transaction([
        prisma.referral.update({
          where: { id: referral.id },
          data: {
            isValidated: true,
            validatedAt: new Date()
          }
        }),
        prisma.user.update({
          where: { id: referral.referrerId },
          data: {
            points: { increment: referral.pointsEarned }
          }
        })
      ]);
      
      // Notifier le parrain
      await prisma.notification.create({
        data: {
          userId: referral.referrerId,
          type: 'REFERRAL',
          title: 'Parrainage validé ! 🎉',
          body: `Ton filleul a fait son premier don. +${referral.pointsEarned} points !`,
          data: { referralId: referral.id }
        }
      });
    }
    
    // Notification au donneur
    await prisma.notification.create({
      data: {
        userId,
        type: 'DONATION',
        title: 'Don validé ! ❤️',
        body: `Ton don a été enregistré. +${points || 50} points !`,
        data: { donationId: donation.id }
      }
    });
    
    res.status(201).json({
      message: 'Don validé',
      donation
    });
    
  } catch (error) {
    console.error('Validate donation error:', error);
    res.status(500).json({ error: 'Erreur lors de la validation' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDonations,
      activeAlerts,
      totalExchanges
    ] = await Promise.all([
      prisma.user.count(),
      prisma.donation.count(),
      prisma.alert.count({ where: { isActive: true } }),
      prisma.rewardExchange.count()
    ]);
    
    // Dons ce mois
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const donationsThisMonth = await prisma.donation.count({
      where: {
        date: { gte: firstDayOfMonth }
      }
    });
    
    res.json({
      totalUsers,
      totalDonations,
      donationsThisMonth,
      activeAlerts,
      totalExchanges
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};
```

---

## 🔔 NOTIFICATIONS

```javascript
// src/services/notificationService.js

const admin = require('firebase-admin');

// Initialiser Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

exports.sendPushNotification = async (userId, notification) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true }
    });
    
    if (!user || !user.fcmToken) {
      return;
    }
    
    const message = {
      notification: {
        title: notification.title,
        body: notification.body
      },
      data: notification.data || {},
      token: user.fcmToken
    };
    
    await admin.messaging().send(message);
    
  } catch (error) {
    console.error('Send push notification error:', error);
  }
};

exports.sendMultiplePushNotifications = async (userIds, notification) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
        fcmToken: { not: null }
      },
      select: { fcmToken: true }
    });
    
    const tokens = users.map(u => u.fcmToken);
    
    if (tokens.length === 0) return;
    
    const message = {
      notification: {
        title: notification.title,
        body: notification.body
      },
      data: notification.data || {},
      tokens
    };
    
    const response = await admin.messaging().sendMulticast(message);
    console.log(`${response.successCount} notifications envoyées`);
    
  } catch (error) {
    console.error('Send multiple push notifications error:', error);
  }
};
```

---

## 🚀 APP.JS & SERVER.JS

```javascript
// src/app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const centerRoutes = require('./routes/centers');
const appointmentRoutes = require('./routes/appointments');
const alertRoutes = require('./routes/alerts');
const rewardRoutes = require('./routes/rewards');
const referralRoutes = require('./routes/referrals');
const adminRoutes = require('./routes/admin');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes
});
app.use('/api/', limiter);

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'API Don de Sang Togo' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
```

```javascript
// src/server.js

require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
});
```

---

## 📋 VARIABLES D'ENVIRONNEMENT

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/donsang_togo"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Firebase
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-project.iam.gserviceaccount.com"

# Email (SendGrid ou autre)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@donsang-togo.com"

# SMS (Twilio ou AfricasTalking)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Google Maps (si géocodage)
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Server
PORT=3000
NODE_ENV="development"
```

---

## ✅ CHECKLIST DÉVELOPPEMENT

```
□ Setup projet Node.js + Express
□ Configuration Prisma + PostgreSQL
□ Seed 15 centres
□ Authentification (register, login, JWT)
□ Middleware auth
□ Routes centres
□ Routes rendez-vous
□ Routes alertes
□ Routes récompenses
□ Routes parrainage
□ Routes profil
□ Routes admin
□ Notifications push (Firebase)
□ Services email/SMS
□ Upload images profil
□ Génération QR codes
□ Tests unitaires
□ Tests intégration
□ Documentation Swagger
□ Sécurité (helmet, rate limit)
□ Logs (Winston)
□ Déploiement (Railway/Render/Heroku)
```

---

**API complète prête à être codée ! 🚀 Commence par le setup et l'authentification.**
