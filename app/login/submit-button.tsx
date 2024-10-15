"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button  className="bg-purp text-white py-2 rounded-md hover:text-black"  type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}
