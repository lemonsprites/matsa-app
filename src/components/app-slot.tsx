import useDocumentTitle from '@/hooks/useDocumentTitle';

const AppSlot = (props: { title?: string; element: JSX.Element }) => {
  const prefix = "MatsaApp | ";
  const title = props.title?.trim() || "Default Page Title"; // Use fallback if title is undefined

  useDocumentTitle(`${prefix}${title}`);

  return props.element;
};

export default AppSlot;