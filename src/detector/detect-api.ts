import Cheerio from 'cheerio';
import xpath from 'xpath';
import { throwDetectionError } from './error';
import { DOMParser } from 'xmldom';

/**
 * Try and detect the url to the wiki's EditRSD
 */
export function detectRsd(html: string, baseUrl: string): string {
  const $ = Cheerio.load(html);
  const rsdUri = $('link[rel="EditURI"][type="application/rsd+xml"][href]')
    .first()
    .attr('href');
  const generator =
    $('meta[name="generator"][content]').first().attr('content') ?? null;

  if (!rsdUri) {
    // No RSD so we can't find the API
    throwDetectionError('NORSD', 'html: Could not find an EditRSD', {
      generator,
    });
  }

  return new URL(rsdUri, baseUrl).href;
}

const isElement = (el: xpath.SelectedValue): el is Element =>
  typeof el === 'object' && 'tagName' in el;

/**
 * Try and detect the API url from the EditRSD xml
 */
export function detectApi(rsd: string, baseUrl: string): string {
  // Trim and erase everything ebfore the first < so we don't bail if there are PHP artifacts
  rsd = rsd.trim().replace(/^[^<]*/, '');

  if (/error code=&quot;readapidenied&quot;/.test(rsd)) {
    // readapidenied error generated by a private wiki
    throwDetectionError('PRIVATEWIKI', 'rsd: got readapidenied error');
  }

  // Parse the RSD
  const doc = new DOMParser({
    errorHandler: {
      warning: () => throwDetectionError('RSD_INVALIDXML', 'rsd: invalid xml'),
      error: () => throwDetectionError('RSD_INVALIDXML', 'rsd: invalid xml'),
      fatalError: () =>
        throwDetectionError('RSD_INVALIDXML', 'rsd: invalid xml'),
    },
  }).parseFromString(rsd, 'application/rsd+xml');
  if (doc.documentElement.tagName !== 'rsd') {
    throwDetectionError('RSD_INVALID', 'rsd: not an <rsd> document');
  }

  // Namespaces
  const select = xpath.useNamespaces({
    rsd: 'http://archipelago.phrasewise.com/rsd',
    // Bug in pre-tarball 1.18
    mwrsd: 'http://www.mediawiki.org/xml/api/',
  });

  // Look for the MediaWiki API link
  const apiLink =
    select('//rsd:api[@name="MediaWiki"][@apiLink]', doc)[0] ||
    select('//mwrsd:api[@name="MediaWiki"][@apiLink]', doc)[0];
  // Check for a for a WordPress API link just in case
  const wordpressApiLink = select(
    '//rsd:api[@name="WordPress"][@apiLink]',
    doc
  )[0];

  if (!isElement(apiLink)) {
    throwDetectionError('RSD_NOAPI', 'rsd: could not find MediaWiki api', {
      wordpress: !!wordpressApiLink,
    });
  }

  return new URL(apiLink.getAttribute('apiLink') as string, baseUrl).href;
}
