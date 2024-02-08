import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ToDoList } from './TodoList';
import cn from 'clsx';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Todo Homepage',
};

export default function Page() {
  return (
    <main className={cn('flex min-h-screen flex-col', 'p-6')}>
      <div
        className={cn(
          'flex h-20 shrink-0 items-end',
          'p-4 md:h-20',
          'rounded-lg bg-blue-500',
        )}
      >
        <h1 className="text-xl text-white antialiased md:text-3xl">Todo</h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div
          className={cn(
            'flex flex-col',
            'md:w-2/5 md:px-10',
            'rounded-lg bg-gray-50',
            'gap-6 px-6 py-10',
          )}
        >
          <p
            className={cn(
              `${lusitana.className}`,
              'text-xl text-gray-800 antialiased',
              'md:text-3xl md:leading-normal',
            )}
          >
            <strong>To-do list for Today</strong>
          </p>
          <ToDoList />
          {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
