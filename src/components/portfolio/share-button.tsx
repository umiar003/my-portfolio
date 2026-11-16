'use client';
import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';

export function ShareButton({
  href,
  label = 'Copy link',
}: {
  href: string;
  label?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [url, setUrl] = useState('');
  async function copy() {
    const address = new URL(href, window.location.origin).href;
    try {
      await navigator.clipboard.writeText(address);
      setStatus('copied');
    } catch {
      setUrl(address);
      setStatus('manual');
    }
  }
  return (
    <div className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={copy}
        className="portfolio-action"
        aria-label={label}
      >
        {status === 'copied' ? <Check size={16} /> : <LinkIcon size={16} />}{' '}
        {status === 'copied' ? 'Copied!' : label}
      </button>
      <span className="sr-only" role="status">
        {status === 'copied' ? 'Link copied to clipboard' : ''}
      </span>
      {status === 'manual' && (
        <label className="text-xs">
          Copy this address
          <input
            className="mt-1 w-full rounded-lg border p-2"
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
          />
        </label>
      )}
    </div>
  );
}
