export default ({config}) => {
  // This is how you can distinguish the `build` command from the `serve`
  // const isBuild = config.mode === 'production';

  return {
    ...config,
    output: {
      ...config.output,
      publicPath: '',
    },
  };
}
