import math


class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, w):
        self.width = w
        return

    def set_height(self, h):
        self.height = h
        return

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

    def get_diagonal(self):
        return math.sqrt(self.width * self.width + self.height * self.height)

    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."

        return ("*" * self.width + "\n") * self.height

    def get_amount_inside(self, rect):
        return (self.width // rect.width) * (self.height // rect.height)

    def __str__(self):
        return "Rectangle(width={}, height={})".format(self.width, self.height)


class Square(Rectangle):
    def __init__(self, w):
        super().__init__(w, w)

    def set_side(self, w):
        super().set_height(w)
        super().set_width(w)

    def set_width(self, w):
        self.set_side(w)

    def set_height(self, h):
        self.set_side(h)

    def __str__(self):
        return "Square(side={})".format(self.width)
