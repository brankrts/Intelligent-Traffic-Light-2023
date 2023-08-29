class ThreadPool:

    def __init__(self):

        self.thread_pool = []

    def add_thread(self, thread):
        self.thread_pool.append(thread)

    def start_threading(self):

        for thread in self.thread_pool:
            thread.start()

        for thread in self.thread_pool:
            thread.join()
