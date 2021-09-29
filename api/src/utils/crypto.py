"""
Implement a 2 way encryption
"""

from Crypto.Cipher import (
    AES,
    XOR
)
import base64 as b64
import base64
import hashlib
import hmac


class Crypto:

    def __init__(self, key, salt):
        self.salt = salt
        self.cipher = AES.new(key, AES.MODE_CBC, self.salt)

    def encrypt(self, message):
        message = message.rjust(
            AES.block_size*(len(message)//AES.block_size+1))
        encrypted_bytes = self.cipher.encrypt(message)
        b64_bytes = b64.b64encode(encrypted_bytes)
        return b64_bytes

    def decrypt(self, coded_msg):
        encrypted_bytes = b64.b64decode(coded_msg)
        message = self.cipher.decrypt(self.salt+encrypted_bytes)
        return message[len(self.salt):].lstrip()


def hide(key, plain_text):
    cipher = XOR.new(key)
    return b64.b64encode(cipher.encrypt(plain_text))


def show(key, cipher_text):
    cipher = XOR.new(key)
    return cipher.decrypt(b64.b64decode(cipher_text))


def e2i(id):
    return XOR.new("4wWQQ7RQb/TJTNMwomlksjfmdlbcfDsz"[::-1]).decrypt(base64.b64decode(str(id))).decode()


def i2e(id):
    return base64.b64encode(XOR.new("4wWQQ7RQb/TJTNMwomlksjfmdlbcfDsz"[::-1]).encrypt(str(id))).decode()


def signature(message: bytes, secret: bytes) -> str:
    return hmac.new(secret, message, hashlib.sha256).hexdigest()
