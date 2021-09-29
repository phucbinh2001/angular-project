#!/usr/bin/env python

from distutils.core import setup
import json

with open("VERSION") as version_file:
    version = version_file.read()

requirements = set()

with open("Pipfile.lock") as pipfile_lock:
    for name, attr in json.load(pipfile_lock)["default"].items():
        if "version" in attr:
            requirements.add("%s%s" % (name, attr.get("version", "")))

with open("README.md") as readme_file:
    setup(
        name="user-dashboard-api",
        description="Install API",
        author="Lam Tran",
        author_email="lam@elsanow.io",
        url="https://gitlab.com/elsacorp/backend/user-dashboard.git",
        packages=[],
        package_dir={},
        install_requires=list(requirements),
        scripts=["main.py"]
    )
