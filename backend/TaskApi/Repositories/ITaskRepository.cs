using System;
using System.Collections.Generic;
using TaskApi.Models;

namespace TaskApi.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<TaskItem> GetAll();
        TaskItem? Get(Guid id);
        TaskItem Create(TaskCreateDto dto);
        bool Update(Guid id, TaskUpdateDto dto);
        bool Toggle(Guid id);
        bool Delete(Guid id);
    }
}
