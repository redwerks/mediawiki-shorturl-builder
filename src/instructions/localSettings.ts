import invariant from 'invariant';
import { createElement, Fragment, ReactElement } from 'react';
import { ServerData } from '../detector/types';
import {
  extractArticlePath,
  extractModPhp,
  extractScript,
  extractScriptExtension,
  extractServerType,
  includeThumbnailHandler,
} from '../extractor';
import { CodeFile } from '../ui/CodeFile';
import { InstructionData } from './makeInstructions';
import { substEnd, substStart } from './utils/php-var-substitution';

/**
 * Generate LocalSettings variables
 */
export function makeLocalSettingsData(
  serverData: ServerData
): Record<string, string | boolean | undefined> {
  const serverType = extractServerType(serverData);
  const script = extractScript(serverData);
  const scriptExt = extractScriptExtension(serverData);

  const localSettings: Record<string, string | boolean | undefined> = {};

  invariant(serverData.scriptpath != null, 'scriptpath was expected');

  localSettings['wgScriptPath'] = serverData.scriptpath;
  localSettings['wgScriptExtension'] = scriptExt;
  if (`${serverData.scriptpath}/index${scriptExt}` !== script) {
    localSettings['wgScript'] = script;
    // Use $wgScriptPath if present
    localSettings['wgScript'] = substStart(
      localSettings['wgScript'],
      '{$wgScriptPath}/',
      `${localSettings['wgScriptPath']}/`
    );
  }

  localSettings['wgArticlePath'] = extractArticlePath(serverData);
  invariant(localSettings['wgArticlePath'], 'articlepath was expected');
  // Use $wgScriptExtension if present
  if (typeof localSettings['wgScript'] === 'string') {
    localSettings['wgScript'] = substEnd(
      localSettings['wgScript'],
      '{$wgScriptExtension}',
      localSettings['wgScriptExtension']
    );
  }
  // Use $wgScriptPath if present
  localSettings['wgArticlePath'] = substStart(
    localSettings['wgArticlePath'],
    '{$wgScriptPath}/',
    `${localSettings['wgScriptPath']}/`
  );

  // Unless this is Apache with mod_php we need `$wgUsePathInfo = true;`
  if (!(serverType === 'apache' && (extractModPhp(serverData) ?? true))) {
    localSettings['wgUsePathInfo'] = true;
  }

  return localSettings;
}

/**
 * Generate LocalSettings instruction
 */
export function makeLocalSettings(serverData: ServerData): InstructionData {
  const localSettings = makeLocalSettingsData(serverData);
  let localSettingsCode = `
	## The URL base path to the directory containing the wiki;
	## defaults for all runtime URL paths are based off of this.
	## For more information on customizing the URLs please see:
	## http://www.mediawiki.org/wiki/Manual:Short_URL
	`.replace(/^\s+/gm, '');
  for (let [varName, val] of Object.entries(localSettings)) {
    if (val === undefined) continue;
    if (val === true) val = 'true';
    else if (val === false) val = 'false';
    else if (typeof val === 'string') {
      // @todo Escape code
      val = `"${val}"`;
    }

    invariant(
      typeof val === 'string',
      `unknown variable type for ${varName} in LocalSettings.php generation code`
    );

    localSettingsCode += '$' + varName + ' = ' + val + ';\n';
  }

  let code: ReactElement = createElement(CodeFile, {
    type: 'php',
    content: localSettingsCode,
  });

  if (includeThumbnailHandler(serverData)) {
    const uploadSettings = `
  ## To enable image uploads, make sure the 'images' directory
  ## is writable, then set this to true:
  $wgEnableUploads  = true;
  $wgGenerateThumbnailOnParse = false;
  `.replace(/^\s+/gm, '');

    code = createElement(
      Fragment,
      {},
      code,
      createElement(CodeFile, {
        type: 'php',
        content: uploadSettings,
      })
    );
  }

  return {
    type: 'file',
    syntax: 'php',
    name: `${serverData.scriptpath}/LocalSettings.php`,
    content: code,
    instruction: 'localsettings',
  };
}
