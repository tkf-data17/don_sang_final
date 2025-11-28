# 🤝 Guide de Contribution - Don de Sang Togo

Merci de votre intérêt pour contribuer à Don de Sang Togo ! Ce projet sauve des vies et chaque contribution compte. 💙🩸

---

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Types de Contributions](#types-de-contributions)
- [Workflow de Développement](#workflow-de-développement)
- [Standards de Code](#standards-de-code)
- [Soumettre une Pull Request](#soumettre-une-pull-request)
- [Communauté](#communauté)

---

## 📜 Code de Conduite

### Notre Engagement

Nous nous engageons à faire de la participation à ce projet une expérience exempte de harcèlement pour tout le monde, quel que soit :
- L'âge
- La taille corporelle
- Le handicap
- L'ethnicité
- L'identité et l'expression de genre
- Le niveau d'expérience
- La nationalité
- L'apparence personnelle
- La race
- La religion
- L'identité et l'orientation sexuelles

### Comportements Attendus

- ✅ Utiliser un langage accueillant et inclusif
- ✅ Respecter les points de vue et expériences différents
- ✅ Accepter gracieusement les critiques constructives
- ✅ Se concentrer sur ce qui est meilleur pour la communauté
- ✅ Faire preuve d'empathie envers les autres membres

### Comportements Inacceptables

- ❌ Langage ou imagerie sexualisés
- ❌ Commentaires insultants ou désobligeants
- ❌ Harcèlement public ou privé
- ❌ Publication d'informations privées sans permission
- ❌ Tout autre comportement inapproprié dans un cadre professionnel

---

## 🚀 Comment Contribuer

### Pour les Débutants

Pas d'expérience dans l'open source ? Pas de problème !

1. **Familiarisez-vous avec le projet**
   - Lisez le [README.md](/README.md)
   - Explorez la [documentation](/docs)
   - Testez l'application

2. **Trouvez une issue adaptée**
   - Cherchez les labels `good first issue` ou `help wanted`
   - Lisez attentivement la description
   - Commentez pour dire que vous travaillez dessus

3. **Posez des questions**
   - N'hésitez pas à demander de l'aide
   - Utilisez les commentaires des issues
   - Contactez les mainteneurs

---

## 🎯 Types de Contributions

### 1. 🐛 Signaler un Bug

**Avant de signaler :**
- [ ] Vérifiez que le bug n'a pas déjà été signalé
- [ ] Testez avec la dernière version
- [ ] Collectez les informations nécessaires

**Template de Bug Report :**

```markdown
## Description du Bug
Description claire et concise du problème

## Reproduction
Étapes pour reproduire :
1. Aller à '...'
2. Cliquer sur '...'
3. Descendre jusqu'à '...'
4. Voir l'erreur

## Comportement Attendu
Ce qui devrait se passer

## Comportement Actuel
Ce qui se passe réellement

## Captures d'Écran
Si applicable, ajoutez des captures d'écran

## Environnement
- Appareil : [ex. iPhone 12, Samsung Galaxy]
- OS : [ex. iOS 15, Android 12]
- Navigateur : [ex. Chrome 96, Safari 15]
- Version de l'app : [ex. 1.0.0]

## Informations Additionnelles
Tout autre contexte pertinent
```

### 2. ✨ Proposer une Fonctionnalité

**Avant de proposer :**
- [ ] Vérifiez que la fonctionnalité n'existe pas déjà
- [ ] Assurez-vous qu'elle correspond à la mission du projet
- [ ] Réfléchissez à l'impact sur les utilisateurs

**Template de Feature Request :**

```markdown
## Problème à Résoudre
Quel problème cette fonctionnalité résout-elle ?

## Solution Proposée
Description claire de ce que vous voulez

## Alternatives Considérées
Autres solutions envisagées

## Contexte Additionnel
Screenshots, mockups, exemples d'autres apps

## Impact
- Donneurs : [bénéfice pour les donneurs]
- Centres : [bénéfice pour les centres]
- Système : [bénéfice global]
```

### 3. 💻 Contribuer au Code

**Domaines de contribution :**

#### Frontend
- 🎨 Amélioration UI/UX
- ♿ Accessibilité
- 📱 Responsive design
- ⚡ Performance
- 🌐 Internationalisation

#### Backend
- 🔐 Sécurité
- 📊 Base de données
- 🔌 API
- 🔄 Synchronisation
- 📧 Notifications

#### Fonctionnalités
- 🎯 Système QR Code
- 🏆 Gamification
- 📍 Géolocalisation
- 🚨 Alertes
- 📊 Analytics

### 4. 📚 Documentation

- Corriger des fautes de frappe
- Améliorer les explications
- Ajouter des exemples
- Traduire en langues locales (Ewe, Kabyè)
- Créer des tutoriels

### 5. 🎨 Design

- Mockups et wireframes
- Icônes et illustrations
- Guide de style
- Prototypes interactifs
- Assets graphiques

### 6. 🌍 Traduction

Langues prioritaires :
- Français ✅
- Ewe 🔜
- Kabyè 🔜
- Anglais 🔜

---

## 🔄 Workflow de Développement

### 1. Fork & Clone

```bash
# Fork le repo sur GitHub
# Puis clonez votre fork

git clone https://github.com/VOTRE-USERNAME/don-sang-togo.git
cd don-sang-togo

# Ajoutez le repo original comme remote
git remote add upstream https://github.com/don-sang-togo/app.git
```

### 2. Créer une Branche

```bash
# Récupérez les dernières modifications
git checkout main
git pull upstream main

# Créez votre branche
git checkout -b feature/ma-super-fonctionnalite
# OU
git checkout -b fix/correction-bug
```

**Nommage des branches :**
- `feature/` - Nouvelles fonctionnalités
- `fix/` - Corrections de bugs
- `docs/` - Documentation
- `refactor/` - Refactoring
- `test/` - Tests
- `style/` - Améliorations UI/UX

### 3. Développer

```bash
# Installez les dépendances
npm install

# Lancez le serveur de dev
npm run dev

# Faites vos modifications
# Testez localement
```

### 4. Commit

```bash
# Ajoutez vos fichiers
git add .

# Commitez avec un message clair
git commit -m "feat(qrcode): add download functionality

- Add download button to QR code modal
- Implement PNG export
- Add success toast notification

Closes #123"
```

**Format des commits :**

```
type(scope): description courte

Description détaillée (optionnel)
- Point 1
- Point 2

Closes #issue-number
```

**Types de commits :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, CSS
- `refactor`: Refactoring sans changement de comportement
- `test`: Ajout/modification de tests
- `chore`: Maintenance, config

### 5. Push

```bash
# Pushez votre branche
git push origin feature/ma-super-fonctionnalite
```

### 6. Pull Request

1. Allez sur GitHub
2. Cliquez sur "New Pull Request"
3. Sélectionnez votre branche
4. Remplissez le template (voir ci-dessous)
5. Attendez la review

---

## 📝 Standards de Code

### TypeScript

```typescript
// ✅ BON
interface DonorData {
  id: string;
  name: string;
  bloodType: BloodType;
}

export function validateDonor(donor: DonorData): boolean {
  // Implementation
}

// ❌ MAUVAIS
function validateDonor(donor: any) {
  // ...
}
```

### React Components

```typescript
// ✅ BON - Composant fonctionnel, props typées, exporté
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      aria-label={label}
    >
      {label}
    </button>
  );
}

// ❌ MAUVAIS - Pas de types, pas d'accessibilité
export const Button = (props) => (
  <button onClick={props.onClick}>{props.label}</button>
);
```

### Tailwind CSS

```typescript
// ✅ BON - Classes utilitaires, responsive
<div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md md:flex-row lg:p-6">
  {/* Content */}
</div>

// ❌ MAUVAIS - Styles inline
<div style={{ display: 'flex', padding: '16px', backgroundColor: 'white' }}>
  {/* Content */}
</div>
```

### Accessibilité

```typescript
// ✅ BON - Sémantique, ARIA, keyboard
<button
  onClick={handleClick}
  aria-label="Fermer le modal"
  disabled={loading}
>
  <X className="w-5 h-5" aria-hidden="true" />
</button>

<input
  type="text"
  id="name"
  aria-label="Nom complet"
  aria-required="true"
/>

// ❌ MAUVAIS - Div cliquable, pas d'ARIA
<div onClick={handleClick}>
  <X />
</div>
```

---

## 🔍 Soumettre une Pull Request

### Template de PR

```markdown
## 📝 Description
Brève description de ce que fait cette PR

Closes #issue-number

## 🎯 Type de Changement
- [ ] 🐛 Bug fix (changement non-breaking qui corrige un bug)
- [ ] ✨ Nouvelle fonctionnalité (changement non-breaking qui ajoute une fonctionnalité)
- [ ] 💥 Breaking change (fix ou feature qui causerait un breaking change)
- [ ] 📚 Documentation
- [ ] 🎨 Style (formatage, renommage)
- [ ] ♻️ Refactoring
- [ ] ✅ Tests

## 🧪 Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests d'intégration ajoutés/mis à jour
- [ ] Tests manuels effectués
- [ ] Testé sur mobile (iOS/Android)
- [ ] Testé sur desktop

## 📸 Captures d'Écran
Si applicable, ajoutez des captures d'écran

## ✅ Checklist
- [ ] Mon code suit les conventions du projet
- [ ] J'ai commenté mon code dans les zones complexes
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai testé en responsive
- [ ] J'ai vérifié l'accessibilité (ARIA, keyboard)
- [ ] Les tests passent localement
- [ ] J'ai mis à jour le CHANGELOG.md

## 🔗 Issues Reliées
Liste les issues reliées : #123, #456

## 📝 Notes Additionnelles
Informations supplémentaires pour les reviewers
```

### Processus de Review

1. **Soumission** - Vous créez la PR
2. **CI/CD** - Tests automatiques lancés
3. **Review** - Un mainteneur review votre code
4. **Modifications** - Si nécessaire, vous faites des ajustements
5. **Approbation** - PR approuvée ✅
6. **Merge** - PR mergée dans `main`
7. **Déploiement** - Changements déployés

### Critères d'Acceptation

- ✅ Code respecte les conventions
- ✅ Tests passent
- ✅ Documentation à jour
- ✅ Pas de régression
- ✅ Accessible
- ✅ Performant
- ✅ Sécurisé

---

## 🎯 Priorités Actuelles

### High Priority 🔴
- [ ] Intégration Supabase complète
- [ ] Scan QR Code réel (caméra)
- [ ] Notifications push
- [ ] Mode hors ligne

### Medium Priority 🟡
- [ ] Tests unitaires
- [ ] Programme de parrainage
- [ ] Traduction Ewe/Kabyè
- [ ] Amélioration UI/UX

### Low Priority 🟢
- [ ] Thème sombre
- [ ] Widgets
- [ ] Statistiques avancées
- [ ] Intégration réseaux sociaux

---

## 💬 Communauté

### Où Obtenir de l'Aide

- 📧 **Email :** dev@donsang-togo.org
- 💬 **Slack :** #dev-general
- 🐛 **Issues :** [GitHub Issues](https://github.com/don-sang-togo/app/issues)
- 📚 **Docs :** [Documentation complète](/docs)

### Rencontres Communautaires

- **Daily Standup :** Lun-Ven 9h30 (GMT)
- **Weekly Sync :** Vendredi 14h (GMT)
- **Monthly Review :** Premier lundi du mois

### Ressources

- [Guide Développeur](/DEVELOPER_GUIDE.md)
- [Guide de Déploiement](/DEPLOYMENT.md)
- [Documentation API](/docs/API.md)
- [Figma Design System](https://figma.com/...)

---

## 🏆 Reconnaissance

### Contributeurs

Tous les contributeurs seront :
- ✅ Mentionnés dans le README
- ✅ Ajoutés au fichier CONTRIBUTORS.md
- ✅ Reconnus dans les release notes
- ✅ Invités aux événements spéciaux

### Top Contributeurs

Les contributeurs les plus actifs recevront :
- 🏅 Badge "Top Contributor"
- 👕 Goodies exclusifs
- 🎫 Invitation aux événements
- 💼 Recommandations LinkedIn

---

## 📄 Licence

En contribuant à Don de Sang Togo, vous acceptez que vos contributions soient licenciées sous la même licence que le projet.

---

## 🙏 Merci !

Merci de contribuer à sauver des vies ! Chaque ligne de code, chaque bug report, chaque suggestion compte.

**Ensemble, faisons la différence ! 💙🩸**

---

**Questions ?** Contactez-nous à dev@donsang-togo.org

**Version :** 1.0  
**Dernière mise à jour :** 27 Novembre 2025
