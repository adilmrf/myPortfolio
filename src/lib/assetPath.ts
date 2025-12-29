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
