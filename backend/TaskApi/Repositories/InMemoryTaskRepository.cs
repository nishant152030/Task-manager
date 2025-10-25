using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using TaskApi.Models;

namespace TaskApi.Repositories
{
    public class InMemoryTaskRepository : ITaskRepository
    {
        private readonly ConcurrentDictionary<Guid, TaskItem> _store = new();

        public InMemoryTaskRepository()
        {
            // Seeded examples
            var t1 = new TaskItem { Id = Guid.NewGuid(), Description = "Sample: buy milk", IsCompleted = false, CreatedAt = DateTime.UtcNow };
            var t2 = new TaskItem { Id = Guid.NewGuid(), Description = "Sample: finished task", IsCompleted = true, CreatedAt = DateTime.UtcNow };
            _store[t1.Id] = t1;
            _store[t2.Id] = t2;
        }

        public IEnumerable<TaskItem> GetAll() => _store.Values.OrderBy(t => t.CreatedAt);

        public TaskItem? Get(Guid id) => _store.TryGetValue(id, out var t) ? t : null;

        public TaskItem Create(TaskCreateDto dto)
        {
            var t = new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = dto.Description.Trim(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };
            _store[t.Id] = t;
            return t;
        }

        public bool Update(Guid id, TaskUpdateDto dto)
        {
            if (!_store.TryGetValue(id, out var existing)) return false;
            if (dto.Description != null) existing.Description = dto.Description.Trim();
            if (dto.IsCompleted != null) existing.IsCompleted = dto.IsCompleted.Value;
            _store[id] = existing;
            return true;
        }

        public bool Toggle(Guid id)
        {
            if (!_store.TryGetValue(id, out var existing)) return false;
            existing.IsCompleted = !existing.IsCompleted;
            _store[id] = existing;
            return true;
        }

        public bool Delete(Guid id) => _store.TryRemove(id, out _);
    }
}
