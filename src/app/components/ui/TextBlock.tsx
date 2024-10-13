import React, { FC, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type TextBlockVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type TextBlockColor = 'default' | 'primary' | 'secondary' | 'muted';

interface TextBlockProps {
  variant?: TextBlockVariant;
  color?: TextBlockColor;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}

const variantClassNames: Record<TextBlockVariant, string> = {
  h1: 'scroll-m-24 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl',
  h3: 'scroll-m-16 text-2xl font-semibold tracking-tight lg:text-3xl',
  h4: 'scroll-m-12 text-xl font-semibold tracking-tight lg:text-2xl',
  h5: 'scroll-m-10 text-lg font-semibold tracking-tight lg:text-xl',
  h6: 'scroll-m- text-base font-semibold tracking-tight lg:text-lg',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  span: 'inline-block',
};

const colorClassNames: Record<TextBlockColor, string> = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
};

const TextBlock: FC<TextBlockProps> = ({
  variant = 'p',
  color = 'default',
  className,
  children,
  as,
  ...props
}) => {
  const Component = as || variant;
  
  return (
    <Component 
      className={cn(
        variantClassNames[variant],
        colorClassNames[color],
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default TextBlock;