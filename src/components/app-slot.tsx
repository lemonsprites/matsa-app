import React from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const AppSlot = (props: { title?: string; children: React.ReactNode }) => {
  const prefixWithTitle = " | MTsN 1 Ciamis - MatsaApp";
  const prefixWithoutTitle = "MTsN 1 Ciamis - MatsaApp";
  const title = props.title?.trim() || ""; // Use fallback if title is undefined

  // Set the document title dynamically
  (title) ? useDocumentTitle(`${title}${prefixWithTitle}`) : useDocumentTitle(`${title}${prefixWithoutTitle}`);

  return <>{props.children}</>; // Render children dynamically
};

export default AppSlot;
