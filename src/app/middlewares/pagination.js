const calcPagination = (request, response, next) => {
  const { page, pageSize } = request.query;
  if (page && pageSize) {
    request.params = {
        ...request.params,
        offset: page * pageSize,
        limit: pageSize * 1
    };
    }
  next();
};

module.exports = calcPagination;
