## Login
```http
POST http://localhost:8080/login
```
### Response OK
```json
{
  "success": true
}
```
### Response KO
```json
{
  "success" : false,
  "message" : "Login error" 
}
```
## Logout
```http
POST http://localhost:8080/exit
```
### Response OK
```json
{
  "success": true
}
```
### Response KO
```json
{
  "success" : false,
  "message" : "Logout error" 
}
```
---
## New Game
```http
POST http://localhost:8080/api/v1/game
```
### Request
```json
{
    "rows" : 9,
    "columns" : 9,
    "mines" : 10
}
```
### Response
```json
{
  "gameId": 3
}
```
---
## Game List
```http
GET http://localhost:8080/api/v1/game
```
### Response
```json
{
  "games": [
    {
      "gameId": 36,
      "rows": 9,
      "columns": 9,
      "mines": 10,
      "player": "user",
      "time": 10089,
      "won": false,
      "lost": false
    },
    {
      "gameId": 37,
      "rows": 9,
      "columns": 9,
      "mines": 10,
      "player": "user",
      "time": 2788,
      "won": false,
      "lost": true
    },
    {
      "gameId": 38,
      "rows": 9,
      "columns": 9,
      "mines": 10,
      "player": "user",
      "time": 89020,
      "won": true,
      "lost": false
    }
  ]
}
```
---
## Delete Game
```http
DELETE http://localhost:8080/api/v1/game/{gameId}
```
### Response
```http
204 No Content
```
---
## Pause Game
```http
PUT http://localhost:8080/api/v1/game/{gameId}/pause
```
### Response
```http
204 No Content
```
---
## Load Game
```http
GET http://localhost:8080/api/v1/game/{gameId}
```
### Running Game Response
[Running Game](doc/load_running_game.md)
### Lost Game Response
[Lost Game](doc/load_lost_game.md)
### Won Game Response
[Won Game](doc/load_won_game.md)

---
## Start Game
```http
PUT http://localhost:8080/api/v1/game/{gameId}
```
### Response Normal
```json
{
  "startDate": "2022-11-02T09:43:02.830Z"
}
```
---
## Flag a Cell (Right Click)
```http
PUT http://localhost:8080/api/v1/board/{boardId}/cell/{row}/{column}/flag
```
### Response First Click
```json
{
  "marked": false,
  "flagged": true,
  "totalMines": 9
}
```
### Response Second Click
```json
{
  "marked": true,
  "flagged": false,
  "totalMines": 10
}
```
### Response Third Click
```json
{
  "marked": false,
  "flagged": false,
  "totalMines": 10
}
```
---
## Discover a Cell (Left Click)
```http
PUT http://localhost:8080/api/v1/board/{boardId}/cell/{row}/{column}/discover
```
### Response Empty Cell
[Empty Cell](doc/discover_empty.md)
### Response Cell Near Bomb
```json
{
  "cells": [
    {
      "row": 0,
      "column": 2,
      "nearBombs": 1,
      "flagged": false,
      "marked": false,
      "visited": true,
      "bomb": false
    }
  ]
}
```
### Response Cell With A Bomb
[Lose Game](doc/discover_lose.md)
### Response Won
```json
{
  "won": true,
  "cells": [
    {
      "row": 3,
      "column": 4,
      "nearBombs": 1,
      "flagged": false,
      "marked": false,
      "visited": true,
      "bomb": false
    }
  ]
}
```