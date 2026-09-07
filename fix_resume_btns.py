import re
with open('index.html', 'r') as f:
    html = f.read()

html = re.sub(
    r'<div class="resume-preview-actions" style="display: flex; gap: 15px; width: 100%; justify-content: flex-end;">\s*<a href="\./PranayPandey_Resume_Sep2026\.pdf" target="_blank" class="form-btn" style="width: auto; padding: 10px 20px;">\s*<ion-icon name="eye-outline"></ion-icon>\s*<span>View Full</span>\s*</a>\s*<a href="\./PranayPandey_Resume_Sep2026\.pdf" download class="resume-download-btn" style="width: auto; padding: 10px 20px; margin: 0; background: rgba\(255, 255, 255, 0\.05\);">\s*<ion-icon name="download-outline"></ion-icon>\s*<span>Download PDF</span>\s*</a>\s*</div>',
    '<div class="resume-preview-actions">\n              <a href="./PranayPandey_Resume_Sep2026.pdf" target="_blank" class="form-btn resume-action-btn">\n                <ion-icon name="eye-outline"></ion-icon>\n                <span>View Full</span>\n              </a>\n              <a href="./PranayPandey_Resume_Sep2026.pdf" download class="resume-download-btn resume-action-btn">\n                <ion-icon name="download-outline"></ion-icon>\n                <span>Download PDF</span>\n              </a>\n            </div>',
    html
)

with open('index.html', 'w') as f:
    f.write(html)
print("HTML patched.")
