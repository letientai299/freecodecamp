import hashlib
import os

print(os.getcwd())

salts = open("known-salts.txt", "r").readlines()
db = open("top-10000-passwords.txt", "r").readlines()


def sha1(pw, s=None):
    pw = pw.strip()
    if s:
        s = s.strip()
        pw += s
    return hashlib.sha1(str(pw).encode('utf-8')).hexdigest()


hashes = {sha1(pw): pw.strip() for pw in db}
salted_hashes = {}
for s in salts:
    for pw in db:
        a = sha1(pw, s)
        salted_hashes[a] = pw.strip()
        b = sha1(s, pw)
        salted_hashes[b] = pw.strip()


def crack_sha1_hash(h, use_salts=False):
    hs = salted_hashes if use_salts else hashes
    pw = hs.get(h)
    if not pw:
        return "PASSWORD NOT IN DATABASE"

    return pw


print(salted_hashes.get("53d8b3dc9d39f0184144674e310185e41a87ffd5"))
