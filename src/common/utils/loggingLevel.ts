export const loggingLevel = (val?: string) => {
  switch (val) {
    case '0':
      return 'fatal';
    case '1':
      return 'error';
    case '2':
      return 'warn';
    case '3':
      return 'info';
    case '4':
      return 'debug';
    case '5':
      return 'trace';
    default:
      return 'info';
  }
};
