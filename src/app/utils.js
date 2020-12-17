export default function CreateDomElement(type, name) {
  const element = document.createElement(type);
  element.className = name;
  return element;
}
