

export const login = (data, req, res, next) => {
  // --
  return res.api(data)
}

export const accesstoken = (req, res) => {
  //
  return res.api({ auth: req.user, token: req.token })
}