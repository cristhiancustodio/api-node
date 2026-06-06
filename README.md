# Docker — Ejecutar el proyecto

Instrucciones rápidas para construir y ejecutar la API con Docker.

Construir imagen:

```bash
docker build -t interseguro-api:latest .
```

Ejecutar con Docker (contenedor):

```bash
docker run -p 4000:4000 --env-file .env --restart unless-stopped interseguro-api:latest
```

Usar docker-compose:

```bash
docker-compose up --build -d
```

Notas:
- El proyecto expone el puerto `4000`.
- Copia `.env.example` a `.env` y completa variables sensibles.
- Para desarrollo puedes montar el volumen y usar `npm run dev` (ver `docker-compose.yml`).
