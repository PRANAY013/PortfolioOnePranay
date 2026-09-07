import re
with open('index.html', 'r') as f:
    html = f.read()

# Match the resume viewer section
m = re.search(r'(\s*<section class="resume-viewer".*?</section>)', html, re.DOTALL)
if m:
    resume_html = m.group(1)
    
    # Remove from current location
    html = html.replace(resume_html, '')
    
    # Add title wrapper to resume html if not already there
    if 'Document Preview' not in resume_html:
        title_wrapper = """
          <div class="title-wrapper" style="margin-bottom: 25px;">
            <div class="icon-box">
              <ion-icon name="document-text-outline"></ion-icon>
            </div>
            <h3 class="h3">Document Preview</h3>
          </div>
        """
        resume_html = re.sub(r'(<section class="resume-viewer"[^>]*>)', r'\1\n' + title_wrapper, resume_html)
    
    # Remove empty skill section
    html = re.sub(r'\s*<section class="skill">\s*</section>', '', html)
    
    # Add to the end of resume article
    # Find </article> for resume. It is followed by <!-- #PORTFOLIO -->
    # Let's split on <!-- #PORTFOLIO --> and inject before the </article> in the first part.
    parts = html.split('<!--\n        - #PORTFOLIO')
    if len(parts) == 2:
        resume_part = parts[0]
        resume_part = resume_part.replace('</article>', resume_html + '\n\n      </article>')
        html = resume_part + '<!--\n        - #PORTFOLIO' + parts[1]

with open('index.html', 'w') as f:
    f.write(html)
print("Resume finishing touches complete.")
