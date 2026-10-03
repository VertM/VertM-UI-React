import { Link, useLocale } from 'dumi';
import React from 'react';

/** Brand mark: VertM + gilt “ UI” (site-visual-spec §4.1). */
export default function Logo() {
  const locale = useLocale();
  return (
    <Link className="dumi-default-logo" to={'base' in locale ? locale.base : '/'}>
      VertM<span> UI</span>
    </Link>
  );
}
