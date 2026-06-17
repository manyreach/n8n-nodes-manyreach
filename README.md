<p align="center">
  <a href="https://www.manyreach.com/" target="_blank">
    <img src="./nodes/Manyreach/Manyreach.png" alt="Manyreach" width="120">
  </a>
</p>

<h1 align="center">Manyreach n8n Node</h1>

<p align="center">
  Official n8n community node for the <a href="https://www.manyreach.com/">Manyreach</a> cold-email API.<br>
  Build campaigns, manage prospects, and automate outreach — right inside your n8n workflows.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@manyreach/n8n-nodes-manyreach"><img src="https://img.shields.io/npm/v/@manyreach/n8n-nodes-manyreach?label=npm&logo=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@manyreach/n8n-nodes-manyreach"><img src="https://img.shields.io/npm/dm/@manyreach/n8n-nodes-manyreach?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/manyreach/n8n-nodes-manyreach/pkgs/container/n8n"><img src="https://img.shields.io/badge/docker-ghcr.io%2Fmanyreach%2Fn8n-blue?logo=docker" alt="docker image"></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/npm/l/@manyreach/n8n-nodes-manyreach" alt="MIT License"></a>
</p>

---

## Install

Pick whichever fits your n8n setup.

### Via n8n's community-nodes UI

In n8n: **Settings → Community Nodes → Install**, then enter:

```
@manyreach/n8n-nodes-manyreach
```

### Via npm (self-hosted)

```bash
npm install @manyreach/n8n-nodes-manyreach
```

Restart n8n; the **Manyreach** node appears in the palette.

### Via Docker

A ready-to-run n8n image with the node already installed:

```bash
docker run -p 5678:5678 -v n8n-data:/home/node/.n8n ghcr.io/manyreach/n8n:latest
```

Or with compose, see [`compose.yaml`](./compose.yaml).

## Setup

1. In the Manyreach app: **Account Settings → API** — copy your API key.
2. In n8n: create a new **Manyreach API** credential and paste the key.
3. Add a **Manyreach** node, pick a resource and operation, run.

That's it. Resource pickers populate from your Manyreach account — no need to paste raw IDs.

## What you can automate

| Area | Operations |
| --- | --- |
| **Campaigns** | Create · Update · Start · Pause · Copy · Delete · Get one / many · **Get stats** (opens, clicks, replies) |
| **Prospects** | Bulk add · Create · Update · Delete · Get one / many with filters · Add/remove tags · Read inbound messages |
| **Sequences** | Full CRUD on email sequences inside a campaign |
| **Follow-ups** | Manage individual follow-up steps and delays |
| **Senders** | Create · Update · Delete · Get one / many · **Get auth errors** (DKIM/SPF/DMARC) |
| **Tags** | Full CRUD · Get prospects by tag |
| **Lists** | Full CRUD · Get one / many |
| **Workspaces** | Full CRUD · Get one / many |
| **Users** | Full CRUD · Get one / many |
| **Clientspaces** | Full CRUD · Get one / many |
| **Whitelabel** | Update settings |
| **Messages** | Create · Get for a prospect |

### Type-ahead resource pickers

Every selector — campaign, sequence, list, tag, sender, workspace, user, clientspace — supports **search-as-you-type** instead of pasting IDs. The node populates dropdowns directly from your account.

## Example workflow

A four-node cold-email loop:

1. **Schedule Trigger** — every weekday at 09:00.
2. **Manyreach › Prospect › Bulk** — push new leads into a campaign.
3. **Manyreach › Campaign › Start** — activate the campaign.
4. **Wait** 24h → **Manyreach › Campaign › Get Stats** → post to Slack.

## Development

```bash
git clone https://github.com/manyreach/n8n-nodes-manyreach.git
cd n8n-nodes-manyreach
npm install
npm run dev      # starts n8n at http://localhost:5678 with the node loaded (hot reload)
```

Other scripts:

```bash
npm run build      # production TypeScript build into dist/
npm run lint       # n8n strict community-node lint
npm run lint:fix   # autofix what's safe
npm run release    # interactive release (bumps version, tags, publishes via CI)
```

## Compatibility

- **n8n** 1.0+ (tested against current)
- **Node.js** 18+

## Privacy

To improve this integration, the node sends anonymous technical metadata with each API request — including the node version, workflow ID, execution mode, and similar identifiers — to Manyreach. No credentials, request bodies, or other workflow contents are collected.

## Support

- Issues & feature requests: [GitHub issues](https://github.com/manyreach/n8n-nodes-manyreach/issues)
- Manyreach API documentation: [manyreach.com/docs](https://manyreach.com/docs)
- Conduct in community spaces: see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## License

[MIT](./LICENSE.md) — © 2026 Manyreach.

