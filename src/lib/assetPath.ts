const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export const withBasePath = (path: string) => {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  if (!basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
};

const shouldAddTrailingSlash = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export const withBasePathAndSlash = (path: string) => {
  const withBase = withBasePath(path);
  if (!shouldAddTrailingSlash || withBase.endsWith("/")) {
    return withBase;
  }

  return `${withBase}/`;
};
