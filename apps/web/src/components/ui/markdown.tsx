import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';

export const Markdown = memo(function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ReactMarkdown
      className={cn('prose dark:prose-invert max-w-none', className)}
      remarkPlugins={[remarkGfm]}
      components={{
        // react-markdown v8+ removed the `inline` prop.
        // Detect inline code by checking whether the parent is a <pre> block:
        // if the code element has no language class it's inline.
        code({ node: _node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const isBlock = Boolean(match);
          return isBlock ? (
            <SyntaxHighlighter language={match![1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
});
