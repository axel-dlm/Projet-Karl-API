Projet API jeux video
Equipe
- Axel
- Jason

Stack
- Node + Express
- Postgres avec Sequelize
- Docker

Lancer le projet
Au premier lancement faut faire les migrations et le seed pour avoir des données :

docker compose exec backend npm run migrate

docker compose exec backend npm run seed

L'api tourne sur le port 3000.

On a 3 modeles :
- Studio
- Platform
- Game
Un studio peut avoir plusieurs jeu. Un jeu peut etre sur plusieurs platforms .

Les routes

CRUD complet sur les 3 ressources (games, studios, platforms).

Exemple pour jeux :

- GET /games
- GET /games/:id
- POST /games
- PATCH /games/:id
- PUT /games/:id
- DELETE /games/:id
Pareil pour les autres.

Versioning :

On utilise le header "X-API-Version" pour choisir la version.

v1 : liste basique
v2 : liste avec les relations et la traduction du genre.

Traduction :

Le header "Accept-Language" permet de choisir la langue, francais ou anglais. Sinon par defaut c'est englais.

Formats :

On peut recuperer les donnees en json, xml ou csv.

Soit avec le header accept, soit avec format=xml directement dans l'url.

HATEOAS

Chaque reponse contient un champ "_links" avec les liens vers les actions possibles (self, list, create, update, delete) et les liens de pagination quand y en a.

Tester l'api

Y'a un fichier "requests.http" avec des exemples de requetes, ca marche avec l'extension REST Client de VS Code.
