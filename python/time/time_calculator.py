day_map = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6,
}

week_days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
}


def add_time(start, duration, day=""):
    [h, m] = parse_time(start)
    [ah, am] = parse_duration(duration)
    m += am
    h += ah
    if m > 60:
        m %= 60
        h += 1
    indicator = "AM"

    n = h // 24
    if h > 24:
        h %= 24

    if h > 12:
        h %= 12
        indicator = "PM"

    if h == 12:
        indicator = "PM"

    if h == 0:
        h = 12
        indicator = "AM"

    if day == "":
        if n == 0:
            return "{}:{:02d} {}".format(h, m, indicator)
        if n == 1:
            return "{}:{:02d} {} (next day)".format(h, m, indicator)

        return "{}:{:02d} {} ({} days later)".format(h, m, indicator, n)
    else:
        day = day.lower()
        day = day[0].upper() + day[1:]
        end_day = week_days[(day_map[day] + n) % 7]
        if n == 0:
            return "{}:{:02d} {}, {}".format(h, m, indicator, end_day)
        if n == 1:
            return "{}:{:02d} {}, {} (next day)".format(h, m, indicator, end_day)

        return "{}:{:02d} {}, {} ({} days later)".format(h, m, indicator, end_day, n)


def parse_time(t):
    [hm, am] = t.split()
    [h, m] = parse_duration(hm)
    if am != 'AM':
        h += 12
    return [h, m]


def parse_duration(d):
    return map(lambda s: int(s), d.split(":"))
