"""Rebuild the logo sheet as portable, font-independent SVG paths.

Install prerequisites with: python -m pip install fonttools brotli
Run from any directory with: python site/scripts/logo.py
The supplied raster sheet is the geometry reference;
the monogram is manually traced, type uses the project's licensed font files.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

SITE = Path(__file__).resolve().parents[1]
OUT = SITE / 'public/images/logo'

def font(family, filename, weight):
    face = TTFont(SITE / f'node_modules/@fontsource-variable/{family}/files/{filename}')
    return instantiateVariableFont(face, {'wght': weight}, inplace=True)

serif = font('playfair-display', 'playfair-display-latin-wght-normal.woff2', 400)
sans = font('dm-sans', 'dm-sans-latin-opsz-normal.woff2', 600)

def lettering(text, face, size, x, y, color, tracking=0):
    glyphs, cmap = face.getGlyphSet(), face.getBestCmap()
    scale = size / face['head'].unitsPerEm
    result = []
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        fill = '#E9BE5B' if char == '.' else color
        result.append(f'<path fill="{fill}" transform="translate({x:.3f} {y}) scale({scale:.6f} {-scale:.6f})" d="{pen.getCommands()}"/>')
        x += glyph.width * scale + tracking
    return ''.join(result)

def monogram(color):
    # Reference: primary mark, left edge of pixel grid = x0, ascender top = y0.
    d = 'M145 9 C163 8 180 5 197 0 L197 211 C197 224 201 228 220 228 L220 235 L174 235 L174 211 C160 229 144 237 123 237 C83 237 57 207 57 163 C57 121 82 89 120 89 C142 89 159 96 171 111 L171 34 C171 18 166 16 145 16 Z M121 96 C91 96 83 127 83 163 C83 204 94 231 123 231 C150 231 174 205 174 165 C174 126 155 96 121 96 Z'
    pixels = [(74,32,'#A9C6B0'),(48,55,'#527267'),(74,59,'#A9C6B0'),(24,67,'#E9BE5B'),(0,90,'#A9C6B0'),(24,90,'#527267'),(48,87,'#C85D35'),(74,86,'#527267'),(0,117,'#A9C6B0'),(24,117,'#E9BE5B'),(48,117,'#527267'),(24,143,'#A9C6B0')]
    grid = ''.join(f'<rect x="{x}" y="{y}" width="18" height="18" rx="0.8" fill="{c}"/>' for x,y,c in pixels)
    return grid + f'<path fill="{color}" fill-rule="evenodd" d="{d}"/>'

def svg(box, content):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}" role="img" aria-labelledby="title"><title id="title">diana. — Jeske-Siegel</title>{content}</svg>\n'

for theme, color in [('light','#173530'),('dark','#F6F5EF')]:
    horizontal = f'<g transform="translate(14 14) scale(.58)">{monogram(color)}</g>'
    horizontal += lettering('diana.', serif, 64, 156, 112, color)
    horizontal += lettering('JESKE-SIEGEL', sans, 12, 160, 136, color, 3.55)
    (OUT / f'logo-horizontal-on-{theme}.svg').write_text(svg('0 0 420 180', horizontal), encoding='utf-8')
    vertical = f'<g transform="translate(30 12)">{monogram(color)}</g>'
    vertical += lettering('diana.', serif, 94, 20, 332, color)
    vertical += lettering('JESKE-SIEGEL', sans, 16, 28, 372, color, 5)
    (OUT / f'logo-vertical-on-{theme}.svg').write_text(svg('0 0 280 400', vertical), encoding='utf-8')
    (OUT / f'logo-icon-on-{theme}.svg').write_text(svg('0 0 248 263', f'<g transform="translate(14 14)">{monogram(color)}</g>'), encoding='utf-8')

favicon = '<circle cx="128" cy="128" r="128" fill="#F6F5EF"/>'
favicon += f'<g transform="translate(49 35) scale(.72)">{monogram("#173530")}</g>'
(SITE / 'public/favicon.svg').write_text(svg('0 0 256 256', favicon), encoding='utf-8')
