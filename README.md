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
      "gameId": 1,
      "boardId": 1,
      "rows": 9,
      "columns": 9,
      "mines": 10,
      "player": "user",
      "startDate": null,
      "endDate": null,
      "duration": null,
      "won": false,
      "lost": false
    },
    {
      "gameId": 2,
      "boardId": 2,
      "rows": 9,
      "columns": 9,
      "mines": 10,
      "player": "user",
      "startDate": "2022-11-02T09:30:09.593Z",
      "endDate": null,
      "duration": 234442,
      "won": false,
      "lost": false
    }
  ]
}
```
---
## Load Game
```http
GET http://localhost:8080/api/v1/game/{gameId}
```
### Response
```json
{
  "gameId": 2,
  "boardId": 2,
  "columns": 9,
  "rows": 9,
  "totalCells": 81,
  "totalMines": 10,
  "discoveredCells": 62,
  "flaggedMines": 7,
  "duration": 123543,
  "won": false,
  "lost": false,
  "cells": [
    {
      "row": 0,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true,
      "bomb": false
    },
    {
      "..." : "..."
    },
    {
      "row": 8,
      "column": 8,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true,
      "bomb": false
    }
  ]
}
```
---
## Start Game (First Click)
```http
PUT http://localhost:8080/api/v1/game/{gameId}
```
### Response Normal
```json
{
  "won": false,
  "lose": false,
  "discoveredCells": 5,
  "flaggedMines": 0,
  "startDate": "2022-11-02T09:43:02.830Z",
  "endDate": null
}
```
### Response Won
```json
{
  "won": true,
  "lose": false,
  "discoveredCells": 23,
  "flaggedMines": 2,
  "startDate": "2022-11-02T09:43:02.830Z",
  "endDate": "2022-11-02T09:45:12.123Z"
}
```
### Response Lose
```json
{
  "won": false,
  "lose": true,
  "discoveredCells": 15,
  "flaggedMines": 1,
  "startDate": "2022-11-02T09:43:02.830Z",
  "endDate": "2022-11-02T09:45:12.123Z"
}
```
---
---
## Flag a Cell (Right Click)
```http
PUT http://localhost:8080/api/v1/board/{boardId}/cell/{row}/{column}/flag
```
### Response First Click
```json
{
  "row": 3,
  "column": 5,
  "marked": false,
  "flagged": true
}
```
### Response Second Click
```json
{
  "row": 3,
  "column": 5,
  "marked": true,
  "flagged": false
}
```
### Response Third Click
```json
{
  "row": 3,
  "column": 5,
  "marked": false,
  "flagged": false
}
```
---
## Discover a Cell (Left Click)
```http
PUT http://localhost:8080/api/v1/board/{boardId}/cell/{row}/{column}/discover
```
### Response Empty Cell
```json
{
  "lose": false,
  "won": false,
  "discoveredCells": 9,
  "cells": [
    {
      "row": 0,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 0,
      "column": 1,
      "nearBombs": 1,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 1,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 1,
      "column": 1,
      "nearBombs": 1,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 2,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 2,
      "column": 1,
      "nearBombs": 2,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 3,
      "column": 0,
      "nearBombs": 1,
      "marked": false,
      "flagged": false,
      "visited": true
    },
    {
      "row": 3,
      "column": 1,
      "nearBombs": 2,
      "marked": false,
      "flagged": false,
      "visited": true
    }
  ]
}
```
### Response Cell Near Bomb
```json
{
  "lose": false,
  "won": false,
  "discoveredCells": 1,
  "cells": [
    {
      "row": 2,
      "column": 3,
      "nearBombs": 1,
      "marked": false,
      "flagged": false,
      "visited": true
    }
  ]
}
```
### Response Cell With Bomb
```json
{
  "lose": true,
  "won": false,
  "discoveredCells": 9,
  "cells": [
    {
      "row": 0,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true,
      "bomb": false
    },
    {
      "..." : "..."
    },
    {
      "row": 8,
      "column": 8,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": false,
      "bomb": false
    }
  ]
}
```
### Response Won
```json
{
  "lose": false,
  "won": true,
  "discoveredCells": 71,
  "cells": [
    {
      "row": 0,
      "column": 0,
      "nearBombs": 0,
      "marked": false,
      "flagged": false,
      "visited": true,
      "bomb": false
    },
    {
      "..." : "..."
    },
    {
      "row": 8,
      "column": 8,
      "nearBombs": 1,
      "marked": false,
      "flagged": false,
      "visited": true,
      "bomb": false
    }
  ]
}
```
---
