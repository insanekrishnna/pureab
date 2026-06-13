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
        if (content.includes('GlassIcon') && !content.includes('import { GlassIcon }')) {
            const newContent = content.replace(match[0], match[0] + '\nimport { GlassIcon } from "@/components/ui/GlassIcon";');
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Added import to ${file}`);
        }
    }
});
