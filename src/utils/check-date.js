const formatDate = (value) => {
  const date = new Date(value);
  return !(date < new Date());
};

module.exports = {
  formatDate,
};
