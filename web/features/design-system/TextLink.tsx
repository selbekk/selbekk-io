import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

type TextLinkProps = LinkProps & {
  /** The URL */
  href: string;
};
/** Link to be used with inline text
 *
 * Will automatically pick the correct link format based on whether it's internal or external
 */
export const TextLink: React.FC<TextLinkProps> = ({
  href,
  children,
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
    <NextLink href={href} passHref>
      <Link
        textDecoration="underline"
        _hover={{ textDecoration: "none" }}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  );
};
