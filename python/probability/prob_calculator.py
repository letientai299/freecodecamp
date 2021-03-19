# Consider using the modules imported above.
import copy
import random


class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for k, v in kwargs.items():
            self.contents += [k] * int(v)

    def draw(self, num):
        n = len(self.contents)
        if num >= n:
            return self.contents
        r = []
        for i in range(0, num):
            bid = random.randint(0, n - 1)
            r.append(self.contents.pop(bid))
            n -= 1

        return r


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    count = 0
    for _ in range(0, num_experiments):
        h = copy.deepcopy(hat)
        balls = h.draw(num_balls_drawn)
        d = {}
        for b in balls:
            v = d.get(b, 0)
            d[b] = v + 1

        found = True
        for b, v in expected_balls.items():
            if d.get(b, 0) < v:
                found = False
                break

        if found:
            count += 1

    return count / num_experiments
