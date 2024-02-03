'use client';

import { KeyboardEvent, useRef } from 'react';
import cn from 'clsx';

export const CreateListInput = ({ inputText = '' }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const autoExpand = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };
  return (
    <li className={cn('m-8')}>
      <textarea
        maxLength={100}
        ref={textAreaRef}
        defaultValue={inputText}
        placeholder={'Enter a todo'}
        // wrap={'soft'}
        className={cn(
          'w-full',
          'resize-none overflow-hidden',
          'border-transparent bg-gray-50 py-0 align-top',
        )}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter') {
            textAreaRef.current?.blur();
            // e.currentTarget.blur();
          }
          return false;
        }}
        rows={1}
        onInput={(e) => autoExpand(e)}
      ></textarea>
    </li>
  );
};
