// Skills Night: the one script for the night. The projector, the host remote and every phone render from this list.
// A slide may carry a poll ({ q, options, multi }) or a quiz (a poll with an answer and an explain line).
// minutes sets the countdown the host starts with T. qr names a link from DECK.links.
window.DECK = {
  slides: [
    {
      name: 'welcome', part: 'Setup', scenic: true, qr: 'live',
      kicker: 'While we get going',
      say: 'Scan in, <em>then get set up.</em>',
      sub: 'Your phone is tonight’s remote: polls, quick checks and questions. The setup guide is in there too.',
      poll: { q: 'Which coding agent are you using tonight?', options: ['Claude Code', 'Codex', 'GitHub Copilot', 'Cursor', 'Something else', 'Still installing'] }
    },
    {
      name: 'tonight', part: 'Setup', scenic: true,
      kicker: 'Perth AI · Skills for AI-native devs',
      say: 'Slow down the thinking. <em>Speed up the building.</em>',
      agenda: [['6:00', 'Part 1 · Raf', 'Fix a buggy shop'], ['7:00', 'Pizza', ''], ['7:30', 'Part 2 · Mash', 'Build a feature'], ['8:30', 'Q&A, then demos', '']]
    },

    // Part 1, Raf: about 60 minutes
    {
      name: 'part1', part: 'Part 1', scenic: true,
      kicker: 'Part 1 · Raf',
      say: 'The shop is buggy. <em>Let’s find out why.</em>'
    },
    {
      name: 'warmup', part: 'Part 1', minutes: 5,
      kicker: 'Warm-up',
      say: 'Which could you <em>explain to a friend?</em>',
      sub: 'Tick every one you could. Nobody sees who ticked what.',
      poll: { q: 'Which could you explain to a friend?', multi: true, options: ['LLM', 'Token', 'Context window', 'Agent', 'Harness', 'Skill', 'Shell', 'TUI', 'Markdown'] }
    },
    {
      name: 'scenario', part: 'Part 1',
      kicker: 'The scenario',
      say: 'A decade-old C# shop, <em>vibe-coded into Python.</em>',
      sub: 'The owners aren’t engineers. It mostly works, and it’s pretty buggy. They won’t start again, because the styling was real investment, so they’ve brought us in to fix it.'
    },
    {
      name: 'run', part: 'Part 1', minutes: 10,
      kicker: 'Your turn',
      say: 'Run the shop. <em>Click around.</em>',
      prompt: 'cd python-eshop/backend && uv sync && uv run python run.py\ncd python-eshop/frontend && npm install && npm run dev',
      sub: 'Browse, add to the basket, check out, look at your orders. Notice what feels off.',
      poll: { q: 'First impressions?', options: ['Looks fine to me', 'A few things feel off', 'Something’s clearly broken', 'Can’t get it running'] }
    },
    {
      name: 'retro', part: 'Part 1', minutes: 5,
      kicker: 'Retro',
      say: 'Why does vibe-coded software <em>end up like this?</em>',
      poll: { q: 'What do you think went wrong? Tick all you suspect.', multi: true, options: ['No shared spec', 'No plan before coding', 'No tests', 'Context ran out', 'No code review', 'One-shot prompts', 'Nobody could read the code'] }
    },
    {
      name: 'gut', part: 'Part 1',
      kicker: 'Gut call',
      say: 'A tooling problem, or <em>a process problem?</em>',
      poll: { q: 'Is this mostly a tooling problem or a process problem?', options: ['Mostly tooling', 'A bit of both', 'Mostly process', 'Not sure yet'] }
    },
    {
      name: 'skills', part: 'Part 1',
      kicker: 'Enter skills',
      say: 'Reusable workflows that sit <em>on top of the model.</em>',
      sub: 'A skill is a folder with a SKILL.md: a short header that says when to use it, then the instructions. Claude Code, Codex, Copilot and others all read them.',
      cards: [['Helps', 'Forces understanding before code, and gives review something fixed to check against.'], ['Doesn’t', 'Replace judgement. A skill is only as good as the choice to use it.']]
    },
    {
      name: 'check1', part: 'Part 1',
      kicker: 'Quick check',
      say: 'Do skills run <em>automatically</em> when relevant?',
      poll: {
        q: 'Do skills run automatically when relevant?', options: ['Always', 'Never', 'It depends'], answer: 2,
        explain: 'It depends on the skill. Triage’s header says <code>disable-model-invocation: true</code>, so you call it yourself. Check each one.'
      }
    },
    {
      name: 'check2', part: 'Part 1',
      kicker: 'Quick check',
      say: 'A skill loads everything it links to, <em>all at once.</em>',
      poll: {
        q: 'A skill loads everything it links to, all at once.', options: ['True', 'False'], answer: 1,
        explain: 'False. The agent reads the header first, the body when the skill is used, and linked files only when it needs them. Your context window stays clear.'
      }
    },
    {
      name: 'loop1', part: 'Part 1',
      kicker: 'Part 1’s loop',
      say: 'Understand it <em>before you touch it.</em>',
      flow: [['/triage', 'decide what a report needs'], ['diagnosing-bugs', 'make it fail on demand'], ['/implement', 'test first, then fix'], ['/retro', 'ask why it got in']],
      sub: 'On Codex, type <b>$</b> instead of <b>/</b>. In an agent without commands, ask for the skill by name.'
    },
    {
      name: 'reports', part: 'Part 1', minutes: 5, qr: 'issues',
      kicker: 'Step 1 · Read the reports',
      say: 'Some are vague, some are wrong, <em>some are real.</em>',
      sub: 'The bug reports are GitHub issues written by “customers”. Pick one.',
      poll: { q: 'Before you look at the code: which layer do you suspect?', options: ['Frontend (React)', 'Router (FastAPI)', 'Service (rules)', 'DB client / SQL', 'Not sure yet'] }
    },
    {
      name: 'triage', part: 'Part 1', minutes: 8,
      kicker: 'Step 2 · Triage',
      say: 'Decide what it needs, <em>before any code.</em>',
      prompt: '<b>/triage</b> issue #1',
      chips: ['needs-triage', 'needs-info', 'ready-for-agent', 'ready-for-human', 'wontfix'],
      sub: 'An agent will happily “fix” a bug that isn’t one. Triage is where you catch that, cheaply.'
    },
    {
      name: 'diagnose', part: 'Part 1', minutes: 10,
      kicker: 'Step 3 · Find the cause',
      say: 'Make it fail <em>on demand.</em>',
      prompt: 'Use the <b>diagnosing-bugs</b> skill on issue #1. Show me a command that fails because of this bug before you change any code.',
      sub: 'If you can make it happen, you can prove it’s gone. Skip this for the obvious ones.',
      poll: { q: 'How sure are you of the root cause now?', options: ['Low', 'Medium', 'High'] }
    },
    {
      name: 'fix', part: 'Part 1', minutes: 10,
      kicker: 'Step 4 · Fix it, test first',
      say: 'Prove it, <em>then fix it.</em>',
      prompt: '<b>/implement</b> issue #1',
      sub: 'It writes a test that fails, makes it pass, then reviews its own change.'
    },
    {
      name: 'why', part: 'Part 1', minutes: 5,
      kicker: 'Step 5 · Ask why it got in',
      say: 'Don’t just fix it. <em>Stop the next one.</em>',
      prompt: '<b>/retro</b>',
      sub: 'Same session, before you clear. It suggests a check or a written rule that would have kept this bug out.'
    },
    {
      name: 'reflect', part: 'Part 1',
      kicker: 'Reflect',
      say: 'Would you reach for these <em>on a real task?</em>',
      poll: { q: 'Would you reach for these skills on a real task?', options: ['Definitely', 'Probably, with changes', 'Not sure', 'Probably not'] }
    },
    {
      name: 'pizza', part: 'Break', scenic: true, minutes: 30, egg: true,
      kicker: 'Break',
      say: 'Pizza. <em>Back at 7:30.</em>',
      sub: 'Got a question for later? Ask it on your phone, and vote up the ones you want answered.'
    },

    // Part 2, Mash: about 60 minutes
    {
      name: 'part2', part: 'Part 2', scenic: true,
      kicker: 'Part 2 · Mash',
      say: 'The codebase is clean. <em>Now they want features.</em>'
    },
    {
      name: 'fixed', part: 'Part 2',
      kicker: 'Where we are',
      say: 'Every bug from Part 1 is fixed, and each fix has a test.',
      sub: 'The client is happy. So they’ve asked for something new.'
    },
    {
      name: 'ask', part: 'Part 2',
      kicker: 'The ask',
      say: '“Let shoppers <em>save favourites</em>.”',
      sub: 'Signed-in shoppers can save products and see them all on one page.'
    },
    {
      name: 'tempting', part: 'Part 2',
      kicker: 'The tempting move',
      prompt: 'add favourites to the shop',
      say: 'It’ll run. Will it be <em>what they meant?</em>',
      poll: { q: 'One prompt, “add favourites to the shop”. Will it be what they meant?', options: ['Yes', 'Probably', 'Doubt it', 'No chance'] }
    },
    {
      name: 'loop', part: 'Part 2',
      kicker: 'Tonight’s loop',
      say: 'Slow down the thinking. <em>Speed up the building.</em>',
      flow: [['/grill-with-docs', 'agree what to build'], ['/to-spec', 'write it down'], ['/to-tickets', 'split it into tickets'], ['/implement', 'test first, then code review'], ['pr', 'the agent writes the PR'], ['/retro', 'make the next run better']]
    },
    {
      name: 'switch', part: 'Part 2', minutes: 5, qr: 'setup',
      kicker: 'Get the code',
      say: 'Switch to <em>Part 2</em>',
      sub: 'No copy yet? Scan, and tick <b>Include all branches</b>. Then switch, and run the setup skill once.',
      prompt: 'git stash -u\ngit fetch\ngit switch mash/part-2-new-features\n<b>/setup-matt-pocock-skills</b>'
    },
    {
      name: 'grill', part: 'Part 2', minutes: 12,
      kicker: 'Step 1 · Grill',
      say: 'Let it <em>interview you.</em>',
      prompt: '<b>/grill-with-docs</b> I want to add favourites to this shop: signed-in shoppers can save products and see them on a Favourites page. Keep each question short.',
      sub: 'Answer fast. If you don’t know, say what you’d guess. It writes the words you agree into <b>GLOSSARY.md</b>. Codex: <b>$grill-with-docs</b>.',
      poll: { q: 'How many questions has the grill asked you so far?', options: ['Under 5', '5 to 10', '11 to 20', 'More than 20'] }
    },
    {
      name: 'spec', part: 'Part 2', minutes: 5,
      kicker: 'Step 2 · Spec and tickets',
      say: 'Write down what you <em>agreed.</em>',
      prompt: '<b>/to-spec</b>\n<b>/to-tickets</b>',
      sub: 'Same session as the grilling: don’t clear yet. Now there’s a record to build against and review against.'
    },
    {
      name: 'tdd', part: 'Part 2', minutes: 15,
      kicker: 'Step 3 · Test first',
      say: 'Red, <em>then green.</em>',
      prompt: '<b>/clear</b>\n<b>/implement</b> the smallest favourites ticket. Show me the failing test before you write the code.',
      sub: 'Fresh context for each ticket. A failing test proves the test can catch the problem.'
    },
    {
      name: 'review', part: 'Part 2', minutes: 8,
      kicker: 'Step 4 · Review',
      say: 'What could go wrong, and <em>which check catches it?</em>',
      prompt: 'Run the tests and show me the output. Then open a PR in my repo into mash/part-2-new-features using the PR template, and review it against <b>REVIEW.md</b>.',
      sub: 'The <b>pr</b> skill shapes the PR: a picture of the change, proof it works, and how risky it is to merge.'
    },
    {
      name: 'risk', part: 'Part 2',
      kicker: 'How Anthropic reviews agent code',
      say: 'Risk decides <em>who approves.</em>',
      tiers: [['Low', 'Docs, copy, behind a flag', '0 people'], ['Medium', 'Ordinary changes', '1 person'], ['High', 'Auth, checkout, CI', '2 people']],
      poll: { q: 'What risk tier is your favourites PR?', options: ['Low', 'Medium', 'High'] }
    },
    {
      name: 'merge', part: 'Part 2', minutes: 5,
      kicker: 'Step 5 · Merge',
      say: 'You land it, <em>you own it.</em>',
      sub: 'Read the evidence, fix what matters, merge. Then <b>/retro</b>, in the same session, to make the next run better.',
      poll: { q: 'Where did you get to?', options: ['Merged', 'PR open', 'Still building', 'Got stuck'] }
    },
    {
      name: 'qa', part: 'Q&A', qa: true,
      kicker: 'Q&A',
      say: 'Your questions'
    },
    {
      name: 'showtell', part: 'Demos', scenic: true, qr: 'skills',
      kicker: 'Show and tell',
      say: 'What did you build?',
      sub: 'Show us where you got to. Scan for every skill and when to use it.'
    }
  ],

  // Pages in docs/ are served next to live/, so links follow wherever the site is hosted.
  // Opened from disk, they point at the GitHub Pages copy instead.
  links: function () {
    var root = new URL('../', location.protocol === 'file:' ? 'https://perth-ai.github.io/workshop-mp-skills-for-ai-native-devs/live/' : location.href);
    return {
      live: new URL('live/', root).href,
      setup: root.href,
      skills: new URL('skills.html', root).href,
      issues: 'https://github.com/perth-ai/workshop-mp-skills-for-ai-native-devs/issues'
    };
  }
};
