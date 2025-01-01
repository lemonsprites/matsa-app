const ongoingRequests = new Set<string>();

export const apiGuardMiddleware = async (key: string, fetchFunction: () => Promise<any>) => {
  if (ongoingRequests.has(key)) {
    console.log(`GET '${key}' is already in progress.`);
    return null;
  }

  ongoingRequests.add(key);
  try {
    const result = await fetchFunction();
    return result;
  } finally {
    ongoingRequests.delete(key);
  }
};
