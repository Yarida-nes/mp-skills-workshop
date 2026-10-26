# eShop: new features with Matt Pocock's skills

This branch, `mash/part-2-new-features`, is the starting point for Part 2 of the Perth AI workshop on Matt Pocock's skills for AI coding agents. Part 1 runs from `main`.

**Setup guide:** https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/ · [skills cheat sheet](https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/skills.html) · [slides](https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/slides.html)

## The story

In Part 1 you were handed a buggy, vibe-coded online store and triaged it. Those bugs are now fixed, with tests. The client is happy, and now they want new features. Your job is to build one properly: grill the idea, write a spec, break it into tickets, implement it test-first, and get it reviewed and merged.

## Switch to Part 2

Keep your Part 1 changes safe first with `git stash -u`, or commit them. Then swap in your GitHub name and run the block that matches how you got the shop.

If you cloned perth-ai:

```bash
gh repo fork --remote
git fetch upstream mash/part-2-new-features
git switch -c part-2 upstream/mash/part-2-new-features
git push -u origin part-2
gh repo set-default YOUR-NAME/workshop-mp-skills-for-ai-native-devs
gh repo edit --enable-issues
```

If you forked it:

```bash
git remote add upstream https://github.com/perth-ai/workshop-mp-skills-for-ai-native-devs
git fetch upstream mash/part-2-new-features
git switch -c part-2 upstream/mash/part-2-new-features
git push -u origin part-2
gh repo set-default YOUR-NAME/workshop-mp-skills-for-ai-native-devs
gh repo edit --enable-issues
```

A fork copies only `main` by default, which is why the branch comes from `upstream`. If `git remote add` says `upstream` already exists, carry on. The last two lines point `gh` at your fork and turn on its issues, so your tickets and pull requests stay on your fork, not on perth-ai. Open PRs into your own `part-2` branch.

Then run `/setup-matt-pocock-skills` in your coding agent. Choose GitHub issues if you're signed in to `gh`, or local files if not.

Starting fresh? Use `gh repo fork perth-ai/workshop-mp-skills-for-ai-native-devs --clone`, `cd` into it, and run the "forked it" block.

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

The app comes from Part 1 of this workshop, on `main`, by Rafael Avigad and Raj Saddi. Released under CC0, like the original.
