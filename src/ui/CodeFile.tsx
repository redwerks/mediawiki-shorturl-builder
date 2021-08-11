export interface CodeFileProps {
  type: string;
  content: string;
}

/**
 * UI to display the contents of a code file
 */
export const CodeFile = (props: CodeFileProps) => {
  const { content } = props;

  return (
    <pre>
      <code>{content}</code>
    </pre>
  );
};
