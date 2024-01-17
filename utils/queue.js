module.exports = class FsQueue {
  constructor(limit = 1) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  enqueue(cb) {
    return new Promise((resolve, reject) => {
      const task = () => {
        this.running++;
        cb()
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => {
            this.running--;
            this.processQueue();
          })
      }

      this.queue.push(task);
      this.processQueue();
    })
  }

  processQueue() {
    if (this.running < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      task();
    }
  }
}
