class Queue:

    def __init__(self, queue=[]):
        self.queue = list(queue)

    def push(self, item):
        self.queue.append(item)
        return self.queue

    def pop(self):
        item_0 = self.queue[0]
        del self.queue[0]
        return item_0

    def __len__(self):
        return len(self.queue)

    def __repr__(self):
        return f"{self.queue}"

    def update_priority(self):
        self.queue = sorted(
            self.queue, key=lambda light: light.priority, reverse=True)
    def update(self):
        self.update_priority()
        self.queue = list(filter(lambda light:light.get_state() != "STOP",self.queue))


