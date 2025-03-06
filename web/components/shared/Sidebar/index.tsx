import { Sidebar } from "@/components/ui/sidebar";
import { HeaderBlock } from "./HeaderBlock";
import { FooterBlock } from "./FooterBlock";
import { ContentBlock } from "./ContentBlock";

export default async function HomeSidebar() {
  return (
    <Sidebar>
      <HeaderBlock />

      <ContentBlock />

      {/* <FooterBlock /> */}
    </Sidebar>
  );
}
