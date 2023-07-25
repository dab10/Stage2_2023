const isElementHasClassName = (
  element: HTMLElement,
  className: string,
): boolean => element.classList?.contains(className);

export default isElementHasClassName;
