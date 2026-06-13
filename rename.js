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
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git') && !file.includes('.gemini')) {
                results = results.concat(getFiles(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.md') || file.endsWith('package.json') || file.endsWith('package-lock.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = getFiles(dirPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    newContent = newContent.replace(/Purelab/g, 'Paperlab');
    newContent = newContent.replace(/purelab/g, 'paperlab');
    newContent = newContent.replace(/PURELAB/g, 'PAPERLAB');
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
