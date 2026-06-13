import os
import re

dir_path = "d:/purelab"

def get_files(d):
    files = []
    for root, dirs, filenames in os.walk(d):
        if 'node_modules' in root or '.next' in root or '.git' in root:
            continue
        for f in filenames:
            if f.endswith('.tsx') and f != 'GlassIcon.tsx':
                files.append(os.path.join(root, f))
    return files

files = get_files(dir_path)

import_regex = re.compile(r'import\s+\{([^}]+)\}\s+from\s+["\']lucide-react["\'];?')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    match = import_regex.search(content)
    if match:
        imports_str = match.group(1)
        icons = [i.strip() for i in imports_str.split(',')]
        
        new_content = content
        for icon in icons:
            if not icon: continue
            if ' as ' in icon:
                icon_name = icon.split(' as ')[1].strip()
            else:
                icon_name = icon
                
            tag_regex = re.compile(r'<\s*' + icon_name + r'\b([^>]*)/>')
            new_content = tag_regex.sub(r'<GlassIcon icon={' + icon_name + r'} \1/>', new_content)
            
            tag_regex_open = re.compile(r'<\s*' + icon_name + r'\b([^>]*)>(.*?)</\s*' + icon_name + r'\s*>', re.DOTALL)
            new_content = tag_regex_open.sub(r'<GlassIcon icon={' + icon_name + r'} \1/>', new_content)
        
        if 'GlassIcon' not in new_content:
            new_content = new_content.replace(match.group(0), match.group(0) + '\nimport { GlassIcon } from "@/components/ui/GlassIcon";')
            
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
                print(f"Updated {f}")
