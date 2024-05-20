const userDto = (model) => {
  return {
    id: model.id,
    login: model.login,
  };
};

module.exports = {
  userDto,
};
