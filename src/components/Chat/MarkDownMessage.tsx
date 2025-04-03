import React, { useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../../components/Theme/useTheme';
import { STOCK_TICKERS } from '../../lib/constants';

interface MemoizedMarkdownMessageProps {
  content: string;
}

export const MemoizedMarkdownMessage: React.FC<MemoizedMarkdownMessageProps> = ({ content }) => {
  const { textPrimary, textSecondary, codeBg, codeText, codeBorder, bgTertiary } = useTheme();

  const tickerRegex = useMemo(() => new RegExp(`\\b(${STOCK_TICKERS.join("|")})\\b`, "gi"), []);

  const tickerHighlight = useCallback((text: string) => {
    return text.replace(
      tickerRegex,
      (match) => `<span class="${bgTertiary} px-1 rounded">${match}</span>`
    );
  }, [bgTertiary, tickerRegex]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => (
          <p 
            className={`mb-2 ${textPrimary}`} 
            dangerouslySetInnerHTML={{ __html: tickerHighlight((props.children ?? "").toString()) }}
          />
        ),
        a: ({ node, ...props }) => <a className={`underline ${textSecondary}`} target="_blank" rel="noopener noreferrer" {...props} />,
        ul: ({ node, ...props }) => <ul className={`list-disc pl-5 mb-3 ${textPrimary}`} {...props} />,
        ol: ({ node, ...props }) => <ol className={`list-decimal pl-5 mb-3 ${textPrimary}`} {...props} />,
        li: ({ node, ...props }) => <li className={`mb-1 ${textPrimary}`} {...props} />,
        code: ({ node, ...props }) => (
          <code className={`${codeBg} ${codeText} p-1 rounded text-sm font-mono`} {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className={`${codeBg} ${codeText} p-3 rounded-md overflow-x-auto my-3 ${codeBorder} border`} {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        h1: ({ node, ...props }) => <h1 className={`text-2xl font-bold mt-4 mb-2 ${textPrimary}`} {...props} />,
        h2: ({ node, ...props }) => <h2 className={`text-xl font-bold mt-4 mb-2 ${textPrimary}`} {...props} />,
        h3: ({ node, ...props }) => <h3 className={`text-lg font-bold mt-3 mb-1 ${textPrimary}`} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};