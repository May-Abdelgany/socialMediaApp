const normalizeMessage = (message: unknown, locale: string): string | null => {
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (message && typeof message === "object") {
    const typedMessage = message as Record<string, string>;
    return typedMessage[locale] ?? typedMessage.en ?? typedMessage.ar ?? null;
  }

  return null;
};

const getApiErrorMessages = (error: any, locale: string): string[] => {
  const payload = error?.response?.data;

  const validationErrors = Array.isArray(payload?.errors) ? payload.errors : [];
  const validationMessages = validationErrors
    .map((item: any) => normalizeMessage(item?.message, locale))
    .filter((message: string | null): message is string => Boolean(message));

  if (validationMessages.length > 0) {
    return validationMessages;
  }

  const directMessage = normalizeMessage(payload?.message, locale);
  if (directMessage) {
    return [directMessage];
  }

  return ["Something went wrong"];
};

export default getApiErrorMessages;
