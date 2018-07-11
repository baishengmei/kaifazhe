// similar function as array.filter
export function filterObject(o, filter) {
  const r = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      r[k] = o[k];
    }
  });
  return r;
}

export function fetchUserInfo(req) {
  return {
    sponsorId: req.cookies.UID,
    email: req.cookies.XZXEMAIL,
    token: req.cookies.XZHTK,
    isDirectUser: req.cookies.ISDIRECTUSER,
    isCompany: req.cookies.ISCOMPANY,
  };
}
