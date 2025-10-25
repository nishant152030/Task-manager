using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repo;
        public TasksController(ITaskRepository repo) => _repo = repo;

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetAll() => Ok(_repo.GetAll());

        [HttpGet("{id:guid}")]
        public ActionResult<TaskItem> Get(Guid id)
        {
            var item = _repo.Get(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public ActionResult<TaskItem> Create([FromBody] TaskCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = _repo.Create(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public IActionResult Update(Guid id, [FromBody] TaskUpdateDto dto)
        {
            var ok = _repo.Update(id, dto);
            return ok ? NoContent() : NotFound();
        }

        [HttpPut("{id:guid}/toggle")]
        public IActionResult Toggle(Guid id)
        {
            var ok = _repo.Toggle(id);
            return ok ? NoContent() : NotFound();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            var ok = _repo.Delete(id);
            return ok ? NoContent() : NotFound();
        }
    }
}
