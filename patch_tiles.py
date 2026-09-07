import re

with open('assets/css/style.css', 'r') as f:
    css = f.read()

# Standardize dormant state
# Content card
css = re.sub(
    r'\.content-card\s*\{[^}]*\}',
    r'.content-card {\n  position: relative;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 15px;\n  border-radius: 16px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  cursor: pointer;\n  z-index: 1;\n  transition: all 0.3s ease;\n}',
    css
)
# Service item
css = re.sub(
    r'\.service-item\s*\{[^}]*\}',
    r'.service-item {\n  position: relative;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  z-index: 1;\n  transition: all 0.3s ease;\n}',
    css
)
# Timeline item (needs padding now so it looks like a tile)
css = re.sub(
    r'\.timeline-item\s*\{\s*position:\s*relative;\s*\}',
    r'.timeline-item { position: relative;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  transition: all 0.3s ease;\n}',
    css
)
# Project item is already good but let's make sure
css = re.sub(
    r'\.project-item\s*\{([^}]*)\}',
    r'.project-item {\1}', # Keep as is, it has background 0.05 and border 0.1
    css
)


# Standardize hover state
hover_style = r"""{
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 4px 25px rgba(255, 255, 255, 0.1);
}"""

# Content card hover
css = re.sub(r'\.content-card:hover\s*\{[^}]*\}', f'.content-card:hover {hover_style}', css)
# Service item hover
css = re.sub(r'\.service-item:hover\s*\{[^}]*\}', f'.service-item:hover {hover_style}', css)

# Add timeline item hover if it doesn't exist
if '.timeline-item:hover' not in css:
    css += f"\n.timeline-item:hover {hover_style}\n"

with open('assets/css/style.css', 'w') as f:
    f.write(css)

print("Tiles standardized.")
