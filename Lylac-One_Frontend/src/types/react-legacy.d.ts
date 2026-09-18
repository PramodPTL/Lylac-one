import * as React from 'react';

declare module 'react' {
  // Allows legacy generated UI wrappers to be incrementally typed without blocking the application migration.
  function forwardRef(
    render: (props: any, ref: React.Ref<any>) => React.ReactNode,
  ): React.ForwardRefExoticComponent<any>;
}
