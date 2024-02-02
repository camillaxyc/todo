'use client';

import { KeyboardEvent, useRef } from 'react';
import cn from 'clsx';

export const CreateListInput = ({ inputText = '' }) => {
  const test = '';
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <li className={cn('')}>
      <textarea
        maxLength={100}
        ref={textAreaRef}
        defaultValue={inputText}
        placeholder={'Enter a todo'}
        // wrap={'soft'}
        className={cn('resize-none', 'border-transparent bg-gray-50')}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter') {
            textAreaRef.current?.blur();
            // e.currentTarget.blur();
          }
          return false;
        }}
      ></textarea>
    </li>
  );
};
