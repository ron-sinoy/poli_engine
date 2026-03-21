import sys
import re

def extract(path):
    print(f"\n================ {path} ================\n")
    try:
        with open(path, 'r') as f:
            content = f.read()
    except Exception as e:
        print(f"Error: {e}")
        return
        
    if 'globalVars:' in content:
        styles_part = content.split('globalVars:')[1]
        print("--- STYLES ---")
        print(styles_part)
        
    print("--- NODES ---")
    for line in content.split('\n'):
        line_s = line.strip()
        if line_s.startswith('name:') or line_s.startswith('text:') or line_s.startswith('layout:') or line_s.startswith('fills:') or line_s.startswith('textStyle:') or line_s.startswith('borderRadius:') or line_s.startswith('id:'):
            print(line)

extract('/home/ronsinoy/.gemini/antigravity/brain/a1e18383-7926-4da6-9c41-67cfd4d24f08/.system_generated/steps/49/output.txt')
extract('/home/ronsinoy/.gemini/antigravity/brain/a1e18383-7926-4da6-9c41-67cfd4d24f08/.system_generated/steps/61/output.txt')
