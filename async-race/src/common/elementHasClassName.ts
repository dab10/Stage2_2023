const elementHasClassName = (
  element: HTMLElement,
  className: string,
): boolean => element.classList?.contains(className);

export default elementHasClassName;
