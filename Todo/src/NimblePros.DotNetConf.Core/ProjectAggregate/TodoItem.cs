using Ardalis.GuardClauses;
using Todo.SharedKernel;
using Todo.SharedKernel.Interfaces;

namespace Todo.Core.ProjectAggregate;

public class TodoItem : BaseEntity, IAggregateRoot
{
  public string Title { get; private set; }
  public string Desc { get; private set; }
  public bool Status { get; private set; }

  public TodoItem(string title, string desc, bool status)
  {
    Title = Guard.Against.NullOrEmpty(title, nameof(title));
    Desc = desc;
    Status = status;
  }
}
