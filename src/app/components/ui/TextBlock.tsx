import React, { FC, HTMLAttributes, memo } from 'react';
import { cn } from '@/lib/utils';

interface TextBlockProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  content: string;
  customClass?: string;
}


const TextBlock: FC<TextBlockProps> = memo(({ 
  variant = 'p', 
  content, 
  customClass = '', 
  ...props 
}) => {

 
  const baseClass = 'tracking-tight';

  const sizeMap: Record<string, string> = {
    h1: 'scroll-margin-20 text-4xl font-bold lg:text-5xl',
    h2: 'scroll-margin-16 text-3xl font-bold lg:text-4xl',
    h3: 'scroll-margin-14 text-2xl font-medium lg:text-3xl',
    h4: 'scroll-margin-10 text-xl font-medium lg:text-2xl',
    h5: 'scroll-margin-8 text-lg font-medium lg:text-xl',
    h6: 'scroll-margin-6 text-base font-medium lg:text-lg',
    p: 'leading-7 mt-6:first-of-type',
  };


  const combinedClass = cn(sizeMap[variant], baseClass, customClass);

  
  const Tag = variant;

  return (
    <Tag className={combinedClass} {...props}>
      {content}
    </Tag>
  );
});

TextBlock.defaultProps = {
  variant: 'p',
  customClass: '',
};

export default TextBlock;
