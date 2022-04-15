import type { LinkProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as RemixLink } from "remix";

type TextLinkProps = LinkProps & {
  /** The URL */
  href: string;
  prefetch?: "intent" | "render" | "none";
};
/** Link to be used with inline text
 *
 * Will automatically pick the correct link format based on whether it's internal or external
 */
export const TextLink: React.FC<TextLinkProps> = ({
  href,
  children,
  prefetch,
  ...rest
}) => {
  if (/^(mailto:|https?:\/\/)/.test(href)) {
    return (
      <Link
        textDecoration="underline"
        _hover={{ textDecoration: "none" }}
        href={href}
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      as={RemixLink}
      to={href}
      prefetch={prefetch}
      textDecoration="underline"
      _hover={{ textDecoration: "none" }}
      {...rest}
    >
      {children}
    </Link>
  );
};
