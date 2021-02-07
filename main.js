//Trying to avoid any npm installs or anything that takes extra time...
const fs = require("fs"),
  path = require("path"),
  env = process.env;

function fail(message, exitCode = 1) {
  console.log(`::error::${message}`);
  process.exit(1);
}

function main() {
  try {
    console.log(`${env.GITHUB_REF}`.split(path.sep))
    const tagOrBranch = `${env.GITHUB_REF}`.split(path.sep).unshift();
    const sha =
      env.INPUT_SHA_LENGTH > 0
        ? `${env.GITHUB_SHA}`.slice(0, env.INPUT_SHA_LENGTH)
        : `${env.GITHUB_SHA}`;

    console.log(tagOrBranch);
    console.log(sha);

    //Setting the output and a environment variable to new build number...
    //fs.writeFileSync('$GITHUB_ENV', `BUILD_NUMBER=${nextBuildNumber}`);
    fs.writeFileSync(process.env.GITHUB_ENV, `TAG_OR_BRANCH=${tagOrBranch}`);
    fs.writeFileSync(process.env.GITHUB_ENV, `CURRENT_SHA=${sha}`);

    console.log(`::set-output name=tagOrBranch::${tagOrBranch}`);
    console.log(`::set-output name=currentSha::${sha}`);
    //Save to file so it can be used for next jobs...
    fs.writeFileSync("TAG_OR_BRANCH", tagOrBranch.toString());
    fs.writeFileSync("CURRENT_SHA", sha.toString());
  } catch (error) {
    fail(`ERROR: get tag or branch error. ${JSON.stringify(error)}`);
  }
}

main();
