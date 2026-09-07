import re

with open('index.html', 'r') as f:
    html = f.read()

# Remove the skills section
html = re.sub(
    r'\s*<h3 class="h3 skills-title">Skills</h3>\s*<ul class="skills-list content-card">.*?</ul>',
    '',
    html,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(html)
print("Skills removed.")
