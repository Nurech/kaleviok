import { WithStylesheet } from '../types';

/**
 * Applies a stringified CSS theme to a document or shadowroot by creating or
 * reusing a constructable stylesheet. It also saves the themeString to
 * localstorage.
 *
 * NOTE: This function is inlined into the head of the document for performance
 * reasons as well as used by material-color-helpers which is lazily loaded. So
 * do not overload this file with slow logic since it will block render.
 *
 * @param doc Document or ShadowRoot to apply theme.
 * @param themeString Stringified CSS of a material theme to apply to the given
 *     document or shadowroot.
 * @param ssName Optional global identifier of the constructable stylesheet and
 *     used to generate the localstorage name.
 */
export function applyThemeString(
  doc: DocumentOrShadowRoot,
  themeString: string,
  ssName = 'material-theme'
) {
  // Get constructable stylesheet
  let sheet = (globalThis as WithStylesheet)[ssName];
  // Create a new sheet if it doesn't exist already and save it globally.
  if (!sheet) {
    sheet = new CSSStyleSheet();
    (globalThis as WithStylesheet)[ssName] = sheet;
    doc.adoptedStyleSheets.push(sheet);
  }

  // Set the color of the URL bar
  const surfaceContainer = themeString.match(
    /--sys-surface-container:(.+?);/
  )?.[1];
  if (surfaceContainer) {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', surfaceContainer);
  }

  sheet.replaceSync(themeString);
  localStorage.setItem(ssName, themeString);
}
