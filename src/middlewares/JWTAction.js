import JWTApiService from "../services/JWTApiService";

const nonSecurePaths = ["/", "/register", "/login", "/logout"];

const checkUserJWT = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  // get token from cookie
  const cookies = req.cookies;

  // get token from header
  const tokenFromHeader = JWTApiService.getBearerTokenFromHeader(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = JWTApiService.verifyToken(token);

    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated user",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated user",
      DT: "",
    });
  }
};

const checkUserPermission = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  if (req.user) {
    const {
      user: {
        email,
        username,
        GroupWithListRolesOfUser: { Roles },
      },
    } = req;

    const currentPath = req.path;
    if (!Roles || Roles.lenth === 0) {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resource",
        DT: "",
      });
    }

    let canAccess = Roles.some(
      (item) => item.url === currentPath || currentPath.includes(item.url)
    );

    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resource",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated user",
      DT: "",
    });
  }
};

module.exports = {
  checkUserJWT,
  checkUserPermission,
};
