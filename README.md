# P2P Pool

P2P Pool is a decentralized, cross-platform pool 🎱 (billiards) scorekeeping and ranking app. This means there's no accounts or login required. All match data and stats are synced directly between players using the app.It's designed as a Progressive Web App (PWA) using [React](https://react.dev/) + [Vite](https://vite.dev/) and includes core concepts for decentralized identity and peer sync.

## Key features

- Profile creation via seed phrase (no email/login) — uses BIP39 + nostr-style keypairs
- Profile recovery via seed phrase
- Match scoreboard for 8-ball, 9-ball, 10-ball
- Local storage of profile, match data, and player statistics
- Hooks and notes for decentralized sync using `gun` (p2p) and `nostr-tools` (pub/sub & signatures).

## References and protocols

- [Nostr](https://github.com/fiatjaf/nostr) — simple pub/sub and key-signing model for decentralized identity and event relays.
- [Gun](https://gun.eco) — p2p graph DB that can sync via WebRTC and peers for offline-first replication.
- Secure Seed: BIP39 (mnemonic) for interoperable seed phrases.
- Examples of pool apps for UX references: APA Scorekeeper, BCAPL Scorer, Salotto.

## Getting started

1. Install deps

```bash
cd p2p-pool
npm install
```

2. Run dev server

```bash
npm run dev
```

## Notes on architecture and next steps

- Identity: seed phrase -> keypair -> profile (pubkey) stored locally. Optionally register pubkey on nostr relays for discoverability.
- Match verification: matches can be signed by both players and published to a relay/Gun relay; third-party witnesses (Web of Trust) can co-sign to attest.
- Sync: use Gun for peer discovery & WebRTC; use nostr events for cross-relay publication and verification signatures.
- Ratings: integrate FargoRate/APA/Elo modules serverless by storing match events and computing ratings locally or via light-weight consensus.
