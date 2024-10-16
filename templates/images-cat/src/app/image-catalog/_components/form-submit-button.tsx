import { useFormStatus } from "react-dom";

import type { FC } from "react";

type SubmitButtonProps = {
  hasFile: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({ hasFile }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      style={{ minWidth: "16ch" }}
      {...(hasFile && !pending ? {} : { "aria-disabled": true })}
    >
      {pending ? "Uploading…" : "Upload"}
    </button>
  );
};
