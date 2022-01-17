using Ardalis.Specification;
using Todo.Core.ProjectAggregate;

namespace NimblePros.DotNetConf.Core.ProjectAggregate.Specifications;

public class TodoById : Specification<TodoItem>, ISingleResultSpecification
{
  public TodoById(int todoId)
  {
    Query
        .Where(todo => todo.Id == todoId);
  }
}
