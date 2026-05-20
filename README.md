# forestbrawl.io — Deploy setup (Cloudflare Pages + Fly.io)

Adımlar (kısa):

- Frontend: Cloudflare Pages (ücretsiz CDN)
- API / WebSocket: Fly.io (free tier; sınırlamalar var)

Hazırlanan dosyalar:

- `artifacts_unpacked/artifacts/api-server/Dockerfile`
- `artifacts_unpacked/artifacts/api-server/fly.toml`
- `.github/workflows/deploy-api.yml`
- `.github/workflows/deploy-frontend.yml`

Gerekli GitHub Secrets:
- `FLY_API_TOKEN` — Fly.io API token
- `CF_API_TOKEN`, `CF_ACCOUNT_ID` — Cloudflare Pages publish token ve account id

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
- Workflow'lar, repoya push edildiğinde otomatik deploy yapacaktır, fakat Secrets ayarlamanız gerekir.
