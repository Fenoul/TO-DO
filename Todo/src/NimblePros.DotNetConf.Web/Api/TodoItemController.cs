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

  // GET: api/Todo
  [HttpGet("{todoId:int}")]
  public async Task<IActionResult> GetById(int todoId)
  {
    TodoById todoSpec = new TodoById(todoId);
    TodoItem todo = await _repository.GetBySpecAsync(todoSpec);
    if (todo == null)
    {
      return NotFound();
    }

    TodoDTO response = new TodoDTO
    (
        id: todo.Id,
        title: todo.Title,
        desc: todo.Desc,
        status : todo.Status
    );

    return Ok(response);
  }

  // POST: api/Todo
  [HttpPost]
  public async Task<IActionResult> Post([FromBody] TodoItem request)
  {
    if (request != null)
    {
      TodoItem newTodo = new TodoItem(request.Title, request.Desc, request.Status);

      TodoItem createdTodo = await _repository.AddAsync(newTodo);

      TodoDTO result = new TodoDTO
      (
          id: createdTodo.Id,
          title: createdTodo.Title,
          desc: createdTodo.Desc,
          status: createdTodo.Status
      );
      return Ok(result);
    } else
    {
      return BadRequest();
    }
  }

  // PATCH: api/Todo/{todoId}
  [HttpPatch("{todoId:int}")]
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
