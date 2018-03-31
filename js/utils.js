export const getElementFromTemplate = (template) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, `text/html`);
  return doc.body.firstElementChild;
};

export const showTemplate = (template) => {
  const appContainer = document.querySelector(`.app`);
  const mainContainer = appContainer.querySelector(`.main`);
  appContainer.replaceChild(template, mainContainer);
};
