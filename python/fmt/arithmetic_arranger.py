import re

ERR_SIZE = "Error: Too many problems."
ERR_OP = "Error: Operator must be '+' or '-'."
ERR_NUM = "Error: Numbers must only contain digits."
ERR_LEN = "Error: Numbers cannot be more than four digits."


def arithmetic_arranger(problems, calc=False):
    """
    :type problems: list
    """
    if len(problems) > 5:
        return ERR_SIZE

    rex = re.compile(r'^[0-9]{1,4}$')

    formated = []

    for p in problems:
        [a, op, b] = p.split()

        # check the operator
        if op != '+' and op != "-":
            return ERR_OP

        if len(a) > 4 or len(b) > 4:
            return ERR_LEN

        if rex.match(a) is None or rex.match(b) is None:
            return ERR_NUM

        formated.append(fmt(a, op, b, calc))

    ss = formated[0]
    spaces = " " * 4
    for p in formated[1:]:
        for i in range(0, len(ss)):
            ss[i] += spaces + p[i]

    if not calc:
        ss = ss[0:3]

    return '\n'.join(ss)


def fmt(a, op, b, calc):
    x = int(a)
    y = int(b)
    r = x + y if op == '+' else x - y
    base = r if r > 0 else 0 - r
    n = max([len(a), len(b), len(str(base))]) if calc else max([len(a), len(b)])

    r = str(r)
    n += 2  # for the op and a space
    res = [a.rjust(n), op + " " + b.rjust(n - 2), '-' * n]
    if calc:
        res.append(r.rjust(n))
    return res
