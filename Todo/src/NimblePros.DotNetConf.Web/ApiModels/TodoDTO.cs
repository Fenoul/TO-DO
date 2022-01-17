namespace Todo.Web.ApiModels;

public class TodoDTO : CreateTodoDTO
{
  public TodoDTO(int id, string title, string desc, bool status) : base(title, desc, status)
  {
    Id = id;
    Title = title;
    Desc = desc;
    Status = status;
  }
  public TodoDTO(int id, string title, bool status) : base(title, status)
  {
    Id = id;
    Title = title;
    Status = status;
  }
  public int Id { get; set; }
  public new string Title { get; set; }
  public new string Desc { get; set; }
  public new bool Status { get; set; }
}

public abstract class CreateTodoDTO
{
  protected CreateTodoDTO(string title, string desc, bool status)
  {
    Title = title;
    Desc = desc;
    Status = status;
  }
  protected CreateTodoDTO(string title,  bool status)
  {
    Title = title;
    Status = status;
  }

  public string Title { get; set; }
  public string Desc { get; set; }
  public bool Status { get; set; }
}
