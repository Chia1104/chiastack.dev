export const setNamespace = <TPayload>(namespace: string) => {
  return (type: string, payload?: TPayload) => {
    const name = [namespace, type].filter(Boolean).join("/");
    return payload
      ? {
          payload,
          type: name,
        }
      : name;
  };
};
