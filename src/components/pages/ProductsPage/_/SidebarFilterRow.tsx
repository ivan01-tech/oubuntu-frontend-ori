import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React, { FC, ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  children: ReactNode;
};

const SidebarFilterRow: FC<Props> = ({ children, title, value }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger className="font-bold text-black">
          {title}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default SidebarFilterRow;
