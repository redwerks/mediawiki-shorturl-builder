/** @jsxRuntime classic /
/** @jsx JSXXML */
import { JSXNode, JSXXML, render as renderXML } from 'jsx-xml';
type JSXChildren = JSX.Element | (JSX.Element | undefined)[];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      configuration: { children?: JSXChildren };
      'system.webServer': { children?: JSXChildren };
      rewrite: { children?: JSXChildren };
      rules: { children?: JSXChildren };
      rule: {
        name?: string;
        enabled?: string;
        stopProcessing?: string;
        children?: JSXChildren;
      };
      match: { url?: string };
      action: {
        type?: string;
        url?: string;
        appendQueryString?: string;
        logRewrittenUrl?: string;
        children?: JSXChildren;
      };
      conditions: { children?: JSXChildren };
      add: {
        input?: string;
        matchType?: string;
        negate?: string;
      };
    }
  }
}

export interface RewriteRule {
  name: string;
  pattern: string;
  to: string;
  conditional?: boolean;
}

/**
 * Build an IIS web.config XML file from a list of rewrite rules
 */
export function buildIISWebConfig(rules: RewriteRule[]): string {
  const SystemWebServer = 'system.webServer';
  const doc: JSX.Element = (
    <configuration>
      <SystemWebServer>
        <rewrite>
          <rules>
            {rules.map((rule) => (
              <rule name={rule.name} enabled="true" stopProcessing="true">
                <match url={rule.pattern} />
                <action
                  type="Rewrite"
                  url={rule.to}
                  appendQueryString="true"
                  logRewrittenUrl="false"
                />
                {rule.conditional ? (
                  <conditions>
                    <add
                      input="{REQUEST_FILENAME}"
                      matchType="IsFile"
                      negate="true"
                    />
                    <add
                      input="{REQUEST_FILENAME}"
                      matchType="IsDirectory"
                      negate="true"
                    />
                  </conditions>
                ) : undefined}
              </rule>
            ))}
          </rules>
        </rewrite>
      </SystemWebServer>
    </configuration>
  );

  return renderXML(doc as any as JSXNode, {
    doctype: { encoding: 'UTF-8' },
    endOptions: { pretty: true },
  });
}
