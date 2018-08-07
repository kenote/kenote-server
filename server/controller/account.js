

export const login = (data, req, res, next) => {
  // -- 登录
  req.logIn(data, err => {
    if (err) { return next(err) }
    return res.api(data)
  })
}

export const logout = (req, res) => {
  // -- 退出
  req.logout()
  return res.redirect('/')
}