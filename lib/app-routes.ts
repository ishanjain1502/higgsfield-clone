/** Routes that show Studio / Focus mode switcher under the main nav. */
export function showsModeSwitcher(pathname: string): boolean {
  return (
    pathname.startsWith("/home") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/focus") ||
    pathname.startsWith("/create")
  );
}

export function isStudioModePath(pathname: string): boolean {
  return (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/create")
  );
}

export function isFocusModePath(pathname: string): boolean {
  return pathname.startsWith("/focus");
}
