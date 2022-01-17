using Todo.Core.ProjectAggregate;
using Todo.SharedKernel.Interfaces;
using Todo.Web.ApiModels;
using Microsoft.AspNetCore.Mvc;
using NimblePros.DotNetConf.Core.ProjectAggregate.Specifications;

namespace Todo.Web.Api;

public class TodoItemController : BaseApiController
{
  private readonly IRepository<TodoItem> _repository;

  public TodoItemController(IRepository<TodoItem> repository)
  {
    _repository = repository;
  }

  // GET: api/Todo
  [HttpGet]
  public async Task<IActionResult> List()
  {
    var todoDTOs = (await _repository.ListAsync())
        .Select(todoItem => new TodoDTO
        (
            id: todoItem.Id,
            title: todoItem.Title,
            desc: todoItem.Desc,
            status: todoItem.Status
        ))
        .ToList();

    return Ok(todoDTOs);
  }

  // PATCH: api/Todo/{todoId}
  [HttpPatch("{todoId}")]
  public async Task<IActionResult> Complete(int todoId, [FromBody] TodoItem TodoDTO)
  {
    if (TodoDTO != null)
    {
      var todoSpec = new TodoById(todoId);
      TodoItem todo = await _repository.GetBySpecAsync(todoSpec);
      if (todo == null) return NotFound("No such todo");
      todo.Title = TodoDTO.Title;
      todo.Desc = TodoDTO.Desc;
      todo.Status = TodoDTO.Status;

      await _repository.UpdateAsync(todo);

      return Ok();
    }
    else {
      return BadRequest();
    }
  }

}
