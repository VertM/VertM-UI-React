import { SiteControls } from './SiteControls';

/** Sticky global toolbar — one switcher for the whole docs site. */
export function GlobalControls() {
  return (
    <div className="vertm-global-controls" role="region" aria-label="文档站主题与书写模式">
      <div className="vertm-global-controls__inner">
        <SiteControls />
      </div>
    </div>
  );
}

export default GlobalControls;
