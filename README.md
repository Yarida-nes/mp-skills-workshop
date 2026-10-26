# eShop: new features with Matt Pocock's skills

The starting repo for Part 2 of the Perth AI workshop on Matt Pocock's skills for AI coding agents.

**Setup guide:** https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/ · [skills cheat sheet](https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/skills.html) · [slides](https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/slides.html)

## The story

In Part 1 you were handed a buggy, vibe-coded online store and triaged it. Those bugs are now fixed, with tests. The client is happy, and now they want new features. Your job is to build one properly: grill the idea, write a spec, break it into tickets, implement it test-first, and get it reviewed and merged.

## Get your own copy

1. Click **Use this template** → **Create a new repository** at the top of this page.
2. Clone your new repo and open it in your coding agent.
3. Run `/setup-matt-pocock-skills` in it. Choose GitHub issues if you're signed in to `gh`, or local files if not.

Use the template rather than a fork: your copy gets its own issues, and pull requests go to your own `main`.

## Run the app

The full guide is in [`python-eshop/README.md`](python-eshop/README.md). In short, in two terminals:

```bash
cd python-eshop/backend && uv sync && uv run python run.py
cd python-eshop/frontend && npm install && npm run dev
```

Open http://127.0.0.1:4321 and sign in with `demouser@perthai.com.au` / `Pass@word1`.

## Run the tests

```bash
cd python-eshop/backend && uv run pytest
```

## What's here for the review step

- [`AGENTS.md`](AGENTS.md): project context your agent loads every session (Codex, Cursor, Copilot and others read it; `CLAUDE.md` points Claude Code at it).
- [`REVIEW.md`](REVIEW.md): what a reviewer, human or `/code-review`, should care about in this repo.
- [`.github/pull_request_template.md`](.github/pull_request_template.md): every PR says how it was tested, how risky it is and how to revert it.

## Credits

The app comes from [perth-ai/workshop-mp-skills-for-ai-native-devs](https://github.com/perth-ai/workshop-mp-skills-for-ai-native-devs), Part 1 of this workshop by Rafael Avigad and Raj Saddi. Released under CC0, like the original.
