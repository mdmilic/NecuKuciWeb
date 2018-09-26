module.exports = {
  isDevEnv: function () {
    const isDev = process.env.NODE_ENV !== 'production';
    console.log('The current mode is dev ' + isDev);
    return isDev;
  }
};
