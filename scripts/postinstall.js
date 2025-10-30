const { execSync } = require('child_process')
const { existsSync } = require('fs')

// Skip if explicitly disabled
if (process.env.SKIP_BUILD === '1' || process.env.SKIP_POSTINSTALL === '1') {
  process.exit(0)
}

// Detect if this is a git install via pnpm's synthetic script names
// pnpm creates 'npm-install', 'yarn-install', or 'pnpm-install' scripts
// ONLY when preparing git dependencies
const lifecycleEvent = process.env.npm_lifecycle_event

// Detect git install via pnpm's store tmp directory pattern
// pnpm prepares git dependencies in /pnpm/store/v{version}/tmp/
const cwd = process.cwd()
const isPnpmStoreTmp = /[/\\]pnpm[/\\]store[/\\]v\d+[/\\]tmp[/\\]/.test(cwd)

const isGitInstall =
  lifecycleEvent === 'npm-install' ||
  lifecycleEvent === 'yarn-install' ||
  lifecycleEvent === 'pnpm-install' ||
  isPnpmStoreTmp

// Skip if installed as sub-dependency in local development
// (Don't skip for git installs - the ../../package.json would be the consuming project)
if (!isGitInstall) {
  const isSubDependency = existsSync('../../package.json')
  if (isSubDependency) {
    process.exit(0)
  }
}

if (isGitInstall) {
  // Git install: build production files
  console.log('Building Leva for GitHub installation...')
  try {
    execSync('npx preconstruct build', { stdio: 'inherit' })
  } catch (e) {
    console.error('Build failed:', e.message)
    process.exit(1)
  }
} else {
  // Local development: use dev mode for fast linking
  try {
    execSync('npx preconstruct dev', { stdio: 'inherit' })
  } catch (e) {
    console.error('Failed to run preconstruct dev:', e.message)
    process.exit(1)
  }
}
