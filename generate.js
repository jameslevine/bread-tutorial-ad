import 'dotenv/config';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const API = 'https://api.magnific.com';
const KEY = process.env.MAGNIFIC_API_KEY;
const headers = { 'x-magnific-api-key': KEY, 'Content-Type': 'application/json' };

const NEG = 'low quality, blurry, watermark, any text, any letters, any words, signage, logos, screen content, UI text, captions, subtitles, typography';

const CLIPS = {
  1: {
    name: 'hook',
    prompt: `Medium shot, eye-level, of a friendly young founder-type person sitting
at a modern laptop in a sunlit café. They are looking directly into camera
and speaking warmly to the viewer like a tutorial vlogger. Their laptop
screen is angled away from camera and not visible. They gesture casually
with their hands as they speak — picking up a coffee cup, setting it down,
glancing back at the laptop, smiling. A barista moves in the soft-focus
background. Warm natural window light, plain unbranded walls.

The person says, with clear lip sync, in a confident friendly American
accent: "Hey — building your own website is actually really easy. I'm
gonna show you how to do it in like five minutes. Let's go."

Style: clean, polished, like a professional YouTube tutorial intro.
Realistic, sharp focus on the speaker, shallow depth of field.

Audio: their voice is clear and present, gentle upbeat acoustic guitar
underneath, soft café ambience.

Camera: locked off, very slight slow push-in.`,
    duration: 8,
    negative: NEG + ', laptop screen visible, screen showing UI, extra hands, extra fingers, melting, surreal, weird, multiple people speaking',
  },
  2: {
    name: 'drift',
    prompt: `Same medium shot of the same friendly founder at the same café laptop,
same lighting, same outfit. They are still talking to camera in the same
warm tutorial tone — but things are subtly wrong. A third hand has appeared
from behind their shoulder and is gesturing along with their other two
hands. They don't notice. Their coffee cup lifts itself an inch off the
table briefly, then settles. The barista in the background is walking in
slow motion. The founder's left ear is slightly larger than the right.

The person says, with clear lip sync, in the same friendly tutorial voice
but slightly dragging and repeating: "So — first you just, you just, you
just add your content, your content, your content, and then…"

Style: still looks like a clean tutorial reel, but with subtle uncanny
details creeping in. The speaker is still the focus.

Audio: their voice clear, light vocal stutter on the repeated words. The
acoustic guitar underneath is slightly detuned and lagging behind itself.
Café ambience now has a faint low hum.

Camera: locked off, same angle.`,
    duration: 8,
    negative: NEG + ', laptop screen visible, screen showing UI, fully normal, no anomalies',
  },
  3: {
    name: 'chaos',
    prompt: `Same café, same laptop, same founder still talking to camera — but
reality is breaking down. They now have five arms, all gesturing wildly
while they speak. Their face is stretching slightly. The barista in the
background is mid-transformation into a long baguette, slumping over the
counter. The café walls behind the founder are melting and dripping
downward like wet paint. A second, identical founder briefly leans into
frame from the left and then dissolves. Coffee cups float gently upward.

The person says, with clear but distorted lip sync, in a stretched warbling
version of the same tutorial voice that escalates into a soft scream:
"And then you just launnnnch yourrrr businessssss aaaahhhhhhh."

Style: uncanny, surreal, AI-slop aesthetic, but the lighting, framing and
"YouTube tutorial" feel are still recognisable underneath the chaos.

Audio: their voice stretched, wet, with a soft scream layered under. The
guitar is warbling badly out of tune. A faint squelching sound underneath
everything.

Camera: locked off, same angle, frame shudders very slightly.`,
    duration: 8,
    negative: NEG + ', laptop screen visible, screen showing UI, normal, calm, mundane',
  },
  4: {
    name: 'capybara',
    prompt: `Format: 9:16 vertical, 1080x1920, 8 seconds, 24fps, single continuous shot,
locked-off camera (no pans, no zooms, no dolly).

Style: hand-drawn 2D cartoon animation. Thick uneven black ink lines (about 4px),
slight visible line wobble frame-to-frame so the drawings feel alive. Flat colours,
no gradients — solid colour fills with a tiny bit of cel-shaded shadow under each
object. Subtle paper-grain texture across the whole frame. Wholesome, charming,
cosy. Visually closest to Simon's Cat meets We Bare Bears meets a New Yorker
cartoon. Soft and rounded everywhere.

Background: plain off-white (#F8F4EC, like aged paper) for the entire 8 seconds.
No environment, no furniture, no horizon line, no shadow on the ground beyond a
small soft oval directly under the capybara. Empty space all around so the
character and the screen are the only things on screen.

Character: a small, very round, cute capybara, about 1/4 of the frame height.
Tan-brown body (#C8A57A), slightly darker brown around the muzzle, two tiny
round black eyes set close together, a small round nose, two short rounded
ears, tiny rounded paws with no visible claws. The capybara stands upright on
its hind legs throughout. Expressions are clear and exaggerated: confident
little smile, then strained concentration, then wide-eyed panic, then a single
sad eye-droop, then a tiny resigned hopeful smile at the end. Always centred
horizontally, vertical position varies by beat.

The screen: a large pale-blue rectangle (#D9E8F2) with a thin black outline,
roughly the right two thirds of the frame in beats 1–2, expanding to fill
almost the whole frame in beat 3. The screen is empty (no UI, no buttons, no
logos, no text — completely blank pale blue). When pop-ups and error windows
appear, they are drawn as small white rectangles with a thin black border and
a tiny black "x" in the corner — but otherwise empty (no text or UI inside).
They stack and overlap chaotically. A few small wobbly black gear/cog icons
and tangled-cable doodles also appear during the chaos beat to read as "tech"
— no text on them.

Beat-by-beat motion timed to the narration:

0.0–2.0s — "Running a business is hard." Capybara stands lower-left of frame,
in front of the blank pale-blue screen. It gives a small confident smile, rolls
its little shoulders, and rubs its two paws together in a tiny "let's do this"
gesture. Slight bob of the body, alive and breathing.

2.0–2.5s — beat. The capybara's smile starts to fade as a single small white
pop-up window blinks into existence on the screen. The capybara tilts its
head, mildly puzzled.

2.5–5.5s — "It's easier when someone else is running your tech." The chaos
escalates fast. The capybara taps the screen frantically with both paws.
White pop-up rectangles multiply — first three, then ten, then a flurry,
stacking and overlapping until they fill almost the entire frame. Small
wobbly cartoon gear/cog icons and tangled cables drift in among the pop-ups.
The screen briefly cracks with a jagged black line. The capybara visibly
shrinks (slow scale-down to ~60% size) as the chaos overtakes it. By 5.0s
its paws are over its eyes, peeking through one paw, completely overwhelmed.

5.5–6.5s — beat / emotional low. Most pop-ups fade away. A single fat cartoon
teardrop wells up in the capybara's left eye and rolls down its cheek. The
frame holds very still, only the teardrop animating. Background tints very
faintly warm pink (#FBEDE9) — subtle, not garish.

6.5–8.0s — "Call us." Soft right-to-left wipe to the capybara now sitting on
the ground, legs out in front, holding a small chunky cartoon mobile phone in
its paws (a rounded black rectangle with a single rounded white square on it —
no UI, no text). The capybara looks up directly into camera with a hopeful
little smile, ears perked, eyes wide and round. Hold on this final pose for
the last 1.0s.

Voiceover, off-screen narrator (the capybara never speaks): dry, calm,
slightly weary, mid-30s, soft British or neutral mid-Atlantic accent. Warm,
sympathetic, conversational pacing, not announcer-y.

Line with delivery cues:
"Running a business is hard." — calm, matter-of-fact, 0.0–2.0s.
[0.5s silence, 2.0–2.5s]
"It's easier when someone else is running your tech." — gentle, building
slightly, 2.5–5.5s.
[1.0s silence as the teardrop rolls, 5.5–6.5s]
"Call us." — soft, knowing, with a tiny smile in the voice, 6.5–7.6s.

Music bed: solo ukulele, simple repeating four-note pattern in C major, very
gentle, low volume under the voice. Slightly slowed-down and warmer-toned
during the teardrop beat. Resolves to a soft major chord on "Call us."

Sound effects:
- 2.1s: a single gentle "bloop" as the first pop-up appears
- 2.6s–4.8s: a rising flurry of light "bloop" / "ding" pop-up sounds,
  escalating in pitch and density
- 3.4s: a soft "creak" as the screen cracks
- 4.9s: a sudden cut to near-silence as the chaos peaks
- 5.7s: one single soft, sad piano note (high register, fragile) as the
  teardrop rolls
- 6.5s: a small gentle "swoosh" on the wipe to the final pose
- 7.5s: a tiny warm "ting" (like a soft bell) on the final beat

Mood: gently funny, charming, sympathetic, never mean-spirited. The capybara
is the audience — a small business owner overwhelmed by tech they didn't
sign up to manage. The narrator is on their side.

Strict: absolutely no on-screen text anywhere — no letters, words, UI labels,
signage, logos, captions, subtitles, or watermarks. The pop-ups are empty
rectangles. The phone screen is a blank white square. The gear icons and
cables have no text on them.`,
    duration: 8,
    negative: 'photorealistic, 3D rendered, CGI, live action, real animal footage, any text on screen, any letters, any words, signage, UI labels, captions, subtitles, watermark, logo, low quality, blurry, scary, dark, gritty, edgy, gory, harsh shadows, complex background, busy environment, multiple characters, anthropomorphic clothing, capybara wearing clothes',
  },
};

