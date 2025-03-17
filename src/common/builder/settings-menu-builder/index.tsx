// Create the helper
function createSettingsMenuHelper(): SettingsMenuHelperType {
  return {
    createItem: (config) => ({
      type: "item",
      ...config,
    }),

    createLink: (config) => ({
      type: "link",
      ...config,
    }),

    createGroup: (items) => ({
      type: "group",
      items,
    }),

    createSeparator: () => ({
      type: "separator",
    }),

    createLabel: ({ component, props = {}, className }) => ({
      type: "label",
      component,
      props,
      className,
    }),
  };
}

export default createSettingsMenuHelper;
