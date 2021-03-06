# Contributing to Perlemir UI

As this project is intended to be as beginner-friendly as possible, the contributing guide doubly functions as a brief introduction to Git and GitHub.

If you're already familiar with Git, GitHub, etc., skip to the **TL;DR** segments in each section, or skip to the [Summary](#summary) section at the end.

### Running the Project Locally

Details on how to run the project after downloading/installing can be found in the README. To get started, ensure that you have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/) v14.0+ installed. The simplest way to download the codebase is to use Git to clone the contents of the repository:

```sh
$ git clone https://github.com/unca-acm/perlemir-ui.git
```

This will fetch the contents of the repository and save it to a folder called `perlemir-ui`. After downloading, enter the folder you just downloaded.

In order to use the WebAssembly package, you'll need to use NPM (the package manager for Node.js) to login to GitHub. This is because ACM has some published packages which require authentication to access. To do this, follow these steps:

1. Create a personal access token in [GitHub](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). These can be used for a variety of things, including authenticating with the GitHub CLI or Docker, so it may be useful to save this somewhere secure (like in your password manager) to use it in multiple places.

2. Run the command:

```sh
$ npm login --scope @unca-acm --registry https://npm.pkg.github.com
Username: # enter your username here
Password: # enter your personall access token here (not your actual GitHub password!)
```

When prompted, enter your GitHub username and personal access token. You are now authenticated with the UNCA ACM GitHub Packages registry, and can use all of our internal packages. (NOTE: in the future, GitHub will allow for unauthenticated downloads for public packages, but no clue when that will be)

**If you're planning to make changes**, make sure to change branches if necessary (see [Making Changes](#making-changes) for details).

Finally, run `npm install` to setup the project, and `npm start` to run it. Navigate to `http://localhost:8000` to see the web page in action.

**TL;DR** Clone the GitHub project locally, 

### Making Changes

You should *always* create a new branch to hold your changes! To see what branch you're on currently, run the command:

```sh
$ git branch
  main
  dev
* my-branch
```

This will show you what branches you have downloaded, and indicate which branch you're currently on.

#### Creating a New Branch for your Changes

To make a change, you'll need to either switch to an existing branch or (usually) create your own. To do so, create a "copy" of the `dev` branch (`dev` is where all final changes should end up) by running the following commands:

```sh
# Switch to the branch you want to make a copy of; in our case, this is "dev"
$ git checkout dev
# Make sure your local copy of the branch is up-to-date
$ git pull origin dev
# Create a new branch; becomes a copy of the branch you're currently on
# Can be named whatever you want, as long as that name doesn't already exist
$ git branch my-awesome-new-feature
# Switch to your newly-created branch
$ git checkout my-awesome-new-feature
# You're done! See the results:
$ git branch
  main
  dev
* my-awesome-new-feature
```

#### Working With an Existing Branch

Alternatively, if you wish to work on a branch/feature that already exists, you can switch directly to that branch. You can also see a list of available branches by clicking `branches` on the repo page on GitHub.

```sh
# Show what branches are already downloaded
$ git branch
  main
* dev
# Show branches on GitHub, including ones you haven't downloaded
$ git branch -r
  origin/main
  origin/dev
  origin/some-other-feature
# Let's download the some-other-feature branch so we can work on it!
# "git pull" is a command which "downloads" a specific branch from the main repository.
# It takes two arguments: where we want to fetch it from, and which branch to fetch.
# In our case, our GitHub repo is nicknamed "origin" and the branch we want is "some-other-feature"
$ git pull origin some-other-feature
# Let's make sure it's downloaded
$ git branch
  main
* dev
  some-other-feature # <-- thar she blows
# Great! Now the branch we want is downloaded, so let's switch to it.
$ git checkout some-other-feature
# Let's make sure we're now on the correct branch
$ git branch
  main
  dev
* some-other-feature
# Now, whenever we make changes, they'll be "contained" inside this branch!
```

*NOTE*: Be sure, before you start working on stuff, that your local copy of the code base is up-to-date. To do this, run `git pull` again, which will download the remote contents of your current branch and update it.

#### Making Changes to your Local Branch

Now that you're on the right branch, you can safely make changes to the code. When making these changes, you tell Git which changes to keep by adding them to the "staging area." Once all the changes you want to keep are in the staging area, you "commit" those changes to make them permanent.

```sh
# To see what files have changes, run "git status" to check your file status
# "Changes not staged for commit" are changes to existing files,
#    but which have not been added to the staging area yet.
# "Untracked files" are new files that Git doesn't know about.
$ git status
On branch some-other-feature
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
      modified:   src/app.ts
Untracked files:
  (use "git add <file>..." to include what will be committed)
     src/someFile.js

# When you've made some changes that you'd like to keep, add them to the staging area.
$ git add src/someFile.js
# Now when you run status, it will look a little different.
# Any files in the "Changes to be committed" section are in the staging area and are ready to go
$ git status
On branch some-other-feature
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
      new file: src/someFile.js
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
      modified:   src/app.ts

# Once you're certain it's ready, "commit" your changes to finalize them
# The -m lets you add a message to your commit, to help other devs know what you did
$ git commit -m "Added a file which does some stuff"
# Now your changes are (mostly) permanently saved!
# If you'd like to see a list of your commits on this branch, use:
$ git log
```

#### Uploading Your Changes to the Remote Repository (GitHub)

Once you're ready for the rest of the team to see what you've done, you'll upload the commits you've made to your branch. To do this, use `git push`.

```sh
# Make sure you're on the right branch, and that all of your changes are saved.
$ git status
On branch some-other-feature
Your branch is up to date with 'origin/some-other-feature'.

nothing to commit, working tree clean
# We're ready! Use git push to upload your commits
# "git push" takes the same arguments that "git pull" does,
#    it just uploads them instead of downloading them
$ git push origin some-other-feature
# Assuming there were no errors, we're done!
```

**NOTE: ONLY PUSH CHANGES TO YOUR OWN BRANCHES! Do not push directly to `dev` or (especially) `main` unless specifically directed to do so.**

#### Creating a Pull Request

Finished features, changes, and fixes need to get folded into the main codebase, but this is a delicate process and, as such, should only be handled by one of the project leads.

Once changes are available in your branch on the remote repository on GitHub, you will incorporate it into the "live" code base by submitting a Pull Request. This is essentially a plea to the repository's owners/maintainers in charge to take a look at your code and make sure everything works correctly.

To do this, simply navigate to your branch on GitHub (by clicking `branch` and selecting the branch you submitted/modified) and click "Pull request". Then, do the following:

1. Make sure that the `base` branch is selected as `dev`.

2. Add any comments necessary to explain what the changes/features do, how they work, etc.

3. If you'd like, select a reviewer from the "Reviewers" section on the right and click "Request" to notify a maintainer.

4. Click "Create Pull Request" to finish.

You're done! A project lead will notify you if any additional changes are needed, or if your pull request is accepted/rejected.

**TL;DR** When making changes, create a new feature branch from the `dev` branch. Then, open a Pull Request to merge the changes onto `dev`.

### Summary

Follow the given procedure for making changes in the codebase.

1. Clone the `dev` branch locally and create a new feature branch.

2. Push changes to the feature branch on the remote repository.

3. Submit a pull request and notify a reviewer.