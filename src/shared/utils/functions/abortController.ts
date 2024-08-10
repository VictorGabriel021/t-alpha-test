export const getAbortController = (
  setController: React.Dispatch<
    React.SetStateAction<AbortController | undefined>
  >,
) => {
  const controller = new AbortController();
  setController(controller);
  return controller;
};

export const abortControllerHandler = (
  abortController: AbortController | undefined,
) => {
  if (abortController) {
    abortController.abort();
  }
};
