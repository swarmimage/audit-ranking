
import MethodologyModule from "@/components/Method";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("method", "/method");

export default function MethodologyPage() {
  return <MethodologyModule />;
}
