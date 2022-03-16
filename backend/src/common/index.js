import lodash from 'lodash';
const { split } = lodash;

export const getDotFileByName = (fileName) => {
  if (!fileName) return '';

  return split(fileName, '.').pop().toLowerCase();
};
