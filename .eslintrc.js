module.exports = {
  extends: ['react-app', 'react-app/jest'],
  overrides: [
    {
      files: ['api/**/*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
