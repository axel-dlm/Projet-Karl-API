## API Jeux Video

API RESTful de referencement de jeux video, projet du cours API Avancee a Web School Factory.

## Equipe

| Github username    | Nom reel |
| ------------------ | -------- |
| AXEL_GITHUB_USER   | Axel     |
| JASON_GITHUB_USER  | Jason    |

## Stack

- Node.js et Express 5
- PostgreSQL avec Sequelize
- Docker Compose pour la base de donnees

## Demarrage

```
docker compose up
```

L API ecoute sur http://localhost:3000.

A la premiere installation, creer les tables et inserer les donnees de test.

```
docker compose exec backend npm run migrate
docker compose exec backend npm run seed
```

## Modeles

Trois modeles avec des relations entre eux.

- Studio, un studio de developpement
- Platform, une console ou un PC
- Game, un jeu video

Studio a plusieurs Games (1 a N), un Game appartient a un Studio.
Game et Platform sont en relation N a N via la table de jonction GamePlatforms.

## Routes

CRUD complet sur les trois ressources.

```
GET    /games        liste
POST   /games        creation
GET    /games/:id    detail
PATCH  /games/:id    modification partielle
PUT    /games/:id    remplacement
DELETE /games/:id    suppression
```

Idem pour /studios et /platforms.

## Internationalisation

Le header `Accept-Language` est lu pour selectionner la langue (fr ou en). Le header `Content-Language` est renvoye dans la reponse.

Les genres de jeux sont traduits automatiquement dans la version 2 de l API.

## Versioning

Le numero de version se passe dans le header `X-API-Version`.

- Version 1 : liste basique des jeux
- Version 2 : liste enrichie avec studio, plateformes et genre traduit (version par defaut)

## Formats

Trois formats sont supportes via le header `Accept` ou le query param `?format=`.

- application/json (defaut)
- application/xml
- text/csv

## HATEOAS

Chaque reponse contient un champ `_links` avec les liens utiles : self, list, create, update, delete, prev, next, first, last.

## Tests

Le fichier `requests.http` contient des exemples de requetes pour chaque endpoint. Utilisable avec l extension REST Client de VS Code.
