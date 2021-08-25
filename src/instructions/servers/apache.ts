import invariant from 'invariant';
import { createElement } from 'react';
import {
  extractArticlePath,
  extractHashedUploads,
  extractHasRoot,
  extractRootPath,
  extractScript,
  extractScriptPath,
  extractServerType,
} from '../../extractor';
import { extractThumbPhp } from '../../extractor/extractThumbPhp';
import { includeThumbnailHandler } from '../../extractor/includeThumbnailHandler';
import { pathWithTail } from '../../extractor/pathWithTail';
import { relativePath } from '../../extractor/relativePath';
import { CodeFile } from '../../ui/CodeFile';
import { ServerInstructions } from '../ServerInstructions';

export const apache: ServerInstructions = {
  serverTypes: ['apache', 'litespeed'],
  addServerInstructions(serverData, instructions) {
    const serverType = extractServerType(serverData);
    const articlePath = extractArticlePath(serverData)?.replace('/$1', '');
    const script = extractScript(serverData);
    const scriptPath = extractScriptPath(serverData);
    const rootPath = extractRootPath(serverData);
    const hashedUploads = extractHashedUploads(serverData);

    invariant(articlePath != null, 'articlepath was expected');

    const documentrootvar = '%{DOCUMENT_ROOT}';
    const lines = ['RewriteEngine On'];

    // Add Rewrite Rules
    if (articlePath === rootPath) {
      // Root paths need special config
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-f');
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-d');
      lines.push(`RewriteRule ^(.*)$ ${documentrootvar}${script} [L]`);
    } else {
      lines.push(
        `RewriteRule ^/?${relativePath(
          articlePath
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

    // Add Thumbnail Handler
    if (includeThumbnailHandler(serverData)) {
      const thumbPhp = extractThumbPhp(serverData);

      const scriptRoot = `^/?${pathWithTail(relativePath(scriptPath))}`;
      const hashedPath = hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : '';
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-f');
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-d');
      lines.push(
        `RewriteRule ${scriptRoot}images/thumb/${hashedPath}([^/]+)/([0-9]+)px-.*$ ${documentrootvar}${thumbPhp}?f=$1&width=$2 [L,QSA,B]`
      );
      lines.push('');
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-f');
      lines.push('RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} !-d');
      lines.push(
        `RewriteRule ${scriptRoot}images/thumb/archive/${hashedPath}([^/]+)/([0-9]+)px-.*$ ${documentrootvar}${thumbPhp}?f=$1&width=$2&archived=1 [L,QSA,B]`
      );
      lines.push('');
    }

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
