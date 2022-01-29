import {
  extractArticlePath,
  extractRootPath,
  extractScript,
  extractScriptPath,
} from '../../../extractor';
import { CodeFile } from '../../../ui/CodeFile';
import { ServerInstructions } from '../../ServerInstructions';
import { buildIISWebConfig, RewriteRule } from './webConfig';

export const iis: ServerInstructions = {
  serverTypes: ['iis'],
  addServerInstructions(serverData, instructions) {
    const articlePath = extractArticlePath(serverData)?.replace('/$1', '');
    const script = extractScript(serverData);
    const scriptPath = extractScriptPath(serverData);
    const rootPath = extractRootPath(serverData);

    const rules: RewriteRule[] = [];

    if (articlePath === rootPath) {
      // Root urls
      if (articlePath === '') {
        rules.push({
          name: 'MediaWikiRootArticlePath',
          pattern: '^(.*)$',
          to: script.replace(/^\//, ''),
          conditional: true,
        });
      } else {
        rules.push({
          name: 'MediaWikiRootArticlePath',
          pattern: '^#{articlePath :rel}(/.*)?$',
          to: script.replace(/^\//, ''),
          conditional: true,
        });
      }
    } else {
      rules.push({
        name: 'MediaWikiArticlePath',
        pattern: '^#{articlePath :rel}(/.*)?$',
        to: script.replace(/^\//, ''),
      });

      if (articlePath !== scriptPath && rootPath !== scriptPath) {
        // If our root path doesn't match the script path we should include a rewrite for the site root
        rules.push({
          name: 'MediaWikiHomepage',
          pattern: '^/*$',
          to: script.replace(/^\//, ''),
        });
      }
    }

    const xml = buildIISWebConfig(rules);
    const content = (
      <>
        <p>
          These rules go inside a <code>web.config</code> file in your document
          root. If a web.config file already exists there ensure it has a{' '}
          <code>{`<rewrite>`}</code> section like below and add the individual{' '}
          <code>{`<rule>`}</code> items to it.
        </p>
        <CodeFile type="xml" content={xml} />
      </>
    );

    instructions.push({ type: 'file', name: 'web.config', content });
  },
};
