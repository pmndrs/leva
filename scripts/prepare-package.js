const { execSync } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

// Skip if explicitly disabled
if (process.env.SKIP_BUILD === '1') {
  process.exit(0)
}

const lifecycleEvent = process.env.npm_lifecycle_event

// Git install: synthetic events from pnpm/npm/yarn
const isGitInstall =
  lifecycleEvent === 'npm-install' || lifecycleEvent === 'yarn-install' || lifecycleEvent === 'pnpm-install'

// Publishing: prepare runs before pack/publish
// When running from a package, go up to workspace root
// process.cwd() is the package directory (e.g., packages/leva)
const workspaceRoot = path.resolve(process.cwd(), '../..')
const isInWorkspace = existsSync(path.join(workspaceRoot, 'package.json'))

// Only build if:
// 1. Git install (for consumers), OR
// 2. Publishing (not in workspace = preparing for publish)
if (isGitInstall || !isInWorkspace) {
  try {
    execSync('preconstruct build', {
      stdio: 'inherit',
      cwd: workspaceRoot,
    })
  } catch (e) {
    console.error('Build failed:', e.message)
    process.exit(1)
  }
}
