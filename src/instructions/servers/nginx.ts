import {
  extractArticlePath,
  extractHashedUploads,
  extractRootPath,
  extractScript,
  extractScriptExtension,
  extractScriptPath,
} from '../../extractor';
import { extractThumbPhp } from '../../extractor/extractThumbPhp';
import { includeThumbnailHandler } from '../../extractor/includeThumbnailHandler';
import { ServerInstructions } from '../ServerInstructions';
import { createElement } from 'react';
import { CodeFile } from '../../ui/CodeFile';
import { extractFcgi } from '../../extractor/extractFcgi';

export const nginx: ServerInstructions = {
  serverTypes: ['nginx'],
  addServerInstructions(serverData, instructions) {
    const articlePath = extractArticlePath(serverData)?.replace('/$1', '');
    const script = extractScript(serverData);
    const scriptPath = extractScriptPath(serverData);
    const scriptExt = extractScriptExtension(serverData);
    const rootPath = extractRootPath(serverData);
    const hashedUploads = extractHashedUploads(serverData);
    const { fcgiParams = '[...]', fcgiPass } = extractFcgi(serverData);

    const documentroot = '$document_root';

    const lines = [];

    lines.push('server {');
    lines.push('	# [...]');
    lines.push('');
    lines.push("	# Location for the wiki's root");
    lines.push(`	location ${scriptPath}/ {`);
    if (articlePath === rootPath) {
      // Root path
      lines.push('		try_files $uri $uri/ @mediawiki;');
      lines.push('		');
    }
    lines.push('		# Do this inside of a location so it can be negated');
    lines.push(`		location ~ \\${scriptExt}$ {`);
    lines.push(
      "			try_files $uri $uri/ =404; # Don't let php execute non-existent php files"
    );
    lines.push(`			include ${fcgiParams};`);
    lines.push(`			fastcgi_pass ${fcgiPass};`);
    lines.push('		}');
    lines.push('	}');
    lines.push('	');
    lines.push(`	location ${scriptPath}/images {`);
    lines.push("		# Separate location for images/ so .php execution won't apply");
    if (includeThumbnailHandler(serverData)) {
      lines.push('		');
      lines.push(
        `		location ~ ^${scriptPath}/images/thumb/(archive/)?${
          hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : ''
        }([^/]+)/([0-9]+)px-.*$ {`
      );
      lines.push('			# Thumbnail handler for MediaWiki');
      lines.push("			# This location only matches on a thumbnail's url");
      lines.push(
        '			# If the file does not exist we use @thumb to run the thumb.php script'
      );
      lines.push('			try_files $uri $uri/ @thumb;');
      lines.push('		}');
    }
    lines.push('	}');
    lines.push(`	location ${scriptPath}/images/deleted {`);
    lines.push('		# Deny access to deleted images folder');
    lines.push('		deny	all;');
    lines.push('	}');
    lines.push('	');
    lines.push('	# Deny access to folders MediaWiki has a .htaccess deny in');
    lines.push(`	location ${scriptPath}/cache       { deny all; }`);
    lines.push(`	location ${scriptPath}/languages   { deny all; }`);
    lines.push(`	location ${scriptPath}/maintenance { deny all; }`);
    lines.push(`	location ${scriptPath}/serialized  { deny all; }`);
    lines.push('	');
    lines.push('	# Just in case, hide .svn and .git too');
    lines.push('	location ~ /.(svn|git)(/|$) { deny all; }');
    lines.push('	');
    lines.push('	# Hide any .htaccess files');
    lines.push('	location ~ /.ht { deny all; }');
    lines.push('	');
    lines.push(
      '	# Uncomment the following code if you wish to hide the installer/updater'
    );
    lines.push('	## Deny access to the installer');
    lines.push(`	#location ${scriptPath}/mw-config { deny all; }`);
    lines.push('	');
    lines.push('	# Handling for the article path');
    if (articlePath === rootPath) {
      lines.push('	location @mediawiki {');
    } else {
      lines.push(`	location ${articlePath} {`);
    }
    lines.push(`		include ${fcgiParams};`);
    lines.push('		# article path should always be passed to index.php');
    lines.push(`		fastcgi_param SCRIPT_FILENAME	${documentroot}${script};`);
    lines.push(`		fastcgi_pass  ${fcgiPass};`);
    lines.push('	}');
    if (includeThumbnailHandler(serverData)) {
      const thumbPhp = extractThumbPhp(serverData);

      lines.push('	');
      lines.push(
        '	# Thumbnail 404 handler, only called by try_files when a thumbnail does not exist'
      );
      lines.push('	location @thumb {');
      lines.push(
        '		# Do a rewrite here so that thumb.php gets the correct arguments'
      );
      lines.push(
        `		rewrite ^${scriptPath}/images/thumb/${
          hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : ''
        }([^/]+)/([0-9]+)px-.*$ ${thumbPhp}?f=$1&width=$2;`
      );
      lines.push(
        `		rewrite ^${scriptPath}/images/thumb/archive/${
          hashedUploads ? '[0-9a-f]/[0-9a-f][0-9a-f]/' : ''
        }([^/]+)/([0-9]+)px-.*$ ${thumbPhp}?f=$1&width=$2&archived=1;`
      );
      lines.push('		');
      lines.push('		# Run the thumb.php script');
      lines.push(`		include ${fcgiParams};`);
      lines.push(`		fastcgi_param SCRIPT_FILENAME	${documentroot}${thumbPhp};`);
      lines.push(`		fastcgi_pass  ${fcgiPass};`);
      lines.push('	}');
    }
    lines.push('	');
    lines.push('	# [...]');
    lines.push('}');
    lines.push('');

    instructions.push({
      type: 'file',
      syntax: 'nginx',
      name: 'nginx.conf',
      content: createElement(CodeFile, {
        type: 'nginx',
        content: lines.join('\n'),
      }),
      instruction: 'nginxconfig',
    });
  },
};
