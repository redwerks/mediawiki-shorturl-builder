import endent from 'endent';
import invariant from 'invariant';
import {
  extractArticlePath,
  extractHashedUploads,
  extractRootPath,
  extractScript,
  extractScriptPath,
  extractServerType,
} from '../../extractor';
import { extractThumbPhp } from '../../extractor/extractThumbPhp';
import { includeThumbnailHandler } from '../../extractor/includeThumbnailHandler';
import { relativePath } from '../../extractor/relativePath';
import { CodeFile } from '../../ui/CodeFile';
import { ServerInstructions } from '../ServerInstructions';

function lighttpdValueQuote(val: unknown): string {
  invariant(
    typeof val === 'string' || typeof val === 'number',
    'Unknown value type for conversion to lighttpd format'
  );
  return JSON.stringify(val);
}
export const lighttpd: ServerInstructions = {
  serverTypes: ['lighttpd', 'lighttpd14'],
  addServerInstructions(serverData, instructions) {
    const serverType = extractServerType(serverData);
    const articlePath = extractArticlePath(serverData)?.replace('/$1', '');
    const script = extractScript(serverData);
    const scriptPath = extractScriptPath(serverData);
    const rootPath = extractRootPath(serverData);
    const hashedUploads = extractHashedUploads(serverData);

    const lines = [];
    const lighttpd: Record<string, Record<string, string>> = {};

    lines.push('# [...]');
    lines.push('');
    lines.push('## MediaWiki');

    lighttpd['url.rewrite-once'] = {};
    lighttpd['url.rewrite-if-not-file'] = {};

    if (articlePath === rootPath) {
      // Root urls
      if (articlePath === '') {
        lighttpd['url.rewrite-if-not-file']['^/'] = script;
      } else {
        lighttpd['url.rewrite-if-not-file'][`^${articlePath}(/|$)`] = script;
      }
    } else {
      lighttpd['url.rewrite-once'][`^${articlePath}(/|$)`] = script;
      if (articlePath !== scriptPath && rootPath !== scriptPath) {
        // If our root path doesn't match the script path we should include a rewrite for the site root
        lighttpd['url.rewrite-once'][`^/${relativePath(rootPath)}$`] = script;
      }
    }

    if (includeThumbnailHandler(serverData)) {
      const thumbPhp = extractThumbPhp(serverData);

      lighttpd['url.rewrite-if-not-file'][
        `^${scriptPath}/images/thumb/${
          hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : ''
        }([^/]+)/([0-9]+)px-.*$`
      ] = `${thumbPhp}?f=$1&width=$2`;
      lighttpd['url.rewrite-if-not-file'][
        `^${scriptPath}/images/thumb/archive/${
          hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : ''
        }([^/]+)/([0-9]+)px-.*$`
      ] = `${thumbPhp}?f=$1&width=$2&archived=1`;
    }

    for (const [blockName, block] of Object.entries(lighttpd)) {
      if (!Object.entries(block).length) continue;
      lines.push(`${blockName} = (`);
      for (const [key, value] of Object.entries(block)) {
        lines.push(
          `	${lighttpdValueQuote(key)} => ${lighttpdValueQuote(value)},`
        );
      }
      lines.push(')');
    }
    // 404 Thumbnail handler (for later)
    // url.rewrite-if-not-file = (
    // )
    // 404 Error handler (for later)
    // server.error-handler-404 = "/index.php"

    // access.deny-all = "enable" # in 1.5.x+
    // url.access-deny = ("") # in 1.4.x and before
    const denyall =
      serverType === 'lighttpd14'
        ? `url.access-deny = ("")`
        : `access.deny-all = "enable"`;

    const config = endent`
      # Protect against bug 28235 (ported from MediaWiki's .htaccess file)
      $HTTP["url"] =~ "^${scriptPath}/images/" {
        $HTTP["querystring"] =~ "\\.[^\\\\/:*?\\x22<>|%]+(#|\\?|$)" {
          ${denyall}
        }
      }
      
      # Deny access to deleted images folder"
      $HTTP["url"] =~ "^${scriptPath}/images/deleted(/|$)" {
        ${denyall}
      }
      
      # Deny access to folders MediaWiki has a .htaccess deny in"
      $HTTP["url"] =~ "^${scriptPath}/(cache|languages|maintenance|serialized)(/|$)" {
        ${denyall}
      }
      
      # Just in case, hide .svn and .git too
      $HTTP["url"] =~ "/.(svn|git)(|$)" {
        ${denyall}
      }
      
      # Hide any .htaccess files
      $HTTP["url"] =~ "(^|/).ht" {
        ${denyall}
      }
      
      # Uncomment the following code if you wish to hide the installer/updater
      ## Deny access to the installer
      #$HTTP["url"] =~ "^${scriptPath}/mw-config(/|$)" {
      #	${denyall}
      #}`;

    lines.push('');
    lines.push(...config.split('\n'));
    lines.push('');
    lines.push('# [...]');
    lines.push('');

    const content = (
      <>
        <p>
          This config should be mixed in with the rest of your lighttpd
          configuration. If you already wrap your MediaWiki\'s setup inside of a
          block such as a <code>{'$HTTP["host"]'}</code> test then you should
          place this configuration inside of that block.
        </p>

        <CodeFile type="lighttpd" content={lines.join('\n')} />
      </>
    );

    instructions.push({
      type: 'file',
      name: 'lighttpd.conf',
      content,
    });
  },
};