async function submit(clip) {
  const res = await fetch(`${API}/v1/ai/text-to-video/veo-3-1`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      prompt: clip.prompt,
      negative_prompt: clip.negative,
      duration: clip.duration,
      resolution: '1080p',
      aspect_ratio: '9:16',
      generate_audio: true,
    }),
  });
  if (!res.ok) throw new Error(`Submit failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.data.task_id;
}

async function poll(taskId) {
  while (true) {
    const res = await fetch(`${API}/v1/ai/text-to-video/veo-3-1/${taskId}`, { headers });
    const json = await res.json();
    const status = json.data.status;
    process.stdout.write(`  ${taskId.slice(0, 8)} → ${status}\r`);
    if (status === 'COMPLETED') return json.data.generated[0];
    if (status === 'FAILED') throw new Error(`Task ${taskId} failed: ${JSON.stringify(json)}`);
    await new Promise(r => setTimeout(r, 5000));
  }
}

async function download(url, path) {
  const res = await fetch(url);
  await pipeline(res.body, createWriteStream(path));
}

async function generate(clipNum) {
  const clip = CLIPS[clipNum];
  console.log(`\n[clip ${clipNum} — ${clip.name}] submitting…`);
  const taskId = await submit(clip);
  console.log(`[clip ${clipNum}] task_id: ${taskId}`);
  const videoUrl = await poll(taskId);
  console.log(`\n[clip ${clipNum}] downloading…`);
  const path = `clips/${clipNum}-${clip.name}.mp4`;
  await download(videoUrl, path);
  console.log(`[clip ${clipNum}] saved → ${path}`);
}

if (!KEY) {
  console.error('Missing MAGNIFIC_API_KEY in .env');
  process.exit(1);
}

const arg = process.argv[2];
if (arg === 'all') {
  await Promise.all([1, 2, 3].map(generate));
} else if (arg === 'rest') {
  await Promise.all([2, 3].map(generate));
} else if (arg) {
  await generate(Number(arg));
} else {
  console.log('Usage: node generate.js <1|2|3|all>');
}
