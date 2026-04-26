# Testez et améliorez une application full-stack

## Présentation

Ce projet est une application full-stack Angular + Spring Boot permettant la gestion de sessions de yoga. Il met l'accent sur la qualité logicielle, la couverture de tests (unitaires, intégration, E2E) et la documentation.

---

## Installation

### Prérequis
- Node.js (>= 18)
- npm (>= 9)
- Java 17+
- Maven 3.8+

### Installation du front
```bash
cd front
npm install
```

### Installation du back
```bash
cd back
mvn clean install
```

---

## Lancement de l'application

### Frontend (Angular)
```bash
cd front
npm start
```
Accès : http://localhost:4200

### Backend (Spring Boot)
```bash
cd back
mvn spring-boot:run
```
API : http://localhost:8080

---

## Lancer les tests

### Frontend

#### a. Tests unitaires & couverture (Jest)
```bash
cd front
npx jest --coverage
```
Rapport HTML : `front/coverage/jest/lcov-report/index.html`

#### b. Tests E2E (Cypress)
```bash
# Lancer le serveur Angular AVANT
npx cypress run --e2e
```
Rapport : résumé dans la console, couverture si activée.

### Backend

#### a. Tests unitaires & d’intégration (JUnit/Mockito)
```bash
cd back
mvn clean test
```

#### b. Rapport de couverture (JaCoCo)
```bash
mvn jacoco:report
```
Rapport HTML : `back/target/site/jacoco/index.html`

---

## Objectif de couverture

- **Front** : >80% sur tous les indicateurs (statements, branches, functions, lines)
- **Back** : >80% sur tous les indicateurs (instructions, branches, lignes, méthodes, classes)
- Les rapports HTML détaillent la couverture pour chaque fichier.

---

## Structure des tests

- **Front** :
  - Tests unitaires pour chaque méthode publique de chaque service/composant.
  - Tests E2E Cypress pour tous les parcours utilisateurs majeurs (connexion, inscription, CRUD session, navigation, droits, erreurs).
- **Back** :
  - Tests unitaires (Mockito) pour chaque service métier.
  - Tests d’intégration (SpringBootTest/WebMvcTest) pour chaque controller.
  - 30% minimum de tests d’intégration.

