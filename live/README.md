# Skills Night live

One deck for the whole night, Raf's Part 1 and Mash's Part 2, with three views:

| View | URL | Who |
| --- | --- | --- |
| Phone | `/live/` | Everyone, from the QR on screen. Follows the projector, votes on polls, answers quick checks, writes short answers that go up as a wall, asks and upvotes questions. |
| Projector | `/live/screen.html?key=HOST_KEY` | The laptop on the projector. With the key, its arrow keys move every phone too. Without a key it only follows. |
| Host remote | `/live/host.html?key=HOST_KEY` | A phone or tablet: next and back, timer, reveal answers, hide a written answer, mark questions answered or hide them. |

The key is taken out of the address bar and remembered on that device, so you only open the `?key=` link once.

The slides, polls and quick checks are all in `docs/live/deck.js`. Edit that one file.

## Keys on the projector

← → move · T start or pause the slide's timer · R reset it · V reveal a quick check's answer · F full screen

## Deploy (Cloudflare)

From this folder, on a machine signed in to Cloudflare:

```sh
npm install
npx wrangler login                 # once, opens the browser
npx wrangler deploy                # prints https://skills-night-live.<account>.workers.dev
npx wrangler secret put HOST_KEY   # paste a long random word; this is the host password
```

Then open `https://skills-night-live.<account>.workers.dev/live/screen.html?key=<that word>` on the projector.

The Worker serves all of `docs/` as static files and runs one Durable Object for the room (free plan is fine).
Votes and questions survive a redeploy. To start clean after a rehearsal, use **Clear all votes and questions** on the host remote.

## Try it locally

```sh
echo HOST_KEY=dev > .dev.vars
npx wrangler dev
```

Open http://localhost:8787/live/screen.html?key=dev and http://localhost:8787/live/ in another window.

## If the backend is down

Open `docs/live/screen.html` straight from disk, or from GitHub Pages. It runs as plain slides: arrows move, polls show their options for a show of hands, and V still reveals quick-check answers.
