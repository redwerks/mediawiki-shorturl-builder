import { ServerInstructions } from '../ServerInstructions';
import {
  extractArticlePath,
  extractHasRoot,
  extractRootPath,
  extractScript,
  extractScriptPath,
  extractServerType,
} from '../../extractor';
import { relativePath } from '../../extractor/relativePath';
import invariant from 'invariant';
import { createElement } from 'react';
import { CodeFile } from '../../ui/CodeFile';

export const apache: ServerInstructions = {
  serverTypes: ['apache', 'litespeed'],
  addServerInstructions(serverData, instructions) {
    const serverType = extractServerType(serverData);
    const articlePath = extractArticlePath(serverData);
    const script = extractScript(serverData);
    const scriptPath = extractScriptPath(serverData);
    const rootPath = extractRootPath(serverData);

    invariant(articlePath, 'articlepath was expected');

    const documentrootvar = '%{DOCUMENT_ROOT}';
    const lines = ['RewriteEngine On'];

    if (articlePath === rootPath) {
      // Root paths need special config
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-f');
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-d');
      lines.push(`RewriteRule ^(.*)$ ${documentrootvar}${script} [L]`);
    } else {
      lines.push(
        `RewriteRule ^/?${relativePath(
          articlePath.replace('/$1', '')
        )}(/.*)?$ ${documentrootvar}${script} [L]`
      );
      if (articlePath !== scriptPath && rootPath !== scriptPath) {
        // If our root path doesn't match the script path we should include a rewrite for the site root
        lines.push(
          `RewriteRule ^/?${relativePath(
            rootPath
          )}$ ${documentrootvar}${script} [L]`
        );
      }
    }
    lines.push('');

    if (extractHasRoot(serverData) && serverType === 'apache') {
      // If the article path is same as the script root or root then we can't use Alias and hence use the same rewrite rules as .htaccess
      instructions.push({
        type: 'file',
        syntax: 'apache',
        name: 'Apache Config',
        content: createElement(CodeFile, {
          type: 'apache',
          content: lines.join('\n'),
        }),
        instruction: 'apacheconfig',
      });
    } else {
      instructions.push({
        type: 'file',
        syntax: 'htaccess',
        name: `${rootPath}/.htaccess`,
        content: createElement(CodeFile, {
          type: 'htaccess',
          content: lines.join('\n'),
        }),
        instruction: 'htaccess',
      });
    }
  },
};
