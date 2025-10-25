declare module '@shellapp/ui' {
  import * as React from 'react';

  export interface ShellContainerProps {
    children?: React.ReactNode;
    title: string;
    subtitle: string;
  }

  export const ShellContainer: React.FC<ShellContainerProps>;

  export const MainNavigation: React.FC<Record<string, unknown>>;

  export const Button: React.FC<{
    children?: React.ReactNode;
    className?: string;
    appName: string;
  }>;

  export function Card(props: {
    className?: string;
    title: string;
    children: React.ReactNode;
    href: string;
  }): React.ReactElement;

  export function Code(props: {
    children: React.ReactNode;
    className?: string;
  }): React.ReactElement;
}
