import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'highlight.js';

function lighttpd() {
  var LIGHTTPD_IDENT_RE = '[-a-zA-Z.]+';
  var LIGHTTPD_FIELD_RE = '\\$[a-zA-Z]+'; //\\["[-a-zA-Z]+"\\]';

  var COMMENT = {
    className: 'comment',
    begin: '#',
    end: '$',
  };
  var STRING = {
    className: 'string',
    begin: '"',
    end: '"',
  };
  var INTEGER = {
    className: 'number',
    begin: '(\\b[0-9]+)',
  };
  var BOOLEAN = {
    className: 'keyword',
    begin: '"(en|dis)able"',
    relevance: 2,
  };
  var NAME = {
    className: 'variable',
    begin: LIGHTTPD_IDENT_RE,
    relevance: 0,
  };
  var ARRAY = {
    className: 'array',
    begin: '\\(',
    end: '\\)',
  };
  var VALUE = [COMMENT, STRING, INTEGER, BOOLEAN, NAME, ARRAY];
  ARRAY.contains = VALUE;

  var OPTION = {
    className: 'option',
    begin: LIGHTTPD_IDENT_RE + '[ \\t]*=[ \\t]*',
    end: '$',
    contains: VALUE,
    returnBegin: true,
  };
  var MERGE = {
    className: 'option',
    begin: LIGHTTPD_IDENT_RE + '[ \\t]*\\+=[ \\t]*',
    end: '$',
    contains: VALUE,
    returnBegin: true,
  };
  var INCLUDE = {
    className: 'keyword',
    begin: 'include[ \\t]+',
    end: '$',
    contains: VALUE,
  };
  var INCLUDE_SHELL = {
    className: 'keyword',
    begin: 'include_shell[ \\t]+',
    end: '$',
    contains: [COMMENT, STRING],
  };
  var STATEMENTS = [
    COMMENT,
    OPTION,
    MERGE,
    INCLUDE,
    INCLUDE_SHELL,
    // Since implementing lighttpd's conditions is to troublesome
    {
      className: 'variable',
      begin: LIGHTTPD_FIELD_RE,
    },
    STRING,
  ];

  var GLOBAL = {
    className: 'global',
    begin: 'global[ \\t]*\\{',
    end: '\\}',
    relevance: 2,
    returnBegin: true,
    contains: STATEMENTS.concat([
      {
        begin: 'global[ \\t]*\\{',
        keywords: { global: 1 },
      },
    ]),
  };

  return {
    name: 'Lighttpd',
    contains: STATEMENTS.concat([GLOBAL]),
  };
}

SyntaxHighlighter.registerLanguage('lighttpd', lighttpd);
