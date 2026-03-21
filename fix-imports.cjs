const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it uses <Link
    if (content.includes('<Link')) {
      // Check if Link is already imported
      const hasLinkImport = /import\s+{[^}]*\bLink\b[^}]*}\s+from\s+['"]react-router-dom['"]/.test(content);
      
      if (!hasLinkImport) {
        console.log('Patching', filePath);
        
        // If there's an existing react-router-dom import, inject Link into it
        if (/import\s+{([^}]+)}\s+from\s+['"]react-router-dom['"]/.test(content)) {
          content = content.replace(
            /(import\s+{)([^}]+)(}\s+from\s+['"]react-router-dom['"])/,
            (match, p1, p2, p3) => {
              return p1 + p2.trim() + ', Link ' + p3;
            }
          );
        } else {
          // No react-router-dom import, add one after the last import
          const importStmt = 'import { Link } from "react-router-dom";\n';
          const lines = content.split('\n');
          let lastImportIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ')) {
              lastImportIndex = i;
            }
          }
          lines.splice(lastImportIndex + 1, 0, importStmt);
          content = lines.join('\n');
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
});
console.log('All files processed with robust import patching.');
