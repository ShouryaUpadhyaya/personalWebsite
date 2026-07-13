"""Generate a 1200x630 social preview card for the portfolio homepage."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap

W, H = 1200, 630
BG_TOP = (10, 10, 12)        # neutral-950-ish
BG_BOT = (23, 23, 26)        # neutral-900-ish
INDIGO = (129, 140, 248)     # indigo-400
WHITE = (245, 245, 245)
GREY = (163, 163, 163)       # neutral-400
RING = (64, 64, 70)          # neutral-700

FONT_DIR = "/usr/share/fonts/liberation"
f_bold = ImageFont.truetype(f"{FONT_DIR}/LiberationSans-Bold.ttf", 60)
f_role = ImageFont.truetype(f"{FONT_DIR}/LiberationSans-Bold.ttf", 34)
f_tag = ImageFont.truetype(f"{FONT_DIR}/LiberationSans-Regular.ttf", 25)
f_handle = ImageFont.truetype(f"{FONT_DIR}/LiberationSans-Regular.ttf", 22)

# --- background gradient ---
base = Image.new("RGB", (W, H), BG_BOT)
px = base.load()
for y in range(H):
    t = y / H
    r = int(BG_TOP[0] + (BG_BOT[0] - BG_TOP[0]) * t)
    g = int(BG_TOP[1] + (BG_BOT[1] - BG_TOP[1]) * t)
    b = int(BG_TOP[2] + (BG_BOT[2] - BG_TOP[2]) * t)
    for x in range(W):
        px[x, y] = (r, g, b)

draw = ImageDraw.Draw(base)

# subtle indigo glow at top
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([-200, -260, 700, 240], fill=(99, 102, 241, 40))
glow = glow.filter(ImageFilter.GaussianBlur(80))
base = Image.alpha_composite(base.convert("RGBA"), glow).convert("RGB")
draw = ImageDraw.Draw(base)

# --- circular profile photo (left) ---
src = Image.open("public/profile_picture.jpeg").convert("RGB")
s = min(src.size)
box = ((src.width - s) // 2, (src.height - s) // 2,
       (src.width + s) // 2, (src.height + s) // 2)
src = src.crop(box).resize((360, 360), Image.LANCZOS)

mask = Image.new("L", (360, 360), 0)
ImageDraw.Draw(mask).ellipse([0, 0, 360, 360], fill=255)
ring = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
ImageDraw.Draw(ring).ellipse([0, 0, 400, 400], fill=RING + (255,))
ring.paste(src, (20, 20), mask)
cx, cy = 250, H // 2
base.paste(ring, (cx - 200, cy - 200), ring)

# --- text (right) ---
tx = 500
# name
draw.text((tx, 235), "Shourya Upadhyaya", font=f_bold, fill=WHITE)
# role
draw.text((tx, 305), "Full-Stack Developer", font=f_role, fill=INDIGO)

# tagline (wrapped)
tagline = "Building production-ready, scalable systems and beautiful user interfaces."
lines = textwrap.wrap(tagline, width=34)
y = 365
for ln in lines:
    draw.text((tx, y), ln, font=f_tag, fill=GREY)
    y += 32

# handle
draw.text((tx, 470), "shouryaupadhyaya.com", font=f_handle, fill=GREY)

base.save("public/og-image.png")
print("wrote public/og-image.png", base.size)
