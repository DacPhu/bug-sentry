module.exports = {
    paginate: function(req, defaultPage = 1, defaultSize = 10) {
        const page = parseInt(req.query.page?req.query.page:defaultPage);
        const size = parseInt(req.query.size?req.query.size:defaultSize);

        const offset = (page - 1) * size;
        return { page, size, offset };
    }
  };
  