'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@/components/ui/dialog';


export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function handleOpenChange() {
    router.back();
  }

  return <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
    <DialogOverlay>
      <DialogContent className="overflow-y-hidden">
        {children}
      </DialogContent>
    </DialogOverlay>
  </Dialog>
}
