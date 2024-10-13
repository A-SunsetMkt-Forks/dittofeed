import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

import { TextMenu } from "./components/textMenu";
import { getExtensions } from "./tipTapExtensions";
import { UserProperty } from "./tipTapExtensions/userProperty/utils";
import { EmailoJsonContent, EmailoState } from "./types";
import { cn } from "./utils";

export { toMjml } from "./toMjml";

export * from "./types";

export function useEmailo({
  content,
  userProperties,
}: {
  content: string | EmailoJsonContent;
  userProperties: [UserProperty, ...UserProperty[]];
}): EmailoState {
  const extensions = getExtensions({ userProperties });
  const editor = useEditor({
    extensions,
    content,
  });
  if (!editor) {
    throw new Error("No editor found");
  }
  return { editor };
}

// eslint-disable-next-line react/require-default-props
export function Emailo({
  className,
  state,
}: {
  className?: string;
  state: EmailoState;
}) {
  return (
    <div className={cn("emailo", className)}>
      <EditorContent editor={state.editor} />
      <TextMenu state={state} />
    </div>
  );
}
