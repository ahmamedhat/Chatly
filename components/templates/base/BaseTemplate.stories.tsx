import BaseTemplate, { IBaseTemplate } from "./BaseTemplate";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockBaseTemplateProps } from "./BaseTemplate.mocks";

export default {
  title: "templates/BaseTemplates",
  component: BaseTemplate,
  argTypes: {},
} as ComponentMeta<typeof BaseTemplate>;

const Template: ComponentStory<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockBaseTemplateProps.base,
} as IBaseTemplate;
