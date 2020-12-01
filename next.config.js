module.exports = {
  excludeFile: (str) => /\*.{spec,test}.tsx/.test(str),
};
