# forestbrawl.io — Deploy setup (GitHub Pages + Fly.io)

Adımlar (kısa):

- Frontend: GitHub Pages (ücretsiz, repo ile entegrasyon)
- API / WebSocket: Fly.io (free tier; sınırlamalar var)

Hazırlanan dosyalar:

- `artifacts_unpacked/artifacts/api-server/Dockerfile`
- `artifacts_unpacked/artifacts/api-server/fly.toml`
- `.github/workflows/deploy-api.yml`
- `.github/workflows/deploy-frontend.yml`

Gerekli GitHub Secrets:
- `FLY_API_TOKEN` — Fly.io API token (api-server deploy için)

Not: Frontend artık GitHub Pages ile deploy edilebilir; Cloudflare isteğe bağlıdır.

Hızlı yerel test

API (derlenmiş dist zaten mevcut):
```
node --enable-source-maps artifacts_unpacked/artifacts/api-server/dist/index.mjs
```

Frontend önizleme (Vite preview):
```
cd artifacts_unpacked/artifacts/forestbrawl
npm ci
npm run serve
```

Notlar:
- Ücretsiz seçeneklerde sürekli düşük-latency garanti edilmez; Türkiye oyuncuları için en iyi deneyim ücretli İstanbul lokasyonlu VPS ile sağlanır.
- Frontend: GitHub Pages otomatik deploy edildiğinde statik içerik hızlı sunulur.
- API / WebSocket: GitHub üzerinde sürekli çalışan bir gerçek zamanlı sunucu mümkün değildir; `FLY_API_TOKEN` ile Fly.io kullanmanızı öneririm.
