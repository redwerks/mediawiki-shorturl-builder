import '../syntax-highlighter/lighttpd';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import sunburst from 'react-syntax-highlighter/dist/esm/styles/hljs/sunburst';
import { styled } from '@mui/material';

const PreTag = styled('pre', { name: 'CodeFile', slot: 'PreTag' })(
  ({ theme }) => ({ borderRadius: theme.shape.borderRadius })
);
const CodeTag = styled('code', { name: 'CodeFile', slot: 'CodeTag' })({});

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
    <SyntaxHighlighter
      language={type}
      style={sunburst}
      wrapLongLines
      PreTag={PreTag}
      CodeTag={CodeTag}
    >
      {content.trimEnd()}
    </SyntaxHighlighter>
  );
};
