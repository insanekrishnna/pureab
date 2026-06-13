const fs = require('fs');
const path = require('path');

const dirPath = 'd:/purelab';

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
                results = results.concat(getFiles(file));
            }
        } else {
            if (file.endsWith('.tsx') && !file.endsWith('GlassIcon.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = getFiles(dirPath);
const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']lucide-react["'];?/;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const match = content.match(importRegex);
    
    if (match) {
        const importsStr = match[1];
        const icons = importsStr.split(',').map(i => i.trim()).filter(i => i);
        
        let newContent = content;
        icons.forEach(icon => {
            let iconName = icon;
            if (icon.includes(' as ')) {
                iconName = icon.split(' as ')[1].trim();
            }
            
            // Replace self closing
            const tagRegex = new RegExp(`<\\s*${iconName}\\b([^>]*)/>`, 'g');
            newContent = newContent.replace(tagRegex, `<GlassIcon icon={${iconName}} $1/>`);
            
            // Replace open/close
            const tagRegexOpen = new RegExp(`<\\s*${iconName}\\b([^>]*)>(.*?)</\\s*${iconName}\\s*>`, 'gs');
            newContent = newContent.replace(tagRegexOpen, `<GlassIcon icon={${iconName}} $1/>`);
        });
        
        if (!newContent.includes('GlassIcon')) {
            newContent = newContent.replace(match[0], match[0] + '\nimport { GlassIcon } from "@/components/ui/GlassIcon";');
        }
        
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
