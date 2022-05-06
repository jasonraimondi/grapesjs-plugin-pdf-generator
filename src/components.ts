export default (editor: any, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('MY-COMPONENT', {
    model: {
      defaults: {
        // Default props
      },
    },
    view: {

    },
  });
};
