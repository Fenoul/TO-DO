using Todo.Core.ProjectAggregate;
using Todo.SharedKernel.Interfaces;
using Todo.Web.ApiModels;
using Microsoft.AspNetCore.Mvc;

namespace Todo.Web.Api;

public class TodoItemController : BaseApiController
{
  private readonly IRepository<TodoItem> _repository;

  public TodoItemController(IRepository<TodoItem> repository)
  {
    _repository = repository;
  }

  // GET: Todo
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

}
