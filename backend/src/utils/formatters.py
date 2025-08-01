import unicodedata
import re


def slugify(val):
    if not val:
        return ''

    val = unicodedata.normalize('NFKD', val).replace('đ', 'd').replace('Đ', 'd')
    val = re.sub(r'[\u0300-\u036f]', '', val)
    val = val.strip().lower()
    val = re.sub(r'[^a-z0-9 -]', '', val)
    val = re.sub(r'\s+', '-', val)
    val = re.sub(r'-+', '-', val)

    return val

