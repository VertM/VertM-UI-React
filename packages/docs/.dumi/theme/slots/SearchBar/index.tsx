import OriginalSearchBar from 'dumi/theme-original/slots/SearchBar';
import { SiteControls } from '../../../../src/components/SiteControls';

/** Inject theme/writing-mode dropdown to the left of the search box. */
export default function SearchBar() {
  return (
    <>
      <SiteControls />
      <OriginalSearchBar />
    </>
  );
}
