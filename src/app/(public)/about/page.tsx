import AboutModule from "@/modules/AboutModule";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("about", "/about");

export default function AboutPage() {
  return <AboutModule />;
}
