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

const shouldAddTrailingSlash =
  process.env.NODE_ENV === "production" || Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export const withBasePathAndSlash = (path: string) => {
  const hashIndex = path.indexOf("#");
  const queryIndex = path.indexOf("?");
  const splitIndex = Math.min(
    ...[hashIndex, queryIndex].filter((i) => i !== -1),
    Infinity
  );
  const basePath = splitIndex === Infinity ? path : path.slice(0, splitIndex);
  const suffix = splitIndex === Infinity ? "" : path.slice(splitIndex);

  const withBase = withBasePath(basePath);
  if (!shouldAddTrailingSlash || withBase.endsWith("/")) {
    return `${withBase}${suffix}`;
  }

  return `${withBase}/${suffix}`;
};
