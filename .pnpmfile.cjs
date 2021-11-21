// https://github.com/pnpm/pnpm/issues/827
function readPackage(pkg) {
  if (pkg.name.indexOf('@leva-ui') > -1) {
    pkg.dependencies = {
      ...pkg.peerDependencies,
      ...pkg.dependencies,
    }
    pkg.peerDependencies = {}
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
