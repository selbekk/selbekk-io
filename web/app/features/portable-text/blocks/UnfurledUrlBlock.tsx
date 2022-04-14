import { PreviewLink } from "@opengraphninja/react";

export const UnfurledUrlBlock = (props: any) => {
  if (!props.value.url) {
    return null;
  }
  return <PreviewLink href={props.value.url} />;
};
