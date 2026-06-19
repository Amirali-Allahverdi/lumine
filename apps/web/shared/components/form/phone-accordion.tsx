import { Handset } from "@gravity-ui/icons";
import { Accordion, Chip, Surface } from "@heroui/react";

export const PhoneAccordion = () => {
  return (
    <Accordion variant="surface" className={`border border-border`}>
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            در صورت بروز هرگونه مشکل یا سوال تماس بگیرید
            <Accordion.Indicator className="mr-4" />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Surface
              variant="secondary"
              className="rounded-2xl p-4 flex justify-between items-center"
            >
              <div className="flex gap-2">
                <p>شماره تماس</p>
                <Chip variant="soft" color="success">
                  24/7
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <p>09333352650</p>
                <Handset />
              </div>
            </Surface>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
