#!/usr/bin/env bash

if [ "$#" -ne 2 ]; then
	echo "${0} <hugo version> <package version>"
	exit
fi

HUGO_VERSION=$1
PACKAGE_VERSION=$2

sed -i -e 's/"version":.*/"version": "'"${PACKAGE_VERSION}"'",/' package.json
sed -i -e 's/"hugoVersion":.*/"hugoVersion": "'"${HUGO_VERSION}"'",/' package.json

if ! npm test; then
	exit
fi

git add .
git commit -m "Updated Hugo to v${HUGO_VERSION}"
git tag "v${PACKAGE_VERSION}"

if ! git push --tags origin main; then
	exit
fi

if ! npm publish; then
	exit
fi

if ! npm dist-tag add "@davidofferman/hugo-bin@${PACKAGE_VERSION}" "hugo-${HUGO_VERSION}"; then
	exit
fi
