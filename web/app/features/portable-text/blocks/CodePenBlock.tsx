export const CodePenBlock = (props: any) => {
  if (!props.value.url) {
    return null;
  }
  const url = new URL(props.value.url);
  if (url.hostname !== "codepen.io") {
    console.error(
      `The URL provided was not a CodePen URL. Instead, it was "${url}"`
    );
    return null;
  }
  let [, username, , id] = url.pathname.split("/");
  if (!id) {
    console.error("Could not find the CodePen id from the URL", url);
    return null;
  }
  return (
    <iframe
      title={id}
      height="265"
      style={{ width: "100%" }}
      scrolling="no"
      src={`https://codepen.io/${username}/embed/preview/${id}?height=265&theme-id=light&default-tab=css,result`}
      frameBorder="no"
      allowTransparency
      allowFullScreen
    />
  );
};
