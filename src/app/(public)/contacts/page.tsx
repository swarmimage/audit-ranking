
import ContactModule from "@/modules/ContactModule";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("contacts", "/contacts");

export default function ContactPage() {
  return <ContactModule />;
}
