import { useRef, useEffect } from 'react';

function useDocumentTitle(title: string, prevailOnUnmount: boolean = false): void {
  const defaultTitle = useRef<string>(document.title); // Strongly typed as string

  useEffect(() => {
    // Set the document title when `title` changes
    document.title = title;
  }, [title]);

  useEffect(() => {
    // Reset to the original title when the component unmounts
    return () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, [prevailOnUnmount]);
}

export default useDocumentTitle;
