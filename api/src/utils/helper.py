import os
from enum import Enum


class Environment(Enum):
    development = 'development'
    staging = 'staging'
    stable = 'production'

    def __str__(self):
        return self.name

    def is_stable(self):
        return self is Environment.stable


def env(name, default=None):
    return os.environ.get(name, default)
