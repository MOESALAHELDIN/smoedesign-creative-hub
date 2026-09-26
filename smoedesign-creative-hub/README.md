# SMOEDESIGN Creative Hub

Deployment-ready Next.js App Router foundation for the SMOEDESIGN Creative Hub.

## Architecture
- Client-facing project intake
- Eight-capability routing model
- Hana as orchestration / triage layer
- API boundary at `/api/intake`
- Vercel-compatible Next.js deployment

## Run
```bash
npm install
npm run dev
```

## Deploy
Import the repository into Vercel, or run:
```bash
npx vercel --prod
```

## Next production integrations
1. Persist intake records in a database.
2. Connect `/api/intake` to Hana orchestration.
3. Add authentication for internal workspace routes.
4. Add project, client, knowledge, workflow and legal modules.
5. Add agent registry and capability-specific execution APIs.
