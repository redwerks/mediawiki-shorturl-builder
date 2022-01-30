import '../syntax-highlighter/lighttpd';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import sunburst from 'react-syntax-highlighter/dist/esm/styles/hljs/sunburst';

export interface CodeFileProps {
  type: string;
  content: string;
}

/**
 * UI to display the contents of a code file
 */
export const CodeFile = (props: CodeFileProps) => {
  const { type, content } = props;

  return (
    <SyntaxHighlighter language={type} style={sunburst} wrapLongLines>
      {content}
    </SyntaxHighlighter>
  );
};
